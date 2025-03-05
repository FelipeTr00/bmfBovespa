import * as puppeteer from "puppeteer";

export async function capturarDadosBrutos(
  referenceDateJson: string,
  mercadoria: string
): Promise<{
  MercadoFut0: any[];
  MercadoFut1: any[];
  MercadoFut2: any[];
}> {
  console.log(
    `⛏️  Minerando os dados de ${mercadoria} em ${referenceDateJson.split("-").reverse().join("/")}.`
  );

  const referenceDateUrl = referenceDateJson.split("-").reverse().join("/");

  //const url = `https://www2.bmf.com.br/pages/portal/bmfbovespa/boletim1/SistemaPregao1.asp?pagetype=pop&caminho=Resumo%20Estat%EDstico%20-%20Sistema%20Preg%E3o&Data=${referenceDateUrl}&Mercadoria=${mercadoria}`;

  const baseUrl = "https://www2.bmf.com.br/pages/portal/bmfbovespa/boletim1";
  const endpoint = "SistemaPregao1.asp";
  const queryParams = new URLSearchParams({
    pagetype: "pop",
    caminho: "Resumo Estatístico - Sistema Pregão",
    Data: referenceDateUrl,
    Mercadoria: mercadoria,
  }).toString();

  const url = `${baseUrl}/${endpoint}?${queryParams}`;

  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  try {
    await page.goto(url, { waitUntil: "networkidle2" });
    await page.waitForSelector("#A02", { timeout: 10000 });
    await page.click("#A02 img");
    await new Promise((resolve) => setTimeout(resolve, 3000));
    await page.waitForSelector("#MercadoFut0", { timeout: 10000 });
    await page.waitForSelector("#MercadoFut1", { timeout: 10000 });
    await page.waitForSelector("#MercadoFut2", { timeout: 10000 });

    const rawData = await page.evaluate(() => {
      const formatarNumero = (valor: string): string =>
        valor.replace(/\./g, "").replace(/,/g, ".");

      const extrairTabela = (id: string) => {
        const elemento = document.getElementById(id);
        if (!elemento) return [];

        const tabela = elemento.querySelector("table");
        if (!tabela) return [];

        const rows = tabela.querySelectorAll("tr");
        const data: any[] = [];

        rows.forEach((row) => {
          const cols = row.querySelectorAll("td, th");
          const rowData: any = [];

          cols.forEach((col) => {
            let valor = (col as HTMLElement).innerText.trim();
            // Convertendo números
            const num = parseFloat(formatarNumero(valor));
            if (!isNaN(num)) {
              rowData.push(num);
            } else {
              rowData.push(valor);
            }
          });

          data.push(rowData);
        });
        return data;
      };

      return {
        MercadoFut0: extrairTabela("MercadoFut0"),
        MercadoFut1: extrairTabela("MercadoFut1"),
        MercadoFut2: extrairTabela("MercadoFut2"),
      };
    });

    return {
      MercadoFut0: rawData.MercadoFut0,
      MercadoFut1: rawData.MercadoFut1,
      MercadoFut2: rawData.MercadoFut2,
    };
  } catch (error) {
    console.error("❌ Erro ao extrair dados:", error);
    return { MercadoFut0: [], MercadoFut1: [], MercadoFut2: [] };
  } finally {
    await browser.close();
  }
}
