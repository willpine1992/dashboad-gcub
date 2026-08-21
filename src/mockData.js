// Dados fictícios que simulam o schema real do GCUB/db/gcub.db
// (candidatos, candidaturas_uea, programas_escolhidos, documentos_anexados,
// programas_uea). Nomes, e-mails e documentos são inventados; a forma da
// distribuição (países, decisões, volume por programa) segue a proporção
// observada na raspagem real do edital GCUB-MOB da UEA.

export const PROGRAMAS_UEA = [
  { id: 5, nome: "Gestão e Regulação de Recursos Hídricos", nivel: "Mestrado", sigla: "PPGRH", vagas: 4 },
  { id: 10, nome: "Processos e Tecnologias Educacionais em Rede (ProfEducatec)", nivel: "Mestrado", sigla: "ProfEducatec", vagas: 3 },
  { id: 9, nome: "Ciências Aplicadas à Dermatologia", nivel: "Mestrado", sigla: "PPGCAD", vagas: 2 },
  { id: 1, nome: "Ciências Aplicadas à Hematologia", nivel: "Mestrado", sigla: "PPGH", vagas: 3 },
  { id: 4, nome: "Direito Ambiental", nivel: "Mestrado", sigla: "PPGDA-M", vagas: 4 },
  { id: 15, nome: "Direito Ambiental", nivel: "Doutorado", sigla: "PPGDA-D", vagas: 2 },
  { id: 7, nome: "Educação (PPGED)", nivel: "Mestrado", sigla: "PPGED", vagas: 5 },
  { id: 6, nome: "Educação em Ciências na Amazônia", nivel: "Mestrado", sigla: "PPGECA-M", vagas: 4 },
  { id: 14, nome: "Educação em Ciências na Amazônia", nivel: "Doutorado", sigla: "PPGECA-D", vagas: 2 },
  { id: 13, nome: "Enfermagem em Saúde Pública — ProEnSP", nivel: "Mestrado", sigla: "ProEnSP-M", vagas: 3 },
  { id: 17, nome: "Enfermagem em Saúde Pública — ProEnSP", nivel: "Doutorado", sigla: "ProEnSP-D", vagas: 2 },
  { id: 12, nome: "Geografia", nivel: "Mestrado", sigla: "PPGEO", vagas: 3 },
  { id: 3, nome: "Letras e Artes", nivel: "Mestrado", sigla: "PPGLA", vagas: 4 },
  { id: 16, nome: "Medicina Tropical / Doenças Tropicais e Infecciosas", nivel: "Doutorado", sigla: "PPGMT", vagas: 2 },
  { id: 8, nome: "Segurança Pública, Cidadania e Direitos Humanos (PPGSP)", nivel: "Mestrado", sigla: "PPGSP", vagas: 5 },
  { id: 2, nome: "Ciências Humanas (interdisciplinar)", nivel: "Mestrado", sigla: "PPGCH", vagas: 3 },
  { id: 11, nome: "Biotecnologia e Recursos Naturais da Amazônia", nivel: "Mestrado", sigla: "PPGBIOTEC", vagas: 4 },
];

// Contato real dos PPGs da UEA (WEBSCRAPING/GCUB/db/gcub.db, tabela
// ppgs_uea — e-mail institucional oficial + coordenador(a)). 14 dos 17
// programas do edital GCUB-MOB têm contato cadastrado até agora — os
// demais ficam de fora do mapa ("sem contato cadastrado" na tela).
export const PPGS_EMAILS = {
  1: { sigla: "PPGH", nome: "Ciências Aplicadas à Hematologia (PPGH)", emailPpg: "mestrado@hemoam.am.gov.br", coordenadorNome: "Andrea Monteiro Tarragô", coordenadorEmail: "andrea_s_monteiro@hotmail.com" },
  2: { sigla: "PPGICH", nome: "Interdisciplinar em Ciências Humanas (PPGICH)", emailPpg: "cienciashumanas@uea.edu.br", coordenadorNome: "Lúcia Marina Puga Ferreira", coordenadorEmail: "lpuga@uea.edu.br" },
  3: { sigla: "PPGLA", nome: "Letras e Artes (PPGLA)", emailPpg: "ppgla@uea.edu.br", coordenadorNome: "Allison Marcos Leão da Silva", coordenadorEmail: "allisonleao@uea.edu.br" },
  4: { sigla: "PPGDA", nome: "Direito Ambiental (PPGDA)", emailPpg: "pmda@uea.edu.br", coordenadorNome: "Erivaldo Cavalcanti e Silva Filho", coordenadorEmail: "ecfilho@uea.edu.br" },
  5: { sigla: "PROFAGUA", nome: "Gestão e Regulação de Recursos Hídricos (PROFÁGUA)", emailPpg: "mestradoprofagua@uea.edu.br", coordenadorNome: "Iêda Hortêncio Batista", coordenadorEmail: "ibatista@uea.edu.br" },
  6: { sigla: "PPGECA", nome: "Educação em Ciências na Amazônia (PPGECA)", emailPpg: "ppgeec@uea.edu.br", coordenadorNome: "Caroline Barroncas de Oliveira", coordenadorEmail: "cboliveira@uea.edu.br" },
  7: { sigla: "PPGED", nome: "Educação (PPGED)", emailPpg: "ppged@uea.edu.br", coordenadorNome: "Vilma Terezinha de Araújo Lima", coordenadorEmail: "vtlima@uea.edu.br" },
  8: { sigla: "PPGSP", nome: "Segurança Pública, Cidadania e Direitos Humanos (PPGSP)", emailPpg: "ppgsp@uea.edu.br", coordenadorNome: "Dorli João Carlos Marques", coordenadorEmail: "dmarques@uea.edu.br" },
  9: { sigla: "PPGCAD", nome: "Ciências Aplicadas à Dermatologia (PPGCAD)", emailPpg: "ppgdermatologia@fuam.am.gov.br", coordenadorNome: "Carolina Chrusciak Talhari Cortez", coordenadorEmail: "carolinatalhari@gmail.com" },
  10: { sigla: "ProfEducatec", nome: "Processos e Tecnologias Educacionais (ProfEducatec)", emailPpg: "profeducatec@uea.edu.br", coordenadorNome: null, coordenadorEmail: null },
  11: { sigla: "PPGMBT", nome: "Biotecnologia e Recursos Naturais da Amazônia (PPGMBT)", emailPpg: "mbt@uea.edu.br", coordenadorNome: "Jair Max Furtunato Maia", coordenadorEmail: "jmaia@uea.edu.br" },
  12: { sigla: "PPGEO", nome: "Geografia (PPGEO)", emailPpg: "ppgeouea@uea.edu.br", coordenadorNome: "Julien Marius Reis Thevenin", coordenadorEmail: "jthevenin@uea.edu.br" },
  13: { sigla: "ProEnSP", nome: "Enfermagem em Saúde Pública (ProEnSP)", emailPpg: "proensp@uea.edu.br", coordenadorNome: "Amélia Nunes Sicsú", coordenadorEmail: "asicsu@uea.edu.br" },
  16: { sigla: "PPGMT", nome: "Medicina Tropical (PPGMT)", emailPpg: "ppgmt.uea@fmt.am.gov.br", coordenadorNome: "Gisely Cardoso de Melo", coordenadorEmail: "gcmelo@uea.edu.br" },
};

// Peso ~ proporcional à distribuição real observada na raspagem (Nigéria,
// Afeganistão, Moçambique, Paquistão, Angola, Palestina, Haiti... no topo).
const PAISES = [
  { pais: "Nigéria", peso: 22, regiao: "África Ocidental" },
  { pais: "Afeganistão", peso: 10, regiao: "Ásia Central" },
  { pais: "Moçambique", peso: 10, regiao: "África Austral" },
  { pais: "Paquistão", peso: 9, regiao: "Sul da Ásia" },
  { pais: "Angola", peso: 8, regiao: "África Central" },
  { pais: "Palestina", peso: 6, regiao: "Oriente Médio" },
  { pais: "Haiti", peso: 5, regiao: "Caribe" },
  { pais: "Camarões", peso: 3, regiao: "África Central" },
  { pais: "Peru", peso: 3, regiao: "América do Sul" },
  { pais: "Colômbia", peso: 2, regiao: "América do Sul" },
  { pais: "Gana", peso: 2, regiao: "África Ocidental" },
  { pais: "Quênia", peso: 2, regiao: "África Oriental" },
  { pais: "Guiné-Bissau", peso: 2, regiao: "África Ocidental" },
  { pais: "Bolívia", peso: 2, regiao: "América do Sul" },
  { pais: "Nepal", peso: 2, regiao: "Sul da Ásia" },
  { pais: "Iêmen", peso: 2, regiao: "Oriente Médio" },
  { pais: "Síria", peso: 2, regiao: "Oriente Médio" },
  { pais: "Outros (23 países)", peso: 8, regiao: "Diversos" },
];

const NOMES_POR_REGIAO = {
  "África Ocidental": {
    f: ["Amara", "Chiamaka", "Ngozi", "Adaeze", "Folake", "Aisha", "Abiodun"],
    m: ["Chukwuemeka", "Oluwaseun", "Ibrahim", "Kwame", "Emeka", "Tunde", "Adewale"],
    sobre: ["Okafor", "Adeyemi", "Balogun", "Eze", "Mensah", "Osei", "Diallo"],
  },
  "África Central": {
    f: ["Nsimba", "Beatriz", "Esperança", "Domingas", "Tandiwe"],
    m: ["Kiala", "João", "Domingos", "Ndongala", "Mbala"],
    sobre: ["Kianda", "Sachipengo", "Nzuzi", "Muteba", "Massano"],
  },
  "África Austral": {
    f: ["Amélia", "Custódia", "Sheila", "Ivone", "Marta"],
    m: ["Armando", "Bento", "Sidónio", "Ernesto", "Faruk"],
    sobre: ["Machava", "Muianga", "Cossa", "Nhaca", "Sitoe"],
  },
  "África Oriental": {
    f: ["Amina", "Wanjiru", "Zawadi", "Naledi"],
    m: ["Kiptoo", "Omondi", "Juma", "Otieno"],
    sobre: ["Mwangi", "Kamau", "Otieno", "Wekesa"],
  },
  "Ásia Central": {
    f: ["Zahra", "Fatima", "Roya", "Freshta", "Wahida"],
    m: ["Ahmadullah", "Najibullah", "Mirwais", "Ehsanullah", "Rahmatullah"],
    sobre: ["Rahimi", "Sherzai", "Popal", "Nazari", "Aziz"],
  },
  "Sul da Ásia": {
    f: ["Ayesha", "Sundas", "Kiran", "Anjali", "Priya"],
    m: ["Muhammad", "Usman", "Bilal", "Rajesh", "Arjun"],
    sobre: ["Khan", "Ahmed", "Sharma", "Malik", "Iqbal"],
  },
  "Oriente Médio": {
    f: ["Lina", "Rana", "Salma", "Noor", "Layla"],
    m: ["Yousef", "Khalil", "Rami", "Omar", "Tariq"],
    sobre: ["Haddad", "Saleh", "Aljundi", "Mansour", "Qassem"],
  },
  Caribe: {
    f: ["Nadège", "Rosemène", "Woodline", "Merline"],
    m: ["Jean", "Wilkenson", "Fabricio", "Emmanuel"],
    sobre: ["Baptiste", "Pierre", "Joseph", "Louissaint"],
  },
  "América do Sul": {
    f: ["Camila", "Valentina", "Luz", "Daniela"],
    m: ["Andrés", "Diego", "Julián", "Mateo"],
    sobre: ["Quispe", "Mamani", "Rojas", "Vargas"],
  },
  Diversos: {
    f: ["Elif", "Mai", "Sopheak", "Dinara"],
    m: ["Batu", "Anh", "Sokha", "Ravshan"],
    sobre: ["Yıldız", "Nguyen", "Chan", "Karimov"],
  },
};

function seededRandom(seed) {
  let s = seed;
  return () => {
    s = (s * 1103515245 + 12345) & 0x7fffffff;
    return s / 0x7fffffff;
  };
}

function pickWeighted(rng, items, weightKey = "peso") {
  const total = items.reduce((a, b) => a + b[weightKey], 0);
  let r = rng() * total;
  for (const it of items) {
    r -= it[weightKey];
    if (r <= 0) return it;
  }
  return items[items.length - 1];
}

// Incidência por candidato ~ proporção real observada em gcub.db
// (idiomas_fluentes), independente por idioma (não mutuamente exclusivo).
const IDIOMAS_PROB = [
  { idioma: "Inglês", p: 0.77 },
  { idioma: "Outro", p: 0.32 },
  { idioma: "Português", p: 0.27 },
  { idioma: "Francês", p: 0.16 },
  { idioma: "Espanhol", p: 0.15 },
  { idioma: "Alemão", p: 0.01 },
  { idioma: "Italiano", p: 0.01 },
  { idioma: "Mandarim", p: 0.007 },
];

function buildDataset(seed = 42) {
  const rng = seededRandom(seed);
  const candidatos = [];
  const candidaturas = [];
  const documentos = [];
  const DOC_TIPOS = ["Identidade", "Diploma/Licenciatura", "Histórico Acadêmico", "Currículo"];

  const N = 1180; // ordem de grandeza real (~1.9k candidatos únicos no edital completo, aqui uma amostra rica)
  let candId = 20000;

  for (let i = 0; i < N; i++) {
    candId += 1 + Math.floor(rng() * 6);
    const paisInfo = pickWeighted(rng, PAISES);
    const pool = NOMES_POR_REGIAO[paisInfo.regiao] || NOMES_POR_REGIAO.Diversos;
    const sexo = rng() < 0.47 ? "Feminino" : "Masculino";
    const primeiroNome = sexo === "Feminino" ? pool.f[Math.floor(rng() * pool.f.length)] : pool.m[Math.floor(rng() * pool.m.length)];
    const sobrenome = pool.sobre[Math.floor(rng() * pool.sobre.length)];
    const nome = `${primeiroNome} ${sobrenome}`;

    const idade = 20 + Math.floor(rng() * 26); // 20–45
    const anoNasc = 2026 - idade;
    const pcd = rng() < 0.03;
    const professorUniversitario = rng() < 0.18;
    const tipoInstituicao = rng() < 0.62 ? "Pública" : "Privada";
    const residenciaDiferente = rng() < 0.08;
    let idiomas = IDIOMAS_PROB.filter((x) => rng() < x.p).map((x) => x.idioma);
    if (idiomas.length === 0) idiomas = ["Inglês"];

    const candidato = {
      id: candId,
      nome_completo: nome,
      sexo,
      idade,
      data_nascimento: `${String(1 + Math.floor(rng() * 28)).padStart(2, "0")}/${String(1 + Math.floor(rng() * 12)).padStart(2, "0")}/${anoNasc}`,
      pais_origem: paisInfo.pais,
      pais_residencia: residenciaDiferente ? "Portugal" : paisInfo.pais,
      possui_deficiencia: pcd,
      e_professor_universitario: professorUniversitario,
      tipo_instituicao: tipoInstituicao,
      idiomas,
      email_1: `${primeiroNome}.${sobrenome}${candId}@example.org`.toLowerCase(),
    };
    candidatos.push(candidato);

    // 1 a 2 candidaturas UEA por candidato (~7% escolheram 2 programas)
    const nCandidaturas = rng() < 0.07 ? 2 : 1;
    const programasEscolhidosIds = new Set();
    for (let c = 0; c < nCandidaturas; c++) {
      let programa;
      do {
        programa = pickWeighted(rng, PROGRAMAS_UEA.map((p) => ({ ...p, peso: p.vagas + 1 })));
      } while (programasEscolhidosIds.has(programa.id));
      programasEscolhidosIds.add(programa.id);

      const ordem = pickWeighted(rng, [
        { v: "1ª opção", peso: 18 },
        { v: "2ª opção", peso: 28 },
        { v: "3ª opção", peso: 30 },
        { v: "4ª opção", peso: 24 },
      ]).v;

      const decisaoRoll = rng();
      const decisao = decisaoRoll < 0.55 ? "Pendente" : decisaoRoll < 0.85 ? "Aceito" : "Recusado";

      const docs = DOC_TIPOS.map((tipo) => ({
        tipo,
        anexado: rng() < 0.86,
      }));

      candidaturas.push({
        id: candidaturas.length + 1,
        candidato_id: candidato.id,
        candidato_nome: nome,
        pais_origem: paisInfo.pais,
        programa_uea_id: programa.id,
        programa_uea_nome: programa.nome,
        programa_uea_sigla: programa.sigla,
        nivel: programa.nivel,
        ordem_preferencia: ordem,
        decisao,
        documentos: docs,
      });
    }
  }

  return { candidatos, candidaturas, programas: PROGRAMAS_UEA };
}

export const DATASET = buildDataset();
