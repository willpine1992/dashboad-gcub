# GCUB-MOB · Painel de Mobilidade Internacional (UEA)

Protótipo interativo de dashboard para o edital **GCUB-MOB** (Grupo de
Cooperação Internacional de Universidades Brasileiras) na
**Universidade do Estado do Amazonas (UEA)**. Mesma identidade visual do
[DASHBOARD 2](../DASHBOARD%202) (GERBRAS) — verde institucional escuro,
acento dourado, superfícies claras, cantos arredondados generosos.

**🔗 Site publicado:** https://willpine1992.github.io/dashboad-gcub/

> ⚠️ **Publicado (GitHub Pages) = sempre dados fictícios.** Nomes, e-mails
> pessoais e documentos de candidatos em `docs/index.html` vêm de
> `src/mockData.js` — a forma da distribuição (países, volume por
> programa) segue a proporção real, mas nenhum candidato real aparece no
> site publicado. **Rodando em `localhost` (`npm run dev`)**, o painel
> carrega automaticamente os dados **reais** de
> `WEBSCRAPING/GCUB/db/gcub.db` quando disponíveis — ver seção
> [Dados reais (localhost)](#dados-reais-localhost) abaixo. Um selo no
> canto superior esquerdo ("Dados reais" / "Protótipo") sempre mostra
> qual dos dois está em tela.

## Telas

| Aba | Conteúdo |
|---|---|
| **Visão Geral** | KPIs (candidatos únicos, candidaturas recebidas, taxa de aceite, pendentes) + ranking dos programas com mais candidaturas |
| **Funil de Avaliação** | Status (Pendente/Aceito/Recusado) por programa em barras empilhadas + tabela de auditoria de documentos (RG, diploma, histórico, currículo) com paginação e botão simulado "Abrir PDF" + lista de e-mails reais dos PPGs no recorte filtrado, com botão para copiar todos + lista de links reais para a ficha de avaliação de cada candidato no GCUB-MOB, com botão para copiar todos |
| **Demanda e Atratividade** | Rosca com a ordem de preferência (1ª–4ª opção) pela UEA + barras de concorrência (candidaturas ÷ vagas) por programa |
| **Perfil dos Candidatos** | Países de origem, faixa etária, sexo, professor(a) universitário(a), tipo de instituição de origem e % de candidatos PCD |

Filtros globais (Programa da UEA / Nível) no topo afetam as quatro telas.

## Stack

React 19 + Vite + Tailwind CSS v4 + [Recharts](https://recharts.org) +
[lucide-react](https://lucide.dev). Build single-file (`vite-plugin-singlefile`)
— o `docs/index.html` publicado é um HTML autocontido, sem dependências
externas além de código já embutido.

```
DASHBOARD GCUB/
├── src/
│   ├── mockData.js   # gerador dos dados fictícios (usado no build publicado)
│   ├── data.js         # decide fictício vs. real (ver seção abaixo)
│   ├── App.jsx         # componente único: layout, filtros, 4 abas, gráficos
│   └── index.css       # tokens de cor (claro/escuro) + Tailwind
├── docs/                # build publicado (GitHub Pages, pasta docs/) — sempre fictício
└── vite.config.js        # inclui o middleware dev-only que serve o dado real
```

## Rodar localmente

```bash
npm install
npm run dev         # http://localhost:5173 — usa dado real se disponível, senão fictício
npm run build        # gera docs/index.html (publicado via GitHub Pages) — SEMPRE fictício
```

## Dados reais (localhost)

Rodando `npm run dev`, o painel busca `GET /api/real-data` — uma rota que
só existe em desenvolvimento (`vite.config.js`, plugin `realDataDevServer`,
hook `configureServer` — **não roda em `npm run build`**, então dado real
nunca é lido nem embutido no bundle publicado). Essa rota serve o conteúdo
de `WEBSCRAPING/GCUB/db/dashboard_real_data.json`, um JSON exportado do
banco real (`WEBSCRAPING/GCUB/db/gcub.db`) no mesmo formato de
`mockData.js`.

Pra gerar/atualizar esse JSON depois de rodar o scraper de novo:

```bash
cd "../WEBSCRAPING/GCUB"
./venv/bin/python etl/export_for_dashboard.py
```

Se esse arquivo não existir (ex.: clone novo, sem rodar o scraper ainda),
`npm run dev` cai automaticamente nos dados fictícios — nada quebra, só
aparece "Protótipo" no lugar de "Dados reais" no topo da tela.

**Onde fica o arquivo e por quê:** `dashboard_real_data.json` é gerado
*fora* desta pasta (em `WEBSCRAPING/GCUB/db/`, gitignored lá) — de
propósito, pra não ter nenhum risco de um `git add -A` aqui dentro varrer
dado real de candidato pro repositório público. Contém nome completo, país,
idade e decisão de ~1.930 candidatos reais — **nunca compartilhe prints
nem publique enquanto estiver em modo "Dados reais".**

## Enviar o painel pra outra pessoa (com dado real)

O botão **"Carregar arquivo de dados"** (barra lateral, sempre visível)
lê um JSON no mesmo formato de `dashboard_real_data.json` **inteiramente
no navegador de quem abre o app** (`FileReader`, sem servidor, sem
upload pra lugar nenhum) e substitui o dado em tela por ele. Isso separa
o app (código, sem dado nenhum) do dado (arquivo à parte):

1. `npm run build` gera `docs/index.html` — o app, zero dado real, seguro
   de distribuir (mesmo arquivo que vai pro GitHub Pages).
2. Copie `WEBSCRAPING/GCUB/db/dashboard_real_data.json` pra perto dele
   (ou gere um novo com `export_for_dashboard.py`).
3. Envie os dois arquivos juntos pra pessoa. Ela abre o `.html` (funciona
   com duplo-clique, sem instalar nada — é um HTML autocontido) e clica
   em "Carregar arquivo de dados" pra escolher o `.json`.

⚠️ O `.json` continua sendo dado pessoal real de candidatos — enviar os
dois arquivos é o mesmo que enviar a base toda pra quem receber. Só
mande pra quem realmente precisa avaliar os candidatos.
