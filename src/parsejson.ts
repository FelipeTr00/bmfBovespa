export function parseMercadoFut(
  rawData: { MercadoFut0: any[]; MercadoFut1: any[]; MercadoFut2: any[] },
  referenceDateJson: string
): any[] {

    if (
    rawData.MercadoFut0.length <= 1 ||
    rawData.MercadoFut1.length <= 1 ||
    rawData.MercadoFut2.length <= 1
  ) {
    console.error("⚠️ Erro ao extrair as tabelas.");
    return [];
  }

  const fut0Data = rawData.MercadoFut0.slice(1);
  const fut1Data = rawData.MercadoFut1.slice(1);
  const fut2Data = rawData.MercadoFut2.slice(1);

  const finalJson: any[] = [];
  const numLinhas = Math.min(fut0Data.length, fut1Data.length, fut2Data.length);

  for (let i = 0; i < numLinhas; i++) {
    const rowFut0 = fut0Data[i];
    const rowFut1 = fut1Data[i];
    const rowFut2 = fut2Data[i];

    const vencto = rowFut0[0];

    const dataObj = {
      DATA: referenceDateJson,
      VENCTO: vencto,
      // MercadoFut1: volume
      "CONTR. ABERT.(1)": rowFut1[0] ?? 0,
      "CONTR. FECH.(2)": rowFut1[1] ?? 0,
      "NÚM. NEGOC.": rowFut1[2] ?? 0,
      "CONTR. NEGOC.": rowFut1[3] ?? 0,
      "VOL.": rowFut1[4] ?? 0,
      // MercadoFut2: preço
      "PREÇO ABERT.": rowFut2[0] ?? 0,
      "PREÇO MÍN.": rowFut2[1] ?? 0,
      "PREÇO MÁX.": rowFut2[2] ?? 0,
      "PREÇO MÉD.": rowFut2[3] ?? 0,
      "ÚLT. PREÇO": rowFut2[4] ?? 0,
      "AJUSTE": rowFut2[5] ?? 0,
      "VAR. PTOS.": rowFut2[6] ?? 0,
      "ÚLT. OF. COMPRA": rowFut2[7] ?? 0,
      "ÚLT. OF. VENDA": rowFut2[8] ?? 0,
    };

    finalJson.push(dataObj);
  }

  return finalJson;
}
