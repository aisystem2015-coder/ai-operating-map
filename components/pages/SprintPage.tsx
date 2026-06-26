"use client";

import { motion } from "framer-motion";

const fade = {
  hidden: { opacity: 0, y: 20 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.07, duration: 0.45, ease: "easeOut" },
  }),
};

const meets = [
  {
    num: 1,
    title: "Kick-off",
    date: "May 2026",
    bullets: ["Definimos el proyecto: FG AI Lab", "Setup Mac Mini M4 acceso remoto", "Primera sesión Claude Code"],
  },
  {
    num: 2,
    title: "Infraestructura base",
    date: "May 2026",
    bullets: ["Airtable configurado — 6 tablas", "Drive compartido organizado", "30+ MCPs conectados"],
  },
  {
    num: 3,
    title: "Agentes AI",
    date: "May 2026",
    bullets: ["51 agentes migrados a claude_local", "SOUL.md por agente", "Paperclip operativo"],
  },
  {
    num: 4,
    title: "Stack + tools",
    date: "Jun 2026",
    bullets: ["Granola para transcripción de meets", "Whisper Flow para dictado", "AI Tool Stack finalizado"],
  },
  {
    num: 5,
    title: "Personas AI",
    date: "Jun 2026",
    bullets: ["Persona Adrian Ross definida", "10 secciones LinkedIn escritas", "Brief Instagram creado"],
  },
  {
    num: 6,
    title: "Contenido",
    date: "Jun 2026",
    bullets: ["7 posts LinkedIn programados", "2 newsletters bimensuales", "Scripts 5 videos AI Learning"],
  },
  {
    num: 7,
    title: "Monetización",
    date: "Jun 2026",
    bullets: ["3 líneas: consultoría, curso, SaaS", "Pricing definido", "Spec agente data-fetching"],
  },
  {
    num: 8,
    title: "LinkedIn live",
    date: "Jun 20, 2026",
    bullets: ["Headline publicado: AI Ops Consultant", "About section publicado", "Perfil Adrian Ross activo"],
  },
  {
    num: 9,
    title: "Hygiene + siguiente fase",
    date: "Jun 26, 2026",
    bullets: ["97/108 tareas cerradas", "Automatizaciones construidas", "Video persona v2 + Relevance AI next"],
  },
];

const deliverables = [
  {
    category: "Infraestructura",
    icon: "⚙️",
    items: [
      "Mac Mini M4 — acceso remoto desde Bolivia",
      "51 agentes Paperclip operativos (claude_local)",
      "30+ MCPs: Drive, Slack, GitHub, Notion, YouTube, Exa, Stripe, Linear…",
      "Airtable: 6 tablas, 108 tareas rastreadas",
      "Google Drive compartido — carpeta AI organizada",
      "Granola + Whisper Flow instalados",
    ],
  },
  {
    category: "Persona AI — Adrian Ross",
    icon: "👤",
    items: [
      "Nombre live: Adrian Ross",
      "Headline live: AI Ops Consultant · I build agentic workflows for operators who are done with hype",
      "About section publicada",
      "10 secciones LinkedIn escritas y en Drive",
      "Imagen persona v1 generada",
      "Video persona v1 generado",
    ],
  },
  {
    category: "Contenido producido",
    icon: "✍️",
    items: [
      "7 posts LinkedIn (Jun 27 – Jul 10) — listos para publicar",
      "2 newsletters bimensuales — en Drive",
      "Scripts 5 videos cortos AI Learning",
      "Brief Instagram persona (nombre, voz, pilares)",
    ],
  },
  {
    category: "Documentos estratégicos",
    icon: "📄",
    items: [
      "Master Document — todos los meets 1–9 consolidados",
      "Dashboard Health of the Business (KPIs/OKRs)",
      "Visual Map Flujo Agentes AI",
      "Monetization Workstream — 3 líneas con pricing",
      "AI Tool Stack Final — decisiones con costos",
      "Spec Agente Data-Fetching (20 fuentes)",
      "Plan 30 días AI Personas + Certificaciones",
    ],
  },
  {
    category: "Automatizaciones",
    icon: "🤖",
    items: [
      "linkedin_chrome_filler.py — edición via Chrome real, sin bot detection",
      "whisper_transcribe.py — backend OpenAI Whisper, audio→texto",
      "magazine_fetcher.py — digest semanal de 6 fuentes AI",
      "airtable.py — CRUD completo via API",
      "register_all_agents.py — registra 51 agentes automáticamente",
    ],
  },
];

const linkedinStatus = [
  { section: "Nombre", status: "live" },
  { section: "Headline", status: "live" },
  { section: "Ubicación (Madrid)", status: "live" },
  { section: "About section", status: "live" },
  { section: "Experiencia (3 posiciones)", status: "done" },
  { section: "Educación + certificaciones", status: "done" },
  { section: "Skills", status: "done" },
  { section: "Foto de perfil", status: "done" },
  { section: "Banner", status: "done" },
  { section: "Primer post", status: "done" },
];

const nextSteps = [
  { task: "Video persona v2 (Arcads / Synthesia)", who: "Francisco + Maya", deadline: "Dom 28 jun" },
  { task: "AI Operating Map v2 publicar", who: "Francisco", deadline: "30 jun" },
  { task: "Primer agente Relevance AI (DM responder)", who: "Maya", deadline: "Hecho ✅" },
  { task: "Supabase setup completo", who: "Both", deadline: "Próxima semana" },
  { task: "Dominio (<$20)", who: "Maya", deadline: "Hecho ✅" },
  { task: "Comparativa de video 5 tools", who: "Maya", deadline: "Esta semana" },
];

export default function SprintPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="pt-32 pb-24">
        <div className="max-w-5xl mx-auto px-6 lg:px-10 space-y-24">

          {/* Hero */}
          <motion.section
            initial="hidden"
            animate="show"
            custom={0}
            variants={fade}
          >
            <div className="relative overflow-hidden rounded-3xl border border-black/5 bg-white shadow-sm px-8 py-12 lg:px-12 lg:py-16">
              <div
                className="pointer-events-none absolute inset-0 opacity-50"
                style={{
                  backgroundImage: "radial-gradient(circle at 1px 1px, rgba(15,23,42,0.05) 1px, transparent 0)",
                  backgroundSize: "28px 28px",
                }}
              />
              <div className="relative space-y-6 max-w-3xl">
                <span className="inline-flex items-center gap-2 rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-accent border border-accent/20">
                  Sprint Report · Jun 2026
                </span>
                <h1 className="text-4xl md:text-5xl font-heading font-bold leading-tight">
                  90 días construyendo el FG AI Lab.
                </h1>
                <p className="text-lg text-secondary leading-relaxed">
                  Esto es lo que hicimos juntos — Francisco y Maya — desde cero hasta infraestructura activa, persona AI publicada, y sistema autónomo operando.
                </p>
              </div>

              {/* Numbers row */}
              <div className="relative mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { n: "97", label: "Tareas cerradas", sub: "de 108 registradas" },
                  { n: "9", label: "Meets procesados", sub: "con transcripción" },
                  { n: "51", label: "Agentes AI", sub: "operativos en Paperclip" },
                  { n: "30+", label: "MCPs conectados", sub: "Drive, Slack, GitHub…" },
                ].map((stat, i) => (
                  <motion.div
                    key={stat.n}
                    custom={i + 1}
                    variants={fade}
                    className="rounded-2xl border border-black/5 bg-background p-5 space-y-1"
                  >
                    <div className="text-3xl font-heading font-bold text-accent">{stat.n}</div>
                    <div className="text-sm font-semibold text-foreground">{stat.label}</div>
                    <div className="text-xs text-secondary">{stat.sub}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.section>

          {/* Meets timeline */}
          <motion.section custom={1} variants={fade} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <h2 className="text-2xl font-heading font-bold mb-8">Los 9 meets — qué pasó en cada uno</h2>
            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-5 top-0 bottom-0 w-px bg-black/8 hidden sm:block" />
              <div className="space-y-4">
                {meets.map((meet, i) => (
                  <motion.div
                    key={meet.num}
                    custom={i}
                    variants={fade}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    className="flex gap-6"
                  >
                    {/* Circle */}
                    <div className="hidden sm:flex flex-col items-center">
                      <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white border border-black/10 shadow-sm text-sm font-bold text-accent font-heading">
                        {meet.num}
                      </div>
                    </div>
                    {/* Card */}
                    <div className="flex-1 rounded-2xl border border-black/5 bg-white shadow-sm p-5 hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <span className="sm:hidden flex h-7 w-7 items-center justify-center rounded-full bg-accent/10 text-xs font-bold text-accent font-heading">
                            {meet.num}
                          </span>
                          <span className="font-heading font-semibold text-foreground">{meet.title}</span>
                        </div>
                        <span className="text-xs text-secondary bg-background rounded-full px-3 py-1">{meet.date}</span>
                      </div>
                      <ul className="space-y-1">
                        {meet.bullets.map((b) => (
                          <li key={b} className="flex items-start gap-2 text-sm text-secondary">
                            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-accent shrink-0" />
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
          <motion.section custom={2} variants={fade} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <h2 className="text-2xl font-heading font-bold mb-8">Deliverables completados</h2>
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

          {/* LinkedIn status */}
          <motion.section custom={3} variants={fade} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <h2 className="text-2xl font-heading font-bold mb-2">LinkedIn — Adrian Ross</h2>
            <p className="text-secondary text-sm mb-8">Estado actual de la persona AI Ops Consultant</p>
            <div className="rounded-2xl border border-black/5 bg-white shadow-sm overflow-hidden">
              <div className="divide-y divide-black/5">
                {linkedinStatus.map((row) => (
                  <div key={row.section} className="flex items-center justify-between px-6 py-4">
                    <span className="text-sm font-medium text-foreground">{row.section}</span>
                    {row.status === "live" ? (
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
                  Ver perfil live → linkedin.com/in/adrian-ross-6a1570416
                </a>
              </div>
            </div>
          </motion.section>

          {/* Next steps */}
          <motion.section custom={4} variants={fade} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <h2 className="text-2xl font-heading font-bold mb-2">Siguiente fase</h2>
            <p className="text-secondary text-sm mb-8">Lo que viene después del sprint</p>
            <div className="rounded-2xl border border-black/5 bg-white shadow-sm overflow-hidden">
              <div className="grid grid-cols-3 px-6 py-3 bg-background border-b border-black/5 text-xs font-semibold uppercase tracking-wide text-secondary">
                <span>Tarea</span>
                <span>Responsable</span>
                <span>Deadline</span>
              </div>
              <div className="divide-y divide-black/5">
                {nextSteps.map((row) => (
                  <div key={row.task} className="grid grid-cols-3 items-center px-6 py-4 gap-4">
                    <span className="text-sm text-foreground">{row.task}</span>
                    <span className="text-sm text-secondary">{row.who}</span>
                    <span className={`text-sm font-medium ${row.deadline.includes("✅") ? "text-accent" : "text-foreground"}`}>
                      {row.deadline}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.section>

          {/* Footer card */}
          <motion.section custom={5} variants={fade} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <div className="rounded-3xl border border-black/5 bg-white shadow-sm px-8 py-10 text-center space-y-3">
              <p className="text-xs font-semibold uppercase tracking-widest text-secondary">FG AI Lab · Sprint Jun 2026</p>
              <h3 className="text-xl font-heading font-bold">97 tareas. 9 meets. 4 semanas.</h3>
              <p className="text-secondary text-sm max-w-md mx-auto">
                Construido por Maya Avila Raposo + Francisco Guevara con Claude Code — La Paz, Bolivia · Lima, Perú
              </p>
            </div>
          </motion.section>

        </div>
      </main>
    </div>
  );
}
