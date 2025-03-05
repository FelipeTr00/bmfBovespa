// src/miner.ts
import { capturarDadosBrutos } from "./bmfbovespa";
import { parseMercadoFut } from "./parsejson";
import { inserirDadosAtivo } from "./db";
// import { fecharConexao } from "./db"; // Normalmente não chamamos em cada requisição

export async function miner(ativo: string, referenceDate: string): Promise<any[]> {
  console.log(`Iniciando mineração para ${ativo} em ${referenceDate}.`);

  try {
    // Captura os dados brutos
    const rawData = await capturarDadosBrutos(referenceDate, ativo);
    // Processa os dados com o parse
    const finalJson = parseMercadoFut(rawData, referenceDate);

    if (!finalJson.length) {
      console.error("❌ Nenhum dado processado.");
      throw new Error("Nenhum dado processado.");
    }

    // Insere os dados processados no banco
    await inserirDadosAtivo(ativo, finalJson);

    // Opcional: se desejar fechar a conexão, chame fecharConexao().
    // Mas em um servidor é comum manter o pool ativo.
    // await fecharConexao();

    return finalJson;
  } catch (error) {
    console.error("❌ Erro durante a mineração:", error);
    throw error;
  }
}
