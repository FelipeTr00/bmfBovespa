import { Pool } from "pg";
import * as dotenv from "dotenv";

dotenv.config();

export const pool = new Pool({
  host: process.env.POSTGRES_HOST || "localhost",
  port: Number(process.env.EXTERNAL_PORT) || 5435,
  user: process.env.POSTGRES_USER || "bmfbovespa",
  password: process.env.POSTGRES_PASSWORD || "1235",
  database: process.env.POSTGRES_DB || "postgres",
});

export async function fecharConexao() {
  await pool.end();
  console.log("🔌 Conexão com o banco de dados fechada.");
}

export async function inserirDadosAtivo(asset: string, dados: any[]) {
  if (!dados.length) {
    console.log(`⚠️ Nenhum dado a inserir para ${asset}.`);
    return;
  }

  const columns = [
    "data", "vencto", "preco_abert", "preco_min", "preco_max",
    "preco_med", "ult_preco", "ajuste", "var_ptos", "ult_of_compra",
    "ult_of_venda", "contr_abert", "contr_fech", "num_negoc",
    "contr_negoc", "vol"
  ];

  try {
    const placeholders = dados.map((_, i) =>
      `(${columns.map((_, j) => `$${i * columns.length + j + 1}`).join(", ")})`
    ).join(", ");

    const valoresArray = dados.flatMap(row => [
      row.DATA, row.VENCTO, row["PREÇO ABERT."], row["PREÇO MÍN."],
      row["PREÇO MÁX."], row["PREÇO MÉD."], row["ÚLT. PREÇO"], row["AJUSTE"],
      row["VAR. PTOS."], row["ÚLT. OF. COMPRA"], row["ÚLT. OF. VENDA"],
      row["CONTR. ABERT.(1)"], row["CONTR. FECH.(2)"], row["NÚM. NEGOC."],
      row["CONTR. NEGOC."], row["VOL."]
    ]);

    const query = `
      INSERT INTO public.${asset.toLowerCase()} (${columns.join(", ")})
      VALUES ${placeholders}
      ON CONFLICT (data, vencto) DO NOTHING;
    `;

    await pool.query(query, valoresArray);
    console.log(`✅ Os dados de ${asset} foram inseridos no banco de dados!`);
  } catch (error) {
    console.error(`❌ Erro ao inserir ${asset} no banco de dados:`, error);
  }
}

export async function getDadosAtivo(asset: string) {
  const table = asset.toLowerCase();
  const query = `SELECT * FROM public.${table} ORDER BY data LIMIT 10000;`;

  try {
    const result = await pool.query(query);
    return result.rows;
  } catch (error) {
    console.error(`❌ Erro ao consultar dados de ${asset}:`, error);
    throw error;
  }
}
