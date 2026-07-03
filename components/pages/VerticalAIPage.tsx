"use client";

import { motion } from "framer-motion";
import Navigation from "../Navigation";

const fade = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: "easeOut" },
};

const genericTraits = [
  "General knowledge, no domain depth",
  "Separate interface — not embedded in workflows",
  "Provides suggestions — human executes",
  "Low adoption (users don't trust outputs they can&apos;t verify)",
  "Same model for everyone — no competitive moat",
  "Session-based — no memory, no compound learning",
];

const verticalTraits = [
  "Deep domain knowledge: your products, your KPIs, your language",
  "Embedded inside your existing tools and workflows",
  "Executes actions — creates tickets, sends alerts, updates records",
  "High adoption: users trust it because it knows their context",
  "Proprietary edge — your data trains your advantage",
  "Persistent memory — gets better every time it runs",
];

const examples = [
  {
    domain: "Operations",
    title: "AI Operations Director",
    description:
      "Knows production schedules, supplier lead times, and KPI targets. Monitors dashboards 24/7, surfaces exceptions before humans notice, drafts corrective action memos, and integrates with ERP to adjust purchase orders within defined rules.",
    outcome: "30–40% reduction in time spent on exception management.",
    tools: ["Claude Sonnet 4.6", "Airtable MCP", "SAP connector", "Slack alerts"],
    status: "Production at scale — 2026",
  },
  {
    domain: "Supply Chain",
    title: "Demand Forecast Agent",
    description:
      "Ingests sales data, weather events, competitor launches, and macro trends. Outputs weekly demand adjustments with confidence intervals. Flags when a forecast revision should trigger a procurement action and drafts the PO for human approval.",
    outcome: "15–25% improvement in inventory accuracy.",
    tools: ["GPT-5 / Claude Opus", "Vector DB", "ERP API", "Power BI"],
    status: "Pilots → production at Fortune 500, 2025–2026",
  },
  {
    domain: "Customer Support",
    title: "Tier-1 Resolution Agent",
    description:
      "Accesses order history, product docs, warranty policies, and known issues. Resolves 70% of common cases autonomously. Escalates with full context (problem, prior steps, sentiment) when human judgment is needed. Never re-asks the customer the same question.",
    outcome: "70% deflection rate, CSAT +18 points on escalated tickets.",
    tools: ["Relevance AI", "Zendesk MCP", "Knowledge base RAG", "Claude Haiku"],
    status: "Widely deployed — 2024–2026",
  },
  {
    domain: "Finance",
    title: "Month-End Close Agent",
    description:
      "Ingests GL entries, reconciles discrepancies against prior months and budgets, flags anomalies with explanations, and drafts the variance commentary for the CFO report. What took 3 days now takes hours.",
    outcome: "40–60% reduction in close cycle time.",
    tools: ["Claude Opus 4.8", "NetSuite API", "Excel MCP", "Notion"],
    status: "Early production — 2025–2026",
  },
  {
    domain: "Legal",
    title: "Contract Review Agent",
    description:
      "Knows your standard terms, red-line policies, and jurisdiction-specific clauses. Flags high-risk provisions, suggests pre-approved alternatives, and drafts negotiation memos. Reduces outside counsel time by 50%+.",
    outcome: "50%+ reduction in outside counsel hours on standard contracts.",
    tools: ["Claude Opus 4.8", "Google Drive MCP", "Vector DB", "Docusign API"],
    status: "Deployed at top 50 law firms and enterprise legal teams — 2025–2026",
  },
  {
    domain: "Content / Marketing",
    title: "Brand Voice Agent",
    description:
      "Trained on your brand guidelines, audience personas, and top-performing content. Drafts LinkedIn posts, emails, and product descriptions in your voice. Knows which channels convert, schedules via Playwright or Buffer, and reports performance back.",
    outcome: "5x content throughput at 80% brand compliance.",
    tools: ["Claude Sonnet 4.6", "Playwright MCP", "Airtable", "Relevance AI"],
    status: "Widely in use among AI-first marketing teams — 2025–2026",
  },
];

const buildSteps = [
  {
    n: "01",
    title: "Define the domain boundary",
    desc: "What does this agent know and not know? Where does human judgment still belong? Draw a line.",
  },
  {
    n: "02",
    title: "Assemble the knowledge base",
    desc: "Internal docs, process guides, historical decisions, product specs — these become the agent's domain memory via a vector database.",
  },
  {
    n: "03",
    title: "Wire the tools (MCP)",
    desc: "Connect the agent to the systems where actions live: your CRM, ERP, calendar, file store, APIs. Model Context Protocol (MCP) is now the standard connector layer.",
  },
  {
    n: "04",
    title: "Define the output contract",
    desc: "Decisions vs. recommendations vs. actions vs. alerts — be explicit about what the agent outputs and who approves what.",
  },
  {
    n: "05",
    title: "Add human-in-the-loop checkpoints",
    desc: "High-stakes actions get a human gate. Define the threshold upfront: what can the agent do autonomously, what requires approval?",
  },
  {
    n: "06",
    title: "Instrument and observe",
    desc: "Log every agent action, decision, and output. Review weekly. The agent improves when you can see where it drifts.",
  },
];

const stackTiers = [
  {
    tier: "Reasoning",
    examples: "Claude Sonnet 4.6 / Opus 4.8 / Fable 5 · GPT-5 · Gemini 2.5 Ultra",
    role: "The thinking layer — turn intent into structured decisions",
  },
  {
    tier: "Memory",
    examples: "Qdrant · Pinecone · Weaviate · pgvector",
    role: "Domain knowledge retrieval — the agent's long-term memory",
  },
  {
    tier: "Connectivity (MCP)",
    examples: "Google Drive · Airtable · Slack · Notion · GitHub · SAP · Salesforce",
    role: "Tool access — 300+ connectors via Model Context Protocol",
  },
  {
    tier: "Orchestration",
    examples: "n8n · LangGraph · CrewAI · Relevance AI · Claude Code",
    role: "Workflow engine — sequences tasks, handles retries and handoffs",
  },
  {
    tier: "Interfaces",
    examples: "Slack bot · Dashboard · Email · API response · Telegram",
    role: "Where humans and agents exchange information and approvals",
  },
];

export default function VerticalAIPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="pt-32 pb-24">
        <div className="max-w-6xl mx-auto px-6 lg:px-8 space-y-28">

          {/* Hero */}
          <motion.section {...fade} className="space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-secondary border border-black/5 shadow-sm">
              Vertical AI
            </div>
            <div className="space-y-6 max-w-4xl">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-heading font-bold leading-tight text-foreground">
                Generic AI helps.<br />Vertical AI compounds.
              </h1>
              <p className="text-xl text-secondary leading-relaxed">
                A generic AI assistant knows everything about the world and nothing about your company. A vertical AI system knows your domain, your data, and your workflows — and it gets smarter every time it runs.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              {["Domain-specific knowledge", "Embedded in workflows", "Executes actions", "Builds competitive moat"].map((tag) => (
                <span key={tag} className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-800">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" aria-hidden />
                  {tag}
                </span>
              ))}
            </div>
          </motion.section>

          {/* The Core Distinction */}
          <motion.section {...fade} className="space-y-10">
            <div className="space-y-2">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-secondary">The distinction that matters</p>
              <h2 className="text-3xl md:text-4xl font-heading font-semibold text-foreground leading-tight">
                Generic Copilot vs. Vertical AI System
              </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="rounded-2xl border border-black/10 bg-white p-8 space-y-5 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 text-sm font-bold">×</div>
                  <h3 className="text-xl font-heading font-semibold text-foreground">Generic Copilot</h3>
                </div>
                <ul className="space-y-3">
                  {genericTraits.map((t) => (
                    <li key={t} className="flex items-start gap-3 text-sm text-secondary">
                      <span className="mt-1 h-4 w-4 flex-shrink-0 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center text-xs">–</span>
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl border border-emerald-200 bg-gradient-to-br from-emerald-50/60 to-white p-8 space-y-5 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 text-sm font-bold">✓</div>
                  <h3 className="text-xl font-heading font-semibold text-foreground">Vertical AI System</h3>
                </div>
                <ul className="space-y-3">
                  {verticalTraits.map((t) => (
                    <li key={t} className="flex items-start gap-3 text-sm text-secondary">
                      <span className="mt-1 h-4 w-4 flex-shrink-0 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-xs">✓</span>
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="rounded-2xl border border-amber-200 bg-amber-50/80 p-6 shadow-inner flex items-start gap-4">
              <div className="text-2xl pt-0.5" aria-hidden>⚠️</div>
              <div className="space-y-1">
                <p className="text-sm font-semibold text-amber-800 uppercase tracking-wide">The compounding gap</p>
                <p className="text-base text-amber-900/90 leading-relaxed">
                  Generic AI keeps everyone at the same level. Vertical AI built on your data creates an advantage that competitors cannot replicate — because they don&apos;t have your data, your domain knowledge, or your operational history.
                </p>
              </div>
            </div>
          </motion.section>

          {/* Real Examples */}
          <section className="space-y-10">
            <div className="space-y-2">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-secondary">Real-world deployments — 2025–2026</p>
              <h2 className="text-3xl md:text-4xl font-heading font-semibold text-foreground leading-tight">
                What vertical AI looks like in production
              </h2>
              <p className="text-secondary leading-relaxed max-w-3xl">
                These are not demos or pilots. They are operational systems running in production at companies that decided to build vertical, domain-specific AI instead of deploying a generic assistant.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {examples.map((ex, i) => (
                <motion.div
                  key={ex.title}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07, duration: 0.45, ease: "easeOut" }}
                  className="rounded-2xl border border-black/5 bg-white p-7 shadow-sm space-y-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold uppercase tracking-[0.18em] text-secondary bg-slate-100 px-3 py-1 rounded-full">{ex.domain}</span>
                    <span className="text-xs text-secondary">{ex.status}</span>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-heading font-semibold text-foreground">{ex.title}</h3>
                    <p className="text-sm text-secondary leading-relaxed">{ex.description}</p>
                  </div>
                  <div className="rounded-xl bg-emerald-50 border border-emerald-100 px-4 py-3 space-y-1">
                    <p className="text-xs font-semibold text-emerald-700 uppercase tracking-wide">Outcome</p>
                    <p className="text-sm font-semibold text-emerald-900">{ex.outcome}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-semibold text-secondary uppercase tracking-wide">Stack</p>
                    <div className="flex flex-wrap gap-1.5">
                      {ex.tools.map((t) => (
                        <span key={t} className="text-xs bg-slate-100 text-slate-600 px-2.5 py-1 rounded-full font-medium">{t}</span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* How to Build */}
          <section className="space-y-10">
            <div className="space-y-2">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-secondary">How to build one</p>
              <h2 className="text-3xl md:text-4xl font-heading font-semibold text-foreground leading-tight">
                Six steps to a production vertical AI system
              </h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {buildSteps.map((step) => (
                <div key={step.n} className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm space-y-3 hover:border-emerald-200 transition-colors">
                  <div className="text-3xl font-heading font-bold text-emerald-200">{step.n}</div>
                  <h3 className="text-base font-semibold text-foreground">{step.title}</h3>
                  <p className="text-sm text-secondary leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* 2026 Stack */}
          <section className="space-y-10">
            <div className="space-y-2">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-secondary">The 2026 vertical AI stack</p>
              <h2 className="text-3xl md:text-4xl font-heading font-semibold text-foreground leading-tight">
                What you actually need to build this today
              </h2>
              <p className="text-secondary leading-relaxed max-w-3xl">
                The infrastructure cost to build a production vertical AI system dropped 95% between 2023 and 2026. What required a team of ML engineers now requires a small ops team and the right tools.
              </p>
            </div>
            <div className="overflow-x-auto rounded-2xl border border-black/5 bg-white shadow-sm">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-black/5 bg-slate-50/60">
                    <th className="text-left text-xs font-semibold uppercase tracking-[0.16em] text-secondary px-6 py-4">Layer</th>
                    <th className="text-left text-xs font-semibold uppercase tracking-[0.16em] text-secondary px-6 py-4">Examples (2026)</th>
                    <th className="text-left text-xs font-semibold uppercase tracking-[0.16em] text-secondary px-6 py-4">Role</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/5">
                  {stackTiers.map((row) => (
                    <tr key={row.tier} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-4 text-sm font-semibold text-foreground whitespace-nowrap">{row.tier}</td>
                      <td className="px-6 py-4 text-sm text-secondary">{row.examples}</td>
                      <td className="px-6 py-4 text-sm text-secondary leading-relaxed">{row.role}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="rounded-2xl border border-black/5 bg-gradient-to-r from-emerald-50/60 to-white p-8 space-y-4">
              <h3 className="text-xl font-heading font-semibold text-foreground">Model Context Protocol (MCP) — the connective tissue</h3>
              <p className="text-secondary leading-relaxed">
                MCP is Anthropic&apos;s open standard that lets AI models connect to any external tool, database, or system through a unified interface. Think of it as USB-C for AI — plug any tool in, and the model knows how to use it. As of 2026, there are 300+ MCP connectors available for everything from Google Drive to SAP to your custom internal APIs. Any vertical AI system built today should be wired through MCP.
              </p>
            </div>
          </section>

          {/* The Personal Layer */}
          <section className="space-y-8">
            <div className="rounded-3xl border border-black/5 bg-gradient-to-br from-slate-900 to-slate-800 p-10 lg:p-14 text-white space-y-8">
              <div className="space-y-2">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-400">The personal vertical AI layer</p>
                <h2 className="text-3xl md:text-4xl font-heading font-semibold leading-tight">
                  Vertical AI applies to individuals, not just enterprises.
                </h2>
              </div>
              <p className="text-slate-300 leading-relaxed text-lg max-w-3xl">
                The same principle that makes enterprise vertical AI powerful applies at the individual level. An AI assistant that knows your projects, your communication style, your goals, your knowledge base, and your tools is not the same thing as ChatGPT with a prompt. It is a different category.
              </p>
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  {
                    title: "Personal knowledge base",
                    desc: "Your notes, your research, your past decisions — indexed in a vector database connected to your reasoning model. Obsidian + MCP is the current leading pattern.",
                  },
                  {
                    title: "Workflow agents",
                    desc: "Agents that draft, schedule, publish, and report in your voice, using your brand standards, with your tools. Playwright + Relevance AI + Claude is the current stack.",
                  },
                  {
                    title: "Context that compounds",
                    desc: "Every decision you make, every piece of content you create, every conversation you have feeds back into your system. Over time, the AI knows your domain better than any generalist assistant.",
                  },
                ].map((item) => (
                  <div key={item.title} className="space-y-2 bg-white/5 rounded-xl p-6 border border-white/10">
                    <h3 className="font-semibold text-white">{item.title}</h3>
                    <p className="text-sm text-slate-300 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* The key question */}
          <section className="space-y-6">
            <div className="rounded-2xl border border-black/5 bg-white p-10 shadow-sm space-y-5 text-center">
              <h2 className="text-3xl md:text-4xl font-heading font-semibold text-foreground leading-tight">
                The only question that matters
              </h2>
              <p className="text-xl text-secondary leading-relaxed max-w-2xl mx-auto">
                Are you building AI that knows your domain — or deploying a generic tool and hoping it figures it out?
              </p>
              <p className="text-base text-secondary max-w-2xl mx-auto">
                Generic AI keeps everyone competitive. Vertical AI, built on your proprietary data and embedded in your workflows, is the only kind that compounds. The window to build that advantage is open now — and it narrows every quarter.
              </p>
            </div>
          </section>

        </div>
      </main>
    </div>
  );
}
