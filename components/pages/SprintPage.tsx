"use client";

import { motion } from "framer-motion";

const fade = {
  hidden: { opacity: 0, y: 20 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.06, duration: 0.45, ease: "easeOut" },
  }),
};

const layers = [
  {
    n: "1",
    name: "Inputs",
    what: "Events, prompts, triggers that start the system",
    ask: "What kicks this off — and is that signal clean?",
  },
  {
    n: "2",
    name: "Reasoning (AI)",
    what: "The LLMs that translate intent into action. AI lives here, not everywhere.",
    ask: "Where is judgment needed — and where are we over-using AI?",
  },
  {
    n: "3",
    name: "Orchestration",
    what: "Routes tasks reliably. Decides which agent does what, in what order.",
    ask: "Who is the conductor, and is the sequence auditable?",
  },
  {
    n: "4",
    name: "Tools & Data",
    what: "Where real work happens: databases, APIs, files, calendars.",
    ask: "Is our data clean enough to trust the output?",
  },
  {
    n: "5",
    name: "Interface & Outcomes",
    what: "Where people see results and act: dashboards, reports, replies.",
    ask: "Does the user see state and exceptions — not the internal kitchen?",
  },
];

const traps = [
  {
    trap: "Unrealistic expectations",
    looks: "Expecting AI to perform without a real data + integration base",
    fix: "Define the system before the model",
  },
  {
    trap: "Weak data",
    looks: "Dirty, siloed, incomplete data — 60–70% of use cases die here",
    fix: "Fix the data layer first",
  },
  {
    trap: "Horizontal thinking",
    looks: "Generic AI that tries to do everything",
    fix: "Build vertical, domain-specific solutions",
  },
];

const maturity = [
  {
    level: "Level 1",
    name: "Foundational",
    sub: "Understand the system",
    desc: "Data quality, what an LLM does and does not do, why orchestration turns intent into reliable sequences, when to build tools vs reuse, and why every component needs an owner.",
  },
  {
    level: "Level 2",
    name: "Operational",
    sub: "Automate the system",
    desc: "Data contracts and validation, model guardrails and limits, sequences/retries/handoffs/auditability that replace manual coordination, and interfaces that show state and exceptions.",
  },
  {
    level: "Level 3",
    name: "Advanced",
    sub: "Design and evolve the system",
    desc: "Pipelines that change safely, knowing when to upgrade models / add retrieval / redesign prompts, and treating the system as living infrastructure that needs maintenance.",
  },
];

const meets = [
  {
    num: 1,
    date: "2 Jun 2026",
    title: "AI Adoption Landscape + Onboarding",
    bullets: [
      "\"It's a very, very unique moment where we are\" — Francisco enmarca la oportunidad",
      "AI accesible para todos ahora, no solo developers. VC fluyendo fuerte",
      "Bilingual advantage: inglés + español como ventaja estratégica",
      "Acuerdo: LinkedIn persona como primer paso concreto",
    ],
  },
  {
    num: 2,
    date: "5 Jun 2026",
    title: "Vocabulario Técnico + Estructura de Reuniones",
    bullets: [
      "Definiciones: VS Code, SaaS, MCPs, agentes, frontend, backend, APIs",
      "Francisco pide: propuestas de agenda ANTES de cada reunión, 3 bullets max",
      "Protocolo de invites: Google Calendar con agenda incluida",
      "Maya asume ownership de la agenda propuesta",
    ],
  },
  {
    num: 3,
    date: "8 Jun 2026",
    title: "LinkedIn Persona + AI Operating Map + Shared Drive",
    bullets: [
      "LinkedIn persona: \"decided character, consistent character\"",
      "AI Operation Map = primer producto. Francisco tiene la base",
      "Carpeta compartida Drive creada. Transcripts numerados",
      "Idea: página web interactiva del mapa de operaciones",
    ],
  },
  {
    num: 4,
    date: "Semana 2, Jun 2026",
    title: "AI Personas + LinkedIn Strategy + Prompting",
    bullets: [
      "\"Distribution beats product. All the time.\" — principio central del sprint",
      "AI personas = canal de distribución, no solo producto",
      "Diversity de personas: mismo conocimiento, distintos avatars, mayor alcance",
      "Whisper Flow introducido para dictado por voz",
    ],
  },
  {
    num: 5,
    date: "11 Jun 2026",
    title: "AI Persona Project Strategy + Business Model",
    bullets: [
      "AI Operating Map = living document para CEOs y decision-makers",
      "Certificaciones para la persona = credibilidad",
      "Newsletter bi-semanal como canal de distribución recurrente",
      "\"Pensar en distribución primero, producto segundo\"",
    ],
  },
  {
    num: "5b",
    date: "12 Jun 2026",
    title: "Technical Setup + Mac Mini Remote Access",
    bullets: [
      "Mac Mini M4 = máquina principal para AI (chips optimizados)",
      "Granola instalado para transcripción automática",
      "Remote access para Maya: acceso completo desde Bolivia",
      "\"Para mí es importante ver todo lo que… no pierdo del line of thought\"",
    ],
  },
  {
    num: 6,
    date: "10 Jun 2026",
    title: "Herramientas + Workflow + Persona LinkedIn",
    bullets: [
      "Evaluación Granola vs. otras opciones de transcripción → Granola gana",
      "Content Calendar empieza a tomar forma",
      "Airtable: tareas identificadas, categorización por tipo",
      "Whisper Flow funcionando para dictado",
    ],
  },
  {
    num: 7,
    date: "Semana 3, Jun 2026",
    title: "LinkedIn Live + Content Calendar + Gaps",
    bullets: [
      "LinkedIn con 0 followers y 0 posts — punto de quiebre",
      "Francisco identifica patrón: \"más info → más investigación → nada publicado\"",
      "Content Calendar existente pero sin ejecución",
      "DM responder en Relevance AI: no iniciado aún",
    ],
  },
  {
    num: 8,
    date: "20 Jun 2026",
    title: "Llamada de atención directa + Plan de recuperación",
    bullets: [
      "\"I don't see the shit together.\" — Francisco, directo",
      "\"Up until now, we still don't have the ship.\"",
      "\"tres fucking bullets. That's it.\"",
      "Acuerdo: 10 días ejecución pura Jun 20–30. 12 posts, 1 agente, LinkedIn live",
    ],
    critical: true,
  },
  {
    num: 9,
    date: "26 Jun 2026",
    title: "Cierre de Sprint + Entregables finales",
    bullets: [
      "LinkedIn persona Adrian Ross: headline + about live",
      "98/108 tareas cerradas en Airtable",
      "Sprint page construida: localhost:4000/sprint",
      "23 posts publicados (meta era 12 — superado), 1 agente Relevance AI live",
    ],
  },
];

const deliverables = [
  {
    category: "Infraestructura",
    icon: "⚙️",
    items: [
      "Mac Mini M4 — acceso remoto operativo desde Bolivia",
      "51 agentes Paperclip con adapter claude_local + SOUL.md",
      "30+ MCPs: Drive, Slack, GitHub, Notion, YouTube, Exa, Stripe, Linear…",
      "Airtable: 6 tablas, 108 tareas rastreadas con prioridades",
      "Google Drive compartido — carpeta AI con 14+ docs estratégicos",
      "Granola + Whisper Flow operativos",
    ],
  },
  {
    category: "Persona AI — Adrian Ross",
    icon: "👤",
    items: [
      "Nombre + headline live: \"AI Ops Consultant · I build agentic workflows for operators who are done with hype\"",
      "About section publicada",
      "10 secciones LinkedIn escritas y aprobadas",
      "Imagen persona v1 + video persona v1 generados",
      "Foto, banner, experiencia, skills completados",
      "23 posts publicados — meta era 12",
    ],
  },
  {
    category: "Contenido + distribución",
    icon: "✍️",
    items: [
      "7 posts LinkedIn adicionales programados (Jun 27–Jul 10)",
      "2 newsletters bimensuales en Drive",
      "Scripts 5 videos cortos AI Learning",
      "Brief Instagram persona (nombre, voz, pilares)",
      "Agente DM responder en Relevance AI — live",
    ],
  },
  {
    category: "Documentos estratégicos",
    icon: "📄",
    items: [
      "AI Operating Map — Refined v2 (For Leaders) — en Drive",
      "Master Document todos los meets 1–9",
      "Dashboard Health of the Business (KPIs/OKRs)",
      "Monetization Workstream — 3 líneas con pricing",
      "Spec Agente Data-Fetching (20 fuentes)",
      "Plan 30 días AI Personas + Certificaciones",
    ],
  },
  {
    category: "Automatizaciones construidas",
    icon: "🤖",
    items: [
      "linkedin_chrome_filler.py — Chrome real, sin bot detection",
      "whisper_transcribe.py — backend OpenAI Whisper audio→texto",
      "magazine_fetcher.py — digest semanal 6 fuentes AI",
      "airtable.py — CRUD completo via API",
      "register_all_agents.py — registra 51 agentes automáticamente",
    ],
  },
];

const principles = [
  { quote: "Distribution beats product.", attr: "Principio central del sprint — Meet 4" },
  { quote: "Ship rough, polish in production.", attr: "Operating principle — Meet 5" },
  { quote: "tres fucking bullets. That's it.", attr: "Francisco, Meet 8" },
  { quote: "Eres las manos de mi cerebro.", attr: "Francisco a Maya — Meet 5" },
];

export default function SprintPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="pt-32 pb-24">
        <div className="max-w-5xl mx-auto px-6 lg:px-10 space-y-28">

          {/* Hero */}
          <motion.section initial="hidden" animate="show" custom={0} variants={fade}>
            <div className="relative overflow-hidden rounded-3xl border border-black/5 bg-white shadow-sm px-8 py-12 lg:px-12 lg:py-16">
              <div
                className="pointer-events-none absolute inset-0 opacity-50"
                style={{
                  backgroundImage: "radial-gradient(circle at 1px 1px, rgba(15,23,42,0.05) 1px, transparent 0)",
                  backgroundSize: "28px 28px",
                }}
              />
              <div className="relative space-y-5 max-w-3xl">
                <span className="inline-flex items-center gap-2 rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-accent border border-accent/20">
                  Sprint Report · Junio 2026
                </span>
                <h1 className="text-4xl md:text-5xl font-heading font-bold leading-tight">
                  FG AI Lab — 30 días de ejecución.
                </h1>
                <p className="text-lg text-secondary leading-relaxed max-w-2xl">
                  Francisco Guevara + Maya Avila. De cero infraestructura a persona AI publicada, 51 agentes operativos, y el AI Operating Map refinado para líderes.
                </p>
              </div>
              <div className="relative mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { n: "98", label: "Tareas cerradas", sub: "de 108 en Airtable" },
                  { n: "9", label: "Meets", sub: "transcritos y procesados" },
                  { n: "51", label: "Agentes AI", sub: "operativos" },
                  { n: "23", label: "Posts publicados", sub: "meta era 12" },
                ].map((s, i) => (
                  <motion.div key={s.n} custom={i + 1} variants={fade} className="rounded-2xl border border-black/5 bg-background p-5 space-y-1">
                    <div className="text-3xl font-heading font-bold text-accent">{s.n}</div>
                    <div className="text-sm font-semibold text-foreground">{s.label}</div>
                    <div className="text-xs text-secondary">{s.sub}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.section>

          {/* The map — 5 layers */}
          <motion.section custom={1} variants={fade} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <div className="space-y-3 mb-8">
              <span className="text-xs font-semibold uppercase tracking-widest text-accent">El mapa</span>
              <h2 className="text-2xl font-heading font-bold">El modelo de 5 capas</h2>
              <p className="text-secondary text-sm max-w-2xl">
                &ldquo;AI is not a product. It is the reasoning layer inside your system.&rdquo; — Si no puedes nombrar las 5 capas de una iniciativa, es un demo, no un sistema.
              </p>
            </div>
            <div className="space-y-3">
              {layers.map((layer, i) => (
                <motion.div
                  key={layer.n}
                  custom={i}
                  variants={fade}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  className="rounded-2xl border border-black/5 bg-white shadow-sm p-5 flex gap-5 items-start"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent font-heading font-bold text-sm">
                    {layer.n}
                  </div>
                  <div className="space-y-1 flex-1">
                    <div className="font-heading font-semibold text-foreground">{layer.name}</div>
                    <div className="text-sm text-secondary">{layer.what}</div>
                    <div className="text-xs text-secondary/70 italic mt-1">→ {layer.ask}</div>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="mt-6 rounded-2xl border border-accent/20 bg-accent/5 p-5">
              <p className="text-sm font-semibold text-accent">Principio de decisión</p>
              <p className="text-sm text-foreground mt-1">
                Para cualquier iniciativa AI: ¿Puedo dibujar las 5 capas? Si no, para y diseña primero. ¿Los datos son confiables? Si no, arregla eso antes que todo. ¿Cada capa tiene un dueño? ¿Qué cambia para el usuario al final?
              </p>
            </div>
          </motion.section>

          {/* Why 95% fail */}
          <motion.section custom={2} variants={fade} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <div className="space-y-3 mb-8">
              <span className="text-xs font-semibold uppercase tracking-widest text-accent">Por qué fallan</span>
              <h2 className="text-2xl font-heading font-bold">95% de proyectos AI no escalan</h2>
              <p className="text-secondary text-sm">Tres trampas. Siempre las mismas.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              {traps.map((t, i) => (
                <motion.div
                  key={t.trap}
                  custom={i}
                  variants={fade}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  className="rounded-2xl border border-black/5 bg-white shadow-sm p-6 space-y-3"
                >
                  <div className="text-2xl font-heading font-bold text-foreground/20">{`0${i + 1}`}</div>
                  <div className="font-heading font-semibold text-foreground">{t.trap}</div>
                  <div className="text-sm text-secondary">{t.looks}</div>
                  <div className="text-xs font-semibold text-accent border-t border-black/5 pt-3">→ {t.fix}</div>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Maturity model */}
          <motion.section custom={3} variants={fade} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <div className="space-y-3 mb-8">
              <span className="text-xs font-semibold uppercase tracking-widest text-accent">Dónde estás</span>
              <h2 className="text-2xl font-heading font-bold">Modelo de madurez</h2>
              <p className="text-secondary text-sm">La mayoría de equipos sobreestiman su nivel.</p>
            </div>
            <div className="space-y-3">
              {maturity.map((m, i) => (
                <motion.div
                  key={m.level}
                  custom={i}
                  variants={fade}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  className="rounded-2xl border border-black/5 bg-white shadow-sm p-6 flex gap-5"
                >
                  <div className="shrink-0 space-y-1 w-32">
                    <div className="text-xs font-semibold uppercase tracking-wide text-accent">{m.level}</div>
                    <div className="font-heading font-bold text-foreground text-sm">{m.name}</div>
                    <div className="text-xs text-secondary">{m.sub}</div>
                  </div>
                  <div className="flex-1 text-sm text-secondary leading-relaxed border-l border-black/5 pl-5">{m.desc}</div>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Sprint principles */}
          <motion.section custom={4} variants={fade} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <div className="space-y-3 mb-8">
              <span className="text-xs font-semibold uppercase tracking-widest text-accent">Principios del sprint</span>
              <h2 className="text-2xl font-heading font-bold">Lo que guió el trabajo</h2>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {principles.map((p, i) => (
                <motion.div
                  key={p.quote}
                  custom={i}
                  variants={fade}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  className="rounded-2xl border border-black/5 bg-white shadow-sm p-6 space-y-3"
                >
                  <blockquote className="text-lg font-heading font-bold text-foreground leading-snug">
                    &ldquo;{p.quote}&rdquo;
                  </blockquote>
                  <p className="text-xs text-secondary">{p.attr}</p>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Meets timeline */}
          <motion.section custom={5} variants={fade} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <div className="space-y-3 mb-8">
              <span className="text-xs font-semibold uppercase tracking-widest text-accent">Los meets</span>
              <h2 className="text-2xl font-heading font-bold">9 sesiones — qué pasó en cada una</h2>
            </div>
            <div className="relative">
              <div className="absolute left-5 top-0 bottom-0 w-px bg-black/8 hidden sm:block" />
              <div className="space-y-4">
                {meets.map((meet, i) => (
                  <motion.div
                    key={String(meet.num)}
                    custom={i}
                    variants={fade}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    className="flex gap-6"
                  >
                    <div className="hidden sm:flex flex-col items-center">
                      <div className={`relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border shadow-sm text-xs font-bold font-heading ${meet.critical ? "bg-red-50 border-red-200 text-red-600" : "bg-white border-black/10 text-accent"}`}>
                        {meet.num}
                      </div>
                    </div>
                    <div className={`flex-1 rounded-2xl border shadow-sm p-5 hover:shadow-md transition-shadow ${meet.critical ? "border-red-100 bg-red-50/30" : "border-black/5 bg-white"}`}>
                      <div className="flex items-start justify-between mb-3 gap-3">
                        <div>
                          <span className={`text-xs font-semibold uppercase tracking-wide ${meet.critical ? "text-red-500" : "text-accent"}`}>Meet {meet.num}</span>
                          <div className="font-heading font-semibold text-foreground mt-0.5">{meet.title}</div>
                        </div>
                        <span className="text-xs text-secondary bg-background rounded-full px-3 py-1 shrink-0">{meet.date}</span>
                      </div>
                      <ul className="space-y-1.5">
                        {meet.bullets.map((b) => (
                          <li key={b} className="flex items-start gap-2 text-sm text-secondary">
                            <span className={`mt-1.5 h-1.5 w-1.5 rounded-full shrink-0 ${meet.critical ? "bg-red-400" : "bg-accent"}`} />
                            {b}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.section>

          {/* Deliverables */}
          <motion.section custom={6} variants={fade} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <div className="space-y-3 mb-8">
              <span className="text-xs font-semibold uppercase tracking-widest text-accent">Resultados</span>
              <h2 className="text-2xl font-heading font-bold">Deliverables completados</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-5">
              {deliverables.map((cat, i) => (
                <motion.div
                  key={cat.category}
                  custom={i}
                  variants={fade}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  className="rounded-2xl border border-black/5 bg-white shadow-sm p-6 space-y-4"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{cat.icon}</span>
                    <h3 className="font-heading font-semibold text-foreground">{cat.category}</h3>
                  </div>
                  <ul className="space-y-2">
                    {cat.items.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-secondary">
                        <span className="mt-1 text-accent font-bold shrink-0">✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* LinkedIn live */}
          <motion.section custom={7} variants={fade} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <div className="space-y-3 mb-8">
              <span className="text-xs font-semibold uppercase tracking-widest text-accent">Persona AI</span>
              <h2 className="text-2xl font-heading font-bold">Adrian Ross — AI Ops Consultant</h2>
            </div>
            <div className="rounded-2xl border border-black/5 bg-white shadow-sm overflow-hidden">
              <div className="px-6 py-5 border-b border-black/5 bg-background">
                <p className="font-heading font-semibold text-foreground">Perfil LinkedIn</p>
                <p className="text-sm text-secondary mt-1">
                  &ldquo;AI Ops Consultant · I build agentic workflows for operators who are done with hype&rdquo;
                </p>
              </div>
              <div className="divide-y divide-black/5">
                {[
                  { s: "Nombre", st: "live" },
                  { s: "Headline", st: "live" },
                  { s: "Ubicación (Madrid)", st: "live" },
                  { s: "About section", st: "live" },
                  { s: "Experiencia (3 posiciones)", st: "done" },
                  { s: "Educación + certificaciones", st: "done" },
                  { s: "Skills", st: "done" },
                  { s: "Foto de perfil", st: "done" },
                  { s: "Banner", st: "done" },
                  { s: "23 posts publicados", st: "done" },
                  { s: "Agente DM responder (Relevance AI)", st: "done" },
                ].map((row) => (
                  <div key={row.s} className="flex items-center justify-between px-6 py-3.5">
                    <span className="text-sm text-foreground">{row.s}</span>
                    {row.st === "live" ? (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 border border-emerald-100">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        Live
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-accent border border-accent/20">
                        ✓ Done
                      </span>
                    )}
                  </div>
                ))}
              </div>
              <div className="px-6 py-4 bg-background border-t border-black/5">
                <a
                  href="https://www.linkedin.com/in/adrian-ross-6a1570416"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-semibold text-accent hover:underline"
                >
                  Ver perfil → linkedin.com/in/adrian-ross-6a1570416
                </a>
              </div>
            </div>
          </motion.section>

          {/* Next steps */}
          <motion.section custom={8} variants={fade} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <div className="space-y-3 mb-8">
              <span className="text-xs font-semibold uppercase tracking-widest text-accent">Siguiente fase</span>
              <h2 className="text-2xl font-heading font-bold">Qué viene después</h2>
            </div>
            <div className="rounded-2xl border border-black/5 bg-white shadow-sm overflow-hidden">
              <div className="grid grid-cols-3 px-6 py-3 bg-background border-b border-black/5 text-xs font-semibold uppercase tracking-wide text-secondary">
                <span>Tarea</span>
                <span>Responsable</span>
                <span>Deadline</span>
              </div>
              <div className="divide-y divide-black/5">
                {[
                  { task: "AI Operating Map v2 publicar (Vercel)", who: "Francisco", deadline: "30 jun", hot: true },
                  { task: "Video persona v2 (Arcads / Synthesia)", who: "Francisco + Maya", deadline: "Dom 28 jun", hot: true },
                  { task: "Supabase setup completo", who: "Both", deadline: "Próxima semana" },
                  { task: "Comparativa de video 5 tools", who: "Maya", deadline: "Esta semana" },
                  { task: "Market study — canales + posicionamiento", who: "Francisco", deadline: "Próxima semana" },
                  { task: "Dominio (<$20)", who: "Maya", deadline: "Esta semana" },
                ].map((row) => (
                  <div key={row.task} className="grid grid-cols-3 items-center px-6 py-4 gap-4">
                    <span className={`text-sm ${row.hot ? "font-semibold text-foreground" : "text-secondary"}`}>{row.task}</span>
                    <span className="text-sm text-secondary">{row.who}</span>
                    <span className={`text-sm font-medium ${row.hot ? "text-accent" : "text-secondary"}`}>{row.deadline}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.section>

          {/* Footer */}
          <motion.section custom={9} variants={fade} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <div className="rounded-3xl border border-black/5 bg-white shadow-sm px-8 py-10 text-center space-y-3">
              <p className="text-xs font-semibold uppercase tracking-widest text-secondary">FG AI Lab · Sprint Junio 2026</p>
              <h3 className="text-xl font-heading font-bold">98 tareas. 9 meets. 30 días.</h3>
              <p className="text-secondary text-sm max-w-md mx-auto">
                Francisco Guevara + Maya Avila Raposo — construido con Claude Code.<br />
                La Paz, Bolivia · Lima, Perú
              </p>
              <div className="pt-2">
                <a
                  href="https://ai-operating-map.vercel.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-foreground px-5 py-2.5 text-sm font-semibold text-background hover:bg-foreground/90 transition"
                >
                  Ver el mapa completo →
                </a>
              </div>
            </div>
          </motion.section>

        </div>
      </main>
    </div>
  );
}
