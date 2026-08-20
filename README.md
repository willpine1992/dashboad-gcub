# GCUB-MOB · Painel de Mobilidade Internacional (UEA)

Protótipo interativo de dashboard para o edital **GCUB-MOB** (Grupo de
Cooperação Internacional de Universidades Brasileiras) na
**Universidade do Estado do Amazonas (UEA)**. Mesma identidade visual do
[DASHBOARD 2](../DASHBOARD%202) (GERBRAS) — verde institucional escuro,
acento dourado, superfícies claras, cantos arredondados generosos.

**🔗 Site publicado:** https://willpine1992.github.io/dashboad-gcub/

> ⚠️ **Dados fictícios.** Todo o conteúdo (nomes, e-mails, contagens) é
> gerado em `src/mockData.js` para simular o funcionamento das telas. A
> forma da distribuição (países, volume por programa) segue a proporção
> observada na raspagem real do edital (ver `WEBSCRAPING/GCUB/`), mas
> nenhum candidato real aparece aqui.

## Telas

| Aba | Conteúdo |
|---|---|
| **Visão Geral** | KPIs (candidatos únicos, candidaturas recebidas, taxa de aceite, pendentes) + ranking dos programas com mais candidaturas |
| **Funil de Avaliação** | Status (Pendente/Aceito/Recusado) por programa em barras empilhadas + tabela de auditoria de documentos (RG, diploma, histórico, currículo) com paginação e botão simulado "Abrir PDF" |
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
│   ├── mockData.js   # gerador dos dados fictícios (schema espelha GCUB/db/gcub.db)
│   ├── App.jsx        # componente único: layout, filtros, 4 abas, gráficos
│   └── index.css      # tokens de cor (claro/escuro) + Tailwind
├── docs/              # build publicado (GitHub Pages, pasta docs/)
└── vite.config.js
```

## Rodar localmente

```bash
npm install
npm run dev        # http://localhost:5173
npm run build       # gera docs/index.html (publicado via GitHub Pages)
```

## Dados reais (próximo passo)

O schema fictício em `mockData.js` espelha as tabelas reais em
`WEBSCRAPING/GCUB/db/gcub.db` (`candidatos`, `candidaturas_uea`,
`programas_escolhidos`, `documentos_anexados`, `programas_uea`). Para
plugar dados reais, trocar o import de `./mockData` por um JSON exportado
desse banco (mesmo padrão de `DASHBOARD 2/etl/export_dashboard_data.py`) —
tomando cuidado para **agregar/anonimizar** antes de publicar, já que o
banco real contém dados pessoais de candidatos (ver
`WEBSCRAPING/GCUB/README.txt`, seção 4).
