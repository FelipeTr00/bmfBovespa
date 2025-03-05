import { capturarDadosBrutos } from "./src/bmfbovespa";
import { parseMercadoFut } from "./src/parsejson";
import { inserirDadosAtivo, fecharConexao } from "./src/db";
import * as fs from "fs";
import * as path from "path";

/* index.ts - Consultar e Salvar dados da BmfBovespa */

/*(async () => {
  console.log("Iniciando.");

  const ativo = "BGI";
  const referenceDate = "2025-01-20";

  try {
    const rawData = await capturarDadosBrutos(referenceDate, ativo);

    const finalJson = parseMercadoFut(rawData, referenceDate);

    if (!finalJson.length) {
      console.error("❌ Nenhum dado processado.");
      return;
    }
*/

    // Salvar em JSON
    /*     const outputDir = path.join(__dirname, "data");
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    const filePath = path.join(outputDir, `${ativo}_mercado_futuro.json`);
    fs.writeFileSync(filePath, JSON.stringify(finalJson, null, 2), "utf8");
    console.log(`✅ Dados salvos em ${filePath}`); */

/*  
    await inserirDadosAtivo(ativo, finalJson);
  } catch (error) {
    console.error("❌ Erro ao salvar:", error);
  } finally {
    await fecharConexao();
  }
})();

*/
