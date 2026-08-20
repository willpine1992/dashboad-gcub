import { useMemo, useState } from "react";
import {
  LayoutDashboard,
  ListChecks,
  TrendingUp,
  Users,
  CheckCircle2,
  AlertTriangle,
  FileText,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Globe2,
  GraduationCap,
  Percent,
  Clock3,
  Building2,
  UserCheck,
  Accessibility,
  Filter,
} from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
  PieChart,
  Pie,
  Legend,
} from "recharts";
import { DATASET } from "./mockData";

// Cores fixas (hex) para marcas de gráfico: atributos de apresentação SVG
// (fill/stroke) não resolvem var() no Chrome — só funciona dentro de
// style={{...}}. Por isso os elementos <Bar>/<Cell>/<Pie> usam este mapa,
// enquanto o resto da UI (badges, texto, fundo) continua nos tokens CSS.
const STATUS_HEX = {
  Pendente: "#c9861a",
  Aceito: "#1f8a5f",
  Recusado: "#c0433a",
};
const CHART_HEX = {
  accent: "#1f8a5f",
  gold: "#b8892f",
  cat: ["#1f8a5f", "#b8892f", "#2a78d6", "#8a5fd6", "#1baf7a", "#c0433a"],
};

const STATUS_COLOR = {
  Pendente: "var(--status-pendente)",
  Aceito: "var(--status-aceito)",
  Recusado: "var(--status-recusado)",
};
const STATUS_SOFT = {
  Pendente: "var(--status-pendente-soft)",
  Aceito: "var(--status-aceito-soft)",
  Recusado: "var(--status-recusado-soft)",
};

const NAV_ITEMS = [
  { id: "visao-geral", label: "Visão Geral", icon: LayoutDashboard },
  { id: "funil", label: "Funil de Avaliação", icon: ListChecks },
  { id: "demanda", label: "Demanda e Atratividade", icon: TrendingUp },
  { id: "perfil", label: "Perfil dos Candidatos", icon: Users },
];

const CAT_COLORS = CHART_HEX.cat;

function StatusBadge({ status }) {
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold"
      style={{ background: STATUS_SOFT[status], color: STATUS_COLOR[status] }}
    >
      <span className="h-1.5 w-1.5 rounded-full" style={{ background: STATUS_COLOR[status] }} />
      {status}
    </span>
  );
}

function DocFlag({ ok }) {
  return ok ? (
    <CheckCircle2 className="h-4 w-4" style={{ color: "var(--status-aceito)" }} aria-label="Anexado" />
  ) : (
    <AlertTriangle className="h-4 w-4" style={{ color: "var(--status-pendente)" }} aria-label="Faltando" />
  );
}

function ChartCard({ title, subtitle, children, className = "" }) {
  return (
    <div
      className={`panel-shadow rounded-2xl border p-5 ${className}`}
      style={{ background: "var(--surface-panel)", borderColor: "var(--border-hairline)" }}
    >
      <div className="mb-4">
        <h3 className="text-sm font-bold" style={{ color: "var(--ink-primary)" }}>
          {title}
        </h3>
        {subtitle && (
          <p className="mt-0.5 text-xs" style={{ color: "var(--ink-muted)" }}>
            {subtitle}
          </p>
        )}
      </div>
      {children}
    </div>
  );
}

function KpiCard({ icon: Icon, label, value, hint, accent = "green" }) {
  const tint = accent === "gold" ? "var(--gold-soft)" : "var(--accent-soft)";
  const ink = accent === "gold" ? "var(--gold-strong)" : "var(--accent-strong)";
  return (
    <div
      className="panel-shadow flex items-start gap-4 rounded-2xl border p-5"
      style={{ background: "var(--surface-panel)", borderColor: "var(--border-hairline)" }}
    >
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl" style={{ background: tint }}>
        <Icon className="h-5 w-5" style={{ color: ink }} />
      </div>
      <div className="min-w-0">
        <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--ink-muted)" }}>
          {label}
        </p>
        <p className="tabular mt-1 text-2xl font-extrabold" style={{ color: "var(--ink-primary)" }}>
          {value}
        </p>
        {hint && (
          <p className="mt-0.5 text-xs" style={{ color: "var(--ink-muted)" }}>
            {hint}
          </p>
        )}
      </div>
    </div>
  );
}

function GlobalFilters({ programas, programaFiltro, setProgramaFiltro, nivelFiltro, setNivelFiltro }) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <div
        className="flex items-center gap-2 rounded-xl border px-3 py-2 text-xs font-semibold"
        style={{ borderColor: "var(--border-hairline)", color: "var(--ink-muted)" }}
      >
        <Filter className="h-3.5 w-3.5" />
        Filtros
      </div>
      <select
        value={programaFiltro}
        onChange={(e) => setProgramaFiltro(e.target.value)}
        className="rounded-xl border px-3 py-2 text-sm font-medium outline-none"
        style={{ borderColor: "var(--border-hairline)", background: "var(--surface-panel)", color: "var(--ink-secondary)" }}
      >
        <option value="todos">Todos os programas</option>
        {programas.map((p) => (
          <option key={p.id} value={String(p.id)}>
            {p.sigla} · {p.nivel}
          </option>
        ))}
      </select>
      <select
        value={nivelFiltro}
        onChange={(e) => setNivelFiltro(e.target.value)}
        className="rounded-xl border px-3 py-2 text-sm font-medium outline-none"
        style={{ borderColor: "var(--border-hairline)", background: "var(--surface-panel)", color: "var(--ink-secondary)" }}
      >
        <option value="todos">Mestrado e Doutorado</option>
        <option value="Mestrado">Mestrado</option>
        <option value="Doutorado">Doutorado</option>
      </select>
    </div>
  );
}

function VisaoGeral({ candidaturas, candidatosUnicos, programas }) {
  const total = candidatosUnicos.size;
  const recebidas = candidaturas.length;
  const aceitas = candidaturas.filter((c) => c.decisao === "Aceito").length;
  const pendentes = candidaturas.filter((c) => c.decisao === "Pendente").length;
  const taxaAceite = recebidas ? ((aceitas / recebidas) * 100).toFixed(1) : "0.0";

  const porPrograma = useMemo(() => {
    const map = new Map();
    for (const c of candidaturas) {
      map.set(c.programa_uea_sigla, (map.get(c.programa_uea_sigla) || 0) + 1);
    }
    return [...map.entries()]
      .map(([sigla, total]) => ({ sigla, total }))
      .sort((a, b) => b.total - a.total)
      .slice(0, 6);
  }, [candidaturas]);

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <KpiCard icon={Users} label="Candidatos únicos" value={total.toLocaleString("pt-BR")} hint="Pessoas físicas distintas" />
        <KpiCard icon={FileText} label="Candidaturas recebidas" value={recebidas.toLocaleString("pt-BR")} hint="Candidato × programa UEA" accent="gold" />
        <KpiCard icon={Percent} label="Taxa de aceite" value={`${taxaAceite}%`} hint={`${aceitas} candidaturas aceitas`} />
        <KpiCard icon={Clock3} label="Processos pendentes" value={pendentes.toLocaleString("pt-BR")} hint="Aguardando decisão da coordenação" accent="gold" />
      </div>

      <ChartCard title="Programas com mais candidaturas" subtitle="Top 6 no recorte filtrado atual">
        <div className="flex flex-col gap-3">
          {porPrograma.map((p, i) => {
            const max = porPrograma[0]?.total || 1;
            return (
              <div key={p.sigla} className="flex items-center gap-3">
                <span className="w-28 shrink-0 truncate text-xs font-semibold" style={{ color: "var(--ink-secondary)" }}>
                  {p.sigla}
                </span>
                <div className="h-2.5 flex-1 overflow-hidden rounded-full" style={{ background: "var(--surface-alt)" }}>
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${(p.total / max) * 100}%`, background: i === 0 ? "var(--gold)" : "var(--accent)" }}
                  />
                </div>
                <span className="tabular w-8 shrink-0 text-right text-xs font-bold" style={{ color: "var(--ink-primary)" }}>
                  {p.total}
                </span>
              </div>
            );
          })}
        </div>
      </ChartCard>
    </div>
  );
}

function FunilAvaliacao({ candidaturas, programas }) {
  const [page, setPage] = useState(0);
  const pageSize = 8;

  const porProgramaStatus = useMemo(() => {
    const map = new Map();
    for (const p of programas) map.set(p.sigla, { sigla: p.sigla, Pendente: 0, Aceito: 0, Recusado: 0 });
    for (const c of candidaturas) {
      const row = map.get(c.programa_uea_sigla);
      if (row) row[c.decisao] += 1;
    }
    return [...map.values()]
      .filter((r) => r.Pendente + r.Aceito + r.Recusado > 0)
      .sort((a, b) => b.Pendente + b.Aceito + b.Recusado - (a.Pendente + a.Aceito + a.Recusado));
  }, [candidaturas, programas]);

  const totalPages = Math.max(1, Math.ceil(candidaturas.length / pageSize));
  const pageRows = candidaturas.slice(page * pageSize, page * pageSize + pageSize);

  return (
    <div className="flex flex-col gap-6">
      <ChartCard title="Status das candidaturas por programa" subtitle="Pendente vs. Aceito vs. Recusado">
        <div style={{ width: "100%", height: Math.max(320, porProgramaStatus.length * 34) }}>
          <ResponsiveContainer>
            <BarChart data={porProgramaStatus} layout="vertical" margin={{ left: 8, right: 16, top: 4, bottom: 4 }} barCategoryGap={10}>
              <CartesianGrid stroke="var(--border-hairline)" horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 11, fill: "var(--ink-muted)" }} axisLine={{ stroke: "var(--border-hairline)" }} tickLine={false} />
              <YAxis
                dataKey="sigla"
                type="category"
                width={110}
                tick={{ fontSize: 11, fill: "var(--ink-secondary)", fontWeight: 600 }}
                axisLine={{ stroke: "var(--border-hairline)" }}
                tickLine={false}
              />
              <Tooltip
                contentStyle={{ borderRadius: 12, border: "1px solid var(--border-hairline)", fontSize: 12, background: "var(--surface-panel)" }}
              />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Bar dataKey="Pendente" stackId="s" fill={STATUS_HEX.Pendente} radius={[0, 0, 0, 0]} />
              <Bar dataKey="Aceito" stackId="s" fill={STATUS_HEX.Aceito} radius={[0, 0, 0, 0]} />
              <Bar dataKey="Recusado" stackId="s" fill={STATUS_HEX.Recusado} radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </ChartCard>

      <ChartCard title="Auditoria de documentos" subtitle="Checagem rápida de anexos por candidatura — clique em “Abrir PDF” para simular a visualização">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] border-collapse text-sm">
            <thead>
              <tr className="text-left text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--ink-muted)" }}>
                <th className="border-b py-2.5 pr-3" style={{ borderColor: "var(--border-hairline)" }}>
                  Candidato
                </th>
                <th className="border-b py-2.5 pr-3" style={{ borderColor: "var(--border-hairline)" }}>
                  Programa
                </th>
                <th className="border-b py-2.5 pr-3" style={{ borderColor: "var(--border-hairline)" }}>
                  Status
                </th>
                {["Identidade", "Diploma", "Histórico", "Currículo"].map((h) => (
                  <th key={h} className="border-b py-2.5 pr-3 text-center" style={{ borderColor: "var(--border-hairline)" }}>
                    {h}
                  </th>
                ))}
                <th className="border-b py-2.5" style={{ borderColor: "var(--border-hairline)" }} />
              </tr>
            </thead>
            <tbody>
              {pageRows.map((c) => (
                <tr key={c.id} className="transition-colors hover:opacity-90" style={{ borderColor: "var(--border-hairline)" }}>
                  <td className="border-b py-2.5 pr-3 font-medium" style={{ borderColor: "var(--border-hairline)", color: "var(--ink-primary)" }}>
                    {c.candidato_nome}
                    <div className="text-xs font-normal" style={{ color: "var(--ink-muted)" }}>
                      {c.pais_origem}
                    </div>
                  </td>
                  <td className="border-b py-2.5 pr-3" style={{ borderColor: "var(--border-hairline)", color: "var(--ink-secondary)" }}>
                    {c.programa_uea_sigla}
                  </td>
                  <td className="border-b py-2.5 pr-3" style={{ borderColor: "var(--border-hairline)" }}>
                    <StatusBadge status={c.decisao} />
                  </td>
                  {c.documentos.map((d) => (
                    <td key={d.tipo} className="border-b py-2.5 pr-3 text-center" style={{ borderColor: "var(--border-hairline)" }}>
                      <DocFlag ok={d.anexado} />
                    </td>
                  ))}
                  <td className="border-b py-2.5" style={{ borderColor: "var(--border-hairline)" }}>
                    <button
                      type="button"
                      onClick={() => alert(`Simulação — abriria o dossiê em PDF de ${c.candidato_nome} (candidatura #${c.id}).`)}
                      className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-semibold transition-colors"
                      style={{ background: "var(--accent-soft)", color: "var(--accent-strong)" }}
                    >
                      Abrir PDF <ExternalLink className="h-3 w-3" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 flex items-center justify-between text-xs" style={{ color: "var(--ink-muted)" }}>
          <span>
            Mostrando {page * pageSize + 1}–{Math.min((page + 1) * pageSize, candidaturas.length)} de {candidaturas.length} candidaturas
          </span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={page === 0}
              onClick={() => setPage((p) => Math.max(0, p - 1))}
              className="flex h-7 w-7 items-center justify-center rounded-lg border disabled:opacity-30"
              style={{ borderColor: "var(--border-hairline)" }}
            >
              <ChevronLeft className="h-3.5 w-3.5" />
            </button>
            <span className="tabular font-semibold" style={{ color: "var(--ink-secondary)" }}>
              {page + 1} / {totalPages}
            </span>
            <button
              type="button"
              disabled={page >= totalPages - 1}
              onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
              className="flex h-7 w-7 items-center justify-center rounded-lg border disabled:opacity-30"
              style={{ borderColor: "var(--border-hairline)" }}
            >
              <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </ChartCard>
    </div>
  );
}

function DemandaAtratividade({ candidaturas, programas }) {
  const porOrdem = useMemo(() => {
    const map = new Map([
      ["1ª opção", 0],
      ["2ª opção", 0],
      ["3ª opção", 0],
      ["4ª opção", 0],
    ]);
    for (const c of candidaturas) map.set(c.ordem_preferencia, (map.get(c.ordem_preferencia) || 0) + 1);
    return [...map.entries()].map(([name, value]) => ({ name, value }));
  }, [candidaturas]);

  const concorrencia = useMemo(() => {
    const map = new Map();
    for (const p of programas) map.set(p.sigla, { sigla: p.sigla, candidaturas: 0, vagas: p.vagas });
    for (const c of candidaturas) {
      const row = map.get(c.programa_uea_sigla);
      if (row) row.candidaturas += 1;
    }
    return [...map.values()]
      .filter((r) => r.candidaturas > 0)
      .map((r) => ({ ...r, ratio: +(r.candidaturas / r.vagas).toFixed(1) }))
      .sort((a, b) => b.ratio - a.ratio)
      .slice(0, 8);
  }, [candidaturas, programas]);

  return (
    <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
      <ChartCard title="Ordem de preferência pela UEA" subtitle="Em que posição do edital a UEA foi escolhida">
        <div style={{ width: "100%", height: 300 }}>
          <ResponsiveContainer>
            <PieChart>
              <Pie data={porOrdem} dataKey="value" nameKey="name" innerRadius={64} outerRadius={104} paddingAngle={2}>
                {porOrdem.map((_, i) => (
                  <Cell key={i} fill={CAT_COLORS[i % CAT_COLORS.length]} />
                ))}
              </Pie>
              <Legend verticalAlign="bottom" wrapperStyle={{ fontSize: 12 }} />
              <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid var(--border-hairline)", fontSize: 12, background: "var(--surface-panel)" }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <p className="mt-2 text-center text-xs" style={{ color: "var(--ink-muted)" }}>
          {porOrdem[0] && `${((porOrdem[0].value / candidaturas.length) * 100).toFixed(0)}% escolheram a UEA como 1ª opção`}
        </p>
      </ChartCard>

      <ChartCard title="Concorrência por vaga" subtitle="Candidaturas ÷ vagas ofertadas — programas mais disputados">
        <div style={{ width: "100%", height: 300 }}>
          <ResponsiveContainer>
            <BarChart data={concorrencia} margin={{ left: 0, right: 8, top: 8, bottom: 24 }}>
              <CartesianGrid stroke="var(--border-hairline)" vertical={false} />
              <XAxis dataKey="sigla" tick={{ fontSize: 10, fill: "var(--ink-muted)" }} axisLine={{ stroke: "var(--border-hairline)" }} tickLine={false} angle={-25} textAnchor="end" height={50} />
              <YAxis tick={{ fontSize: 11, fill: "var(--ink-muted)" }} axisLine={{ stroke: "var(--border-hairline)" }} tickLine={false} unit="x" />
              <Tooltip
                formatter={(v, n, p) => [`${v}x (${p.payload.candidaturas} candidaturas / ${p.payload.vagas} vagas)`, "Concorrência"]}
                contentStyle={{ borderRadius: 12, border: "1px solid var(--border-hairline)", fontSize: 12, background: "var(--surface-panel)" }}
              />
              <Bar dataKey="ratio" radius={[6, 6, 0, 0]}>
                {concorrencia.map((_, i) => (
                  <Cell key={i} fill={i === 0 ? CHART_HEX.gold : CHART_HEX.accent} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </ChartCard>
    </div>
  );
}

function SplitStat({ label, a, b, colorA = "var(--accent)", colorB = "var(--border-strong)" }) {
  const total = a.value + b.value;
  const pctA = total ? Math.round((a.value / total) * 100) : 0;
  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between text-xs font-semibold" style={{ color: "var(--ink-secondary)" }}>
        <span>{label}</span>
        <span className="tabular" style={{ color: "var(--ink-muted)" }}>
          {a.value} / {b.value}
        </span>
      </div>
      <div className="flex h-3 overflow-hidden rounded-full" style={{ background: "var(--surface-alt)" }}>
        <div style={{ width: `${pctA}%`, background: colorA }} />
        <div style={{ width: `${100 - pctA}%`, background: colorB }} />
      </div>
      <div className="mt-1.5 flex justify-between text-[11px]" style={{ color: "var(--ink-muted)" }}>
        <span>
          {a.label} · {pctA}%
        </span>
        <span>
          {b.label} · {100 - pctA}%
        </span>
      </div>
    </div>
  );
}

function PerfilCandidatos({ candidatos }) {
  const porPais = useMemo(() => {
    const map = new Map();
    for (const c of candidatos) map.set(c.pais_origem, (map.get(c.pais_origem) || 0) + 1);
    return [...map.entries()]
      .map(([pais, total]) => ({ pais, total }))
      .sort((a, b) => b.total - a.total)
      .slice(0, 10);
  }, [candidatos]);

  const porFaixaEtaria = useMemo(() => {
    const buckets = [
      { name: "18–24", min: 18, max: 24, value: 0 },
      { name: "25–29", min: 25, max: 29, value: 0 },
      { name: "30–34", min: 30, max: 34, value: 0 },
      { name: "35–39", min: 35, max: 39, value: 0 },
      { name: "40+", min: 40, max: 200, value: 0 },
    ];
    for (const c of candidatos) {
      const b = buckets.find((x) => c.idade >= x.min && c.idade <= x.max);
      if (b) b.value += 1;
    }
    return buckets;
  }, [candidatos]);

  const sexoM = candidatos.filter((c) => c.sexo === "Masculino").length;
  const sexoF = candidatos.filter((c) => c.sexo === "Feminino").length;
  const pcdCount = candidatos.filter((c) => c.possui_deficiencia).length;
  const pcdPct = candidatos.length ? ((pcdCount / candidatos.length) * 100).toFixed(1) : "0.0";
  const profSim = candidatos.filter((c) => c.e_professor_universitario).length;
  const profNao = candidatos.length - profSim;
  const instPublica = candidatos.filter((c) => c.tipo_instituicao === "Pública").length;
  const instPrivada = candidatos.length - instPublica;

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <ChartCard title="Principais países de origem" subtitle="Top 10 no recorte filtrado atual">
          <div style={{ width: "100%", height: 320 }}>
            <ResponsiveContainer>
              <BarChart data={porPais} layout="vertical" margin={{ left: 8, right: 16, top: 4, bottom: 4 }}>
                <CartesianGrid stroke="var(--border-hairline)" horizontal={false} />
                <XAxis type="number" tick={{ fontSize: 11, fill: "var(--ink-muted)" }} axisLine={{ stroke: "var(--border-hairline)" }} tickLine={false} />
                <YAxis dataKey="pais" type="category" width={120} tick={{ fontSize: 11, fill: "var(--ink-secondary)", fontWeight: 600 }} axisLine={{ stroke: "var(--border-hairline)" }} tickLine={false} />
                <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid var(--border-hairline)", fontSize: 12, background: "var(--surface-panel)" }} />
                <Bar dataKey="total" radius={[0, 6, 6, 0]}>
                  {porPais.map((_, i) => (
                    <Cell key={i} fill={i === 0 ? CHART_HEX.gold : CHART_HEX.accent} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        <ChartCard title="Faixa etária" subtitle="Distribuição por idade estimada">
          <div style={{ width: "100%", height: 320 }}>
            <ResponsiveContainer>
              <BarChart data={porFaixaEtaria} margin={{ left: 0, right: 8, top: 8, bottom: 4 }}>
                <CartesianGrid stroke="var(--border-hairline)" vertical={false} />
                <XAxis dataKey="name" tick={{ fontSize: 11, fill: "var(--ink-muted)" }} axisLine={{ stroke: "var(--border-hairline)" }} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "var(--ink-muted)" }} axisLine={{ stroke: "var(--border-hairline)" }} tickLine={false} />
                <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid var(--border-hairline)", fontSize: 12, background: "var(--surface-panel)" }} />
                <Bar dataKey="value" radius={[6, 6, 0, 0]} fill={CHART_HEX.accent} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <ChartCard title="Sexo">
          <SplitStat
            label="Distribuição"
            a={{ label: "Feminino", value: sexoF }}
            b={{ label: "Masculino", value: sexoM }}
            colorA="var(--gold)"
            colorB="var(--accent)"
          />
        </ChartCard>
        <ChartCard title="Professor(a) universitário(a)">
          <SplitStat label="Vínculo docente" a={{ label: "Sim", value: profSim }} b={{ label: "Não", value: profNao }} />
        </ChartCard>
        <ChartCard title="Instituição de origem">
          <SplitStat label="Tipo" a={{ label: "Pública", value: instPublica }} b={{ label: "Privada", value: instPrivada }} colorA="var(--accent)" colorB="var(--gold)" />
        </ChartCard>
      </div>

      <ChartCard title="Candidatos com deficiência (PCD)">
        <div className="flex items-center gap-5">
          <div
            className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full"
            style={{ background: "var(--accent-soft)" }}
          >
            <Accessibility className="h-7 w-7" style={{ color: "var(--accent-strong)" }} />
          </div>
          <div>
            <p className="tabular text-3xl font-extrabold" style={{ color: "var(--ink-primary)" }}>
              {pcdPct}%
            </p>
            <p className="text-xs" style={{ color: "var(--ink-muted)" }}>
              {pcdCount} de {candidatos.length} candidatos declaram alguma deficiência
            </p>
          </div>
        </div>
      </ChartCard>
    </div>
  );
}

export default function App() {
  const [tab, setTab] = useState("visao-geral");
  const [programaFiltro, setProgramaFiltro] = useState("todos");
  const [nivelFiltro, setNivelFiltro] = useState("todos");

  const candidaturasFiltradas = useMemo(() => {
    return DATASET.candidaturas.filter((c) => {
      if (programaFiltro !== "todos" && String(c.programa_uea_id) !== programaFiltro) return false;
      if (nivelFiltro !== "todos" && c.nivel !== nivelFiltro) return false;
      return true;
    });
  }, [programaFiltro, nivelFiltro]);

  const candidatosFiltrados = useMemo(() => {
    const ids = new Set(candidaturasFiltradas.map((c) => c.candidato_id));
    return DATASET.candidatos.filter((c) => ids.has(c.id));
  }, [candidaturasFiltradas]);

  const candidatosUnicos = useMemo(() => new Set(candidaturasFiltradas.map((c) => c.candidato_id)), [candidaturasFiltradas]);

  return (
    <div className="flex min-h-screen" style={{ background: "var(--surface-page)" }}>
      <aside
        className="hidden w-64 shrink-0 flex-col gap-1 px-4 py-6 md:flex"
        style={{ background: "var(--surface-sidebar)" }}
      >
        <div className="mb-6 flex items-center gap-3 px-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl" style={{ background: "var(--gold)" }}>
            <GraduationCap className="h-5 w-5" style={{ color: "var(--surface-sidebar)" }} />
          </div>
          <div>
            <p className="text-sm font-extrabold" style={{ color: "var(--ink-on-sidebar)" }}>
              GCUB-MOB
            </p>
            <p className="text-[11px]" style={{ color: "var(--ink-on-sidebar-muted)" }}>
              Universidade do Estado do Amazonas
            </p>
          </div>
        </div>

        <nav className="flex flex-col gap-1">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const active = tab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setTab(item.id)}
                className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-semibold transition-colors"
                style={{
                  background: active ? "var(--surface-sidebar-hover)" : "transparent",
                  color: active ? "var(--gold)" : "var(--ink-on-sidebar)",
                  borderLeft: active ? "3px solid var(--gold)" : "3px solid transparent",
                }}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="mt-auto rounded-xl px-3 py-3" style={{ background: "var(--surface-sidebar-hover)" }}>
          <p className="flex items-center gap-1.5 text-[11px] font-semibold" style={{ color: "var(--ink-on-sidebar-muted)" }}>
            <Globe2 className="h-3 w-3" /> Edital de Mobilidade
          </p>
          <p className="mt-1 text-[11px] leading-relaxed" style={{ color: "var(--ink-on-sidebar-muted)" }}>
            Protótipo com dados fictícios para simulação de layout — não reflete candidatos reais.
          </p>
        </div>
      </aside>

      <main className="min-w-0 flex-1 px-5 py-6 sm:px-8 sm:py-8">
        <header className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-xl font-extrabold" style={{ color: "var(--ink-primary)" }}>
              {NAV_ITEMS.find((n) => n.id === tab)?.label}
            </h1>
            <p className="mt-0.5 text-sm" style={{ color: "var(--ink-muted)" }}>
              Painel de mobilidade internacional · edital GCUB-MOB
            </p>
          </div>
          <GlobalFilters
            programas={DATASET.programas}
            programaFiltro={programaFiltro}
            setProgramaFiltro={setProgramaFiltro}
            nivelFiltro={nivelFiltro}
            setNivelFiltro={setNivelFiltro}
          />
        </header>

        {tab === "visao-geral" && (
          <VisaoGeral candidaturas={candidaturasFiltradas} candidatosUnicos={candidatosUnicos} programas={DATASET.programas} />
        )}
        {tab === "funil" && <FunilAvaliacao candidaturas={candidaturasFiltradas} programas={DATASET.programas} />}
        {tab === "demanda" && <DemandaAtratividade candidaturas={candidaturasFiltradas} programas={DATASET.programas} />}
        {tab === "perfil" && <PerfilCandidatos candidatos={candidatosFiltrados} />}
      </main>
    </div>
  );
}
