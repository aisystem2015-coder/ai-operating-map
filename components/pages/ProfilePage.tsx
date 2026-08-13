"use client";

// Professional profile — Francisco Guevara.
// Meet 19 (31 jul 2026) named this a hard must-have for the Aug-12 website:
// "un perfil profesional completo que cubra todo su trabajo de IA." Built
// strictly from PUBLIC professional facts (the FG AI Lab project itself, the
// Logitech AI-platform work at a high level, the public digital-twin tier) —
// never from the access-level-2 personal Q&A in the vault. English-only per
// the Meet 17 site-content rule. Specific career metrics (exact dates, impact
// numbers) are intentionally left for Francisco's CV-questionnaire answers
// rather than invented — see "Live CV — Preguntas de Historial Profesional".

import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  CalendarClock,
  Cpu,
  Bot,
  Fingerprint,
  Workflow,
  Boxes,
  Sparkles,
} from "lucide-react";
import Navigation from "../Navigation";
import InteractiveGlow from "../ui/interactive-glow";
import { CATEGORICAL } from "../charts/tokens";

const experience = [
  {
    role: "Building the FG AI Lab",
    org: "Independent",
    when: "2026 — now",
    points: [
      "A fully autonomous, always-on AI workforce running on a Mac mini — agents that operate the machine, not just answer questions.",
      "A private digital twin: a grounded model of one person that answers from a single source of truth, with tiered, encrypted access controls, reachable from web, ChatGPT, Grok and phone.",
      "A cloud brain (Supabase + vector search), grounded auto-responder bots, and a live control dashboard — each shipped end-to-end against real data.",
    ],
  },
  {
    role: "AI projects & thesis",
    org: "Logitech",
    when: "2025 — 2026",
    points: [
      "Six months driving AI initiatives across the operations org — the work behind this site's \"what works today\" thinking.",
      "Represented the team at the World AI Summit (Amsterdam) and an AI workshop in San Francisco, bringing the frontier back into daily operations.",
      "Thesis on project scoping, run end-to-end with AI, tracing every decision back to its source.",
    ],
  },
  {
    role: "Ecommerce supply-chain specialist, Europe",
    org: "Logitech",
    when: "2025",
    points: [
      "Owned ecommerce supply-chain forecasting for Europe, improving forecast accuracy and leaving every stakeholder satisfied on handover.",
      "Stepped into a senior role mid-stream and turned initial friction into trust.",
    ],
  },
  {
    role: "Learning enablement & COO communications",
    org: "Logitech",
    when: "~2.8 years",
    points: [
      "Covered a senior manager's maternity leave for nearly three years — learning enablement plus communications for the COO's org.",
    ],
  },
  {
    role: "T-Shape communications — internal platform & brand",
    org: "Logitech",
    when: "first year",
    points: [
      "Built the T-Shape internal site (Wix) — ~200 monthly users of a ~900-person org — plus the brand book, brochure, and a refreshed logo (Illustrator).",
      "Migrated the newsletter to a trackable platform and ran the analytics reporting behind it.",
    ],
  },
  {
    role: "Events Manager",
    org: "ESN Breda (Netherlands)",
    when: "2021 — 2023",
    points: [
      "Led a team of 7–8 and grew the annual budget from €5,000 to $50,000.",
      "Turned weekly events from ~40 to 100+ attendees; parties of 300+; a year-end gala on a $25,000 budget.",
      "Negotiated bar and club partnerships end to end — branding, pricing, and staffing — and self-designed the merchandising.",
    ],
  },
  {
    role: "Education",
    org: "Bolivia → Spain → Netherlands",
    when: "",
    points: [
      "International Business, University of Applied Sciences Breda, with a graphic-design minor (Fontys) — brand guidebooks for three real clients.",
      "A sales vocational program in Spain (Flying Tiger internship) before Breda.",
    ],
  },
];

const built = [
  {
    title: "AI Operating Map",
    icon: Workflow,
    desc: "This site — a working argument that AI is the reasoning layer inside a system, not a product. Used in workshops and pitches.",
    href: "/",
  },
  {
    title: "Digital Twin",
    icon: Fingerprint,
    desc: "A private, grounded model of one person — single source of truth, cited answers, and access tiers from public to intimate.",
    href: "/what-works/digital-twins",
  },
  {
    title: "Autonomous AI workforce",
    icon: Bot,
    desc: "A team of agents that runs on a dedicated machine and keeps working when he steps away — the operator, not the assistant.",
    href: "/what-works",
  },
  {
    title: "Personal algorithm",
    icon: Cpu,
    desc: "A proof-of-concept that reads a person's own activity and separates aligned work from distraction, with the reasoning shown.",
    href: "/ai-mindset",
  },
];

const principles = [
  { t: "Automation or nothing", d: "Any step that needs a human to do it by hand is a place the system breaks at scale. Design it out." },
  { t: "AI know-how beats any other know-how", d: "The leverage is in knowing how to make the reasoning layer work — everything else is downstream of that." },
  { t: "Product over document", d: "A working thing that someone can use beats a deck describing it. Ship the thing." },
  { t: "Traceable by default", d: "Every answer should point back to its source. If you can't trace a decision, you can't trust it." },
];

const stack = [
  "Claude Code",
  "Agentic systems",
  "RAG & vector databases",
  "MCP",
  "Next.js / Vercel",
  "Python",
  "Prompt engineering",
  "Postgres / pgvector",
];

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="pt-32 pb-20">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          {/* Hero */}
          <div className="relative isolate overflow-hidden rounded-3xl mb-16 py-12 px-2">
            <InteractiveGlow />
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-semibold uppercase tracking-[0.14em] mb-6">
                <Sparkles size={14} />
                Profile
              </div>
              <h1 className="text-5xl md:text-7xl font-heading font-bold text-foreground mb-6 leading-[1.05]">
                Francisco Guevara
              </h1>
              <p className="text-xl md:text-2xl text-foreground/90 max-w-2xl font-heading font-medium mb-4">
                I build autonomous AI that works inside real operations.
              </p>
              <p className="text-lg text-secondary max-w-2xl leading-relaxed">
                Not demos — systems that run. From events management in the Netherlands to
                three and a half years across four roles at Logitech, I&apos;ve brought AI into
                every corner of my work since 2022 — then built my own AI lab to take it
                further: a private digital twin, an always-on agent workforce, and the tools
                around them.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/book"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-accent text-white text-sm font-semibold hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
                >
                  <CalendarClock size={16} />
                  Book office hours
                </Link>
                <Link
                  href="/what-works"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-black/10 bg-white text-sm font-semibold text-foreground hover:bg-black/[0.03] transition-colors focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
                >
                  Explore the map
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>

          {/* What I've built */}
          <Section title="What I've built" kicker="Selected work">
            <div className="grid sm:grid-cols-2 gap-5">
              {built.map((b, i) => {
                const color = CATEGORICAL[i % CATEGORICAL.length];
                const Icon = b.icon;
                return (
                  <motion.div
                    key={b.title}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.4, delay: i * 0.05 }}
                  >
                    <Link
                      href={b.href}
                      className="hover-glow group block h-full rounded-2xl border border-black/5 bg-white shadow-sm overflow-hidden focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
                    >
                      <div className="h-1.5 w-full" style={{ backgroundColor: color }} />
                      <div className="p-6">
                        <div className="flex items-center gap-3 mb-3">
                          <div
                            className="h-10 w-10 rounded-xl flex items-center justify-center"
                            style={{ backgroundColor: `${color}1A`, color }}
                          >
                            <Icon size={20} />
                          </div>
                          <h3 className="text-lg font-heading font-semibold text-foreground">
                            {b.title}
                          </h3>
                          <ArrowRight
                            size={16}
                            className="ml-auto text-secondary/40 group-hover:text-accent group-hover:translate-x-0.5 transition-all"
                          />
                        </div>
                        <p className="text-sm text-secondary leading-relaxed">{b.desc}</p>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </Section>

          {/* Experience */}
          <Section title="Experience" kicker="Track record">
            <div className="space-y-4">
              {experience.map((e, i) => (
                <motion.div
                  key={e.role}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="rounded-2xl border border-black/5 bg-white shadow-sm p-6"
                >
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-4">
                    <h3 className="text-lg font-heading font-semibold text-foreground">
                      {e.role}
                    </h3>
                    <span className="text-accent font-medium text-sm">{e.org}</span>
                    {e.when && (
                      <span className="ml-auto text-xs font-semibold text-secondary/60 tabular-nums uppercase tracking-wide">
                        {e.when}
                      </span>
                    )}
                  </div>
                  <ul className="space-y-2.5">
                    {e.points.map((p) => (
                      <li key={p} className="flex items-start gap-3">
                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent shrink-0" />
                        <span className="text-sm text-secondary leading-relaxed">{p}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </Section>

          {/* Principles */}
          <Section title="How I work" kicker="Operating principles">
            <div className="grid sm:grid-cols-2 gap-4">
              {principles.map((p, i) => (
                <motion.div
                  key={p.t}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="rounded-2xl border border-black/5 bg-white shadow-sm p-6"
                >
                  <div className="flex items-center gap-2.5 mb-2">
                    <Boxes size={17} className="text-accent" />
                    <h3 className="text-base font-heading font-semibold text-foreground">
                      {p.t}
                    </h3>
                  </div>
                  <p className="text-sm text-secondary leading-relaxed">{p.d}</p>
                </motion.div>
              ))}
            </div>
          </Section>

          {/* Stack */}
          <Section title="Stack" kicker="Tools of the trade">
            <div className="flex flex-wrap gap-2.5">
              {stack.map((s) => (
                <span
                  key={s}
                  className="px-4 py-2 rounded-full border border-black/8 bg-white text-sm font-medium text-secondary shadow-sm"
                >
                  {s}
                </span>
              ))}
            </div>
          </Section>

          {/* Closing CTA */}
          <div className="mt-16 relative isolate overflow-hidden rounded-3xl border border-accent/20 bg-accent/[0.04] p-8 md:p-10">
            <div className="max-w-2xl">
              <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-3">
                Want to talk through an AI system?
              </h2>
              <p className="text-secondary leading-relaxed mb-6">
                I keep open office hours for people building with AI in operations —
                bring a real problem, leave with a direction.
              </p>
              <Link
                href="/book"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-accent text-white text-sm font-semibold hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
              >
                <CalendarClock size={16} />
                Book office hours
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function Section({
  title,
  kicker,
  children,
}: {
  title: string;
  kicker: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-14">
      <div className="mb-6">
        <div className="text-xs font-semibold uppercase tracking-[0.14em] text-accent mb-1.5">
          {kicker}
        </div>
        <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground">
          {title}
        </h2>
      </div>
      {children}
    </section>
  );
}
