import { DATASET as MOCK_DATASET, PPGS_EMAILS as MOCK_PPGS_EMAILS } from "./mockData";

// Em desenvolvimento local (`npm run dev`), tenta buscar o dado real
// exportado de WEBSCRAPING/GCUB/db/gcub.db (ver vite.config.js e
// etl/export_for_dashboard.py). Se o arquivo não existir ainda, ou se
// isso estiver rodando no build publicado (GitHub Pages — sem servidor
// dev, fetch sempre falha), cai automaticamente nos dados fictícios.
export async function loadDataset() {
  if (import.meta.env.DEV) {
    try {
      const res = await fetch("/api/real-data");
      if (res.ok) {
        const real = await res.json();
        return {
          dataset: real.dataset,
          ppgsEmails: real.ppgsEmails || {},
          isReal: true,
          generatedAt: real.generated_at,
        };
      }
    } catch {
      // servidor de dado real indisponível — cai no fictício
    }
  }
  return { dataset: MOCK_DATASET, ppgsEmails: MOCK_PPGS_EMAILS, isReal: false, generatedAt: null };
}

// Usado pelo botão "Carregar arquivo de dados": aceita o mesmo JSON gerado
// por WEBSCRAPING/GCUB/etl/export_for_dashboard.py (dashboard_real_data.json)
// e carregado 100% no navegador de quem abrir o app (nenhum servidor
// envolvido — funciona até com o HTML aberto direto do disco). Lança erro
// com mensagem amigável se o arquivo não tiver o formato esperado.
export function parseUploadedDataset(rawText) {
  let parsed;
  try {
    parsed = JSON.parse(rawText);
  } catch {
    throw new Error("Arquivo não é um JSON válido.");
  }
  const dataset = parsed?.dataset;
  if (!dataset || !Array.isArray(dataset.candidatos) || !Array.isArray(dataset.candidaturas) || !Array.isArray(dataset.programas)) {
    throw new Error('JSON não tem o formato esperado (precisa de "dataset.candidatos/candidaturas/programas").');
  }
  return {
    dataset,
    ppgsEmails: parsed.ppgsEmails || {},
    isReal: true,
    generatedAt: parsed.generated_at || null,
  };
}
