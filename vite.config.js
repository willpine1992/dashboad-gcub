import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { viteSingleFile } from 'vite-plugin-singlefile'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// Caminho do JSON exportado do banco real (WEBSCRAPING/GCUB/db/, FORA
// dessa pasta de propósito — ver etl/export_for_dashboard.py). Gerado com:
//   cd "../WEBSCRAPING/GCUB" && ./venv/bin/python etl/export_for_dashboard.py
const REAL_DATA_PATH = path.resolve(
  __dirname,
  '../WEBSCRAPING/GCUB/db/dashboard_real_data.json'
)

// Plugin dev-only: serve o JSON real em /api/real-data. `configureServer`
// só roda em `vite dev` — nunca em `vite build`, então dado real nunca
// entra no bundle publicado em docs/ (GitHub Pages).
function realDataDevServer() {
  return {
    name: 'real-data-dev-server',
    configureServer(server) {
      server.middlewares.use('/api/real-data', (_req, res) => {
        if (!fs.existsSync(REAL_DATA_PATH)) {
          res.statusCode = 404
          res.setHeader('Content-Type', 'application/json')
          res.end(
            JSON.stringify({
              error:
                'dashboard_real_data.json não encontrado. Rode: cd "../WEBSCRAPING/GCUB" && ./venv/bin/python etl/export_for_dashboard.py',
            })
          )
          return
        }
        res.setHeader('Content-Type', 'application/json')
        fs.createReadStream(REAL_DATA_PATH).pipe(res)
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), viteSingleFile(), realDataDevServer()],
  build: {
    outDir: 'docs',
    cssCodeSplit: false,
    assetsInlineLimit: 100000000,
  },
})
