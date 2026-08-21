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
