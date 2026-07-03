"use client";

import { motion } from "framer-motion";
import Navigation from "../Navigation";

const fade = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: "easeOut" },
};

const models2026 = [
  {
    org: "Anthropic",
    models: [
      { name: "Claude Fable 5", tier: "Frontier", strength: "Most capable — complex reasoning, long-form analysis, agentic workflows" },
      { name: "Claude Opus 4.8", tier: "Expert", strength: "Deep reasoning, coding, multi-step planning. Best for technical depth." },
      { name: "Claude Sonnet 4.6", tier: "Default", strength: "The 80/20 model — excellent quality at production speed and cost" },
      { name: "Claude Haiku 4.5", tier: "Fast", strength: "Sub-second responses, low cost, high throughput. Ideal for classification, routing, and summarization." },
    ],
  },
  {
    org: "OpenAI",
    models: [
      { name: "GPT-5", tier: "Frontier", strength: "Multimodal, tool-use, long context. Strong on structured reasoning." },
      { name: "o3 / o4", tier: "Reasoning", strength: "Thinks before it answers. Best for math, science, and complex logic." },
      { name: "GPT-4o mini", tier: "Fast", strength: "Low-cost, fast — widely deployed in consumer applications." },
    ],
  },
  {
    org: "Google",
    models: [
      { name: "Gemini 2.5 Ultra", tier: "Frontier", strength: "1M+ token context window. Best for processing entire codebases or document sets." },
      { name: "Gemini 2.5 Flash", tier: "Fast", strength: "Speed-optimized, highly cost-effective for high-volume tasks." },
    ],
  },
  {
    org: "Open Source",
    models: [
      { name: "Llama 4 (Meta)", tier: "Open", strength: "Multimodal, runs locally. Changed the economics of private deployment." },
      { name: "DeepSeek R2", tier: "Open", strength: "Frontier-level reasoning at open-source cost. Shocked the market in 2025." },
      { name: "Mistral Large", tier: "Open", strength: "European alternative, strong multilingual capabilities." },
    ],
  },
];

const majorShifts2026 = [
  {
    shift: "MCP becomes the standard",
    what:
      "Model Context Protocol (MCP), open-sourced by Anthropic in 2024, became the universal connector layer for AI tools in 2025–2026. 300+ connectors available. Every major AI tool now speaks MCP. This is what makes AI integrations composable instead of custom-coded.",
    impact: "Infrastructure",
  },
  {
    shift: "Agentic systems replace copilots",
    what:
      "The market shifted from 'AI that assists' to 'AI that acts.' Claude Code, Cursor, Devin, and similar tools handle full software development cycles. Multi-agent orchestration frameworks (n8n, LangGraph, CrewAI) power end-to-end business processes without human intervention at each step.",
    impact: "Workflow",
  },
  {
    shift: "On-device AI goes mainstream",
    what:
      "Apple Intelligence, Qualcomm Snapdragon X Elite NPUs, and Samsung Galaxy AI bring capable models to personal devices. Data never leaves the device for sensitive tasks. Inference latency drops to milliseconds. Privacy-preserving AI becomes the default for personal use.",
    impact: "Privacy",
  },
  {
    shift: "Physical AI arrives",
    what:
      "Figure 02, Apptronik Apollo, and Tesla Optimus begin limited commercial deployment. These are reasoning models in robot bodies — not the rigid automation of previous decades. Boston Dynamics' Atlas integrates foundation models for task generalization. Industrial AI shifts from software-only to embodied.",
    impact: "Physical",
  },
  {
    shift: "Reasoning models change the ceiling",
    what:
      "OpenAI's o3, Anthropic's extended thinking (Claude 3.7+), and Google's Gemini Thinking show that 'thinking before answering' dramatically changes what AI can solve. PhD-level science, complex legal analysis, and multi-week research projects become single-agent tasks.",
    impact: "Capability",
  },
  {
    shift: "Open source closes the gap",
    what:
      "DeepSeek R1 matched GPT-4-level performance at open-source cost. Llama 4 added multimodal capability. The cost of deploying frontier-quality AI dropped 95% between 2023 and 2026. This democratized advanced AI for startups, individuals, and non-enterprise organizations.",
    impact: "Accessibility",
  },
  {
    shift: "Knowledge externalization as strategy",
    what:
      "The most effective AI practitioners in 2026 treat their knowledge as structured infrastructure. Obsidian + MCP, Notion databases, and personal vector stores become standard professional tools. The gap between people who externalize knowledge to AI and those who don&apos;t compounds with every week.",
    impact: "Personal",
  },
];

const operationsImpact = [
  {
    function: "Supply Chain",
    before: "Weekly manual demand review, spreadsheet-based forecasting, reactive inventory adjustments",
    after: "Daily AI-driven demand signals, automated PO generation within defined rules, predictive exception alerts",
    roi: "15–30% reduction in inventory carrying costs",
  },
  {
    function: "Customer Operations",
    before: "Tier-1 support handled entirely by humans, 48-hour average resolution time",
    after: "70% deflection by AI agents, 4-hour average resolution, human agents handle complex cases with full context",
    roi: "40–60% support cost reduction, CSAT +15–20 points",
  },
  {
    function: "Finance / FP&A",
    before: "3-day month-end close, manual variance commentary, static budgets",
    after: "Hours-long close process, AI-drafted commentary reviewed by humans, rolling AI-updated forecasts",
    roi: "60% reduction in close time, 80% reduction in FP&A analyst time on routine tasks",
  },
  {
    function: "IT / DevOps",
    before: "Manual ticket triage, human-only code review, reactive incident response",
    after: "AI-routed tickets, AI-assisted PR review at scale, anomaly detection and first-response automation",
    roi: "50% reduction in MTTR, 3x developer throughput",
  },
  {
    function: "HR / Talent",
    before: "Manual resume screening, reactive workforce planning, generic onboarding",
    after: "AI-first screening against structured criteria, predictive workforce models, personalized onboarding agents",
    roi: "70% reduction in time-to-hire, 40% improvement in new hire 90-day retention",
  },
  {
    function: "Content / Marketing",
    before: "Manual content creation, slow campaign iteration, generic messaging",
    after: "AI-generated content in brand voice, automated A/B testing, personalized messaging at scale",
    roi: "5x content throughput, 30–40% improvement in campaign conversion",
  },
];

const watchList = [
  {
    name: "Reasoning-native workflows",
    desc: "As o3-level reasoning becomes standard, AI shifts from 'completing tasks' to 'solving problems.' The organizations that redesign workflows around reasoning agents (not just automation) will have a structural advantage.",
    horizon: "Now — 2027",
  },
  {
    name: "AI memory infrastructure",
    desc: "Persistent, evolving AI memory (personal knowledge graphs, organizational memory systems) is the next foundation layer. Obsidian + MCP is the early pattern. Enterprise versions are being built.",
    horizon: "2026 — 2028",
  },
  {
    name: "Physical-digital AI integration",
    desc: "Reasoning models that operate robots and physical systems will transform manufacturing, logistics, and field operations. The same model that drafts your strategy memo will eventually operate your warehouse.",
    horizon: "2026 — 2030",
  },
  {
    name: "AI governance as infrastructure",
    desc: "The EU AI Act is live. US framework is developing. Organizations without AI governance infrastructure face regulatory and reputational exposure. Governance is no longer optional — it is infrastructure.",
    horizon: "Now",
  },
  {
    name: "Multi-modal as default",
    desc: "Text-only AI is already an edge case. Voice, image, video, and code are native inputs for 2026 frontier models. The next wave of vertical AI will be built for multi-modal operations: video quality inspection, voice-driven ERP commands, visual anomaly detection.",
    horizon: "Now — 2027",
  },
];

export default function AINow2026Page() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="pt-32 pb-24">
        <div className="max-w-6xl mx-auto px-6 lg:px-8 space-y-28">

          {/* Hero */}
          <motion.section {...fade} className="space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700 border border-emerald-200 shadow-sm">
              AI Today — July 2026
            </div>
            <div className="space-y-6 max-w-4xl">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-heading font-bold leading-tight text-foreground">
                Where AI actually is right now.
              </h1>
              <p className="text-xl text-secondary leading-relaxed">
                Not the hype. Not the demos. The operational reality of AI in July 2026 — what works, what&apos;s changed, what&apos;s next, and what it means for operations professionals.
              </p>
            </div>
          </motion.section>

          {/* Major shifts */}
          <motion.section {...fade} className="space-y-10">
            <div className="space-y-2">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-secondary">Seven shifts that changed everything</p>
              <h2 className="text-3xl md:text-4xl font-heading font-semibold text-foreground leading-tight">
                What happened between 2024 and now
              </h2>
            </div>
            <div className="space-y-4">
              {majorShifts2026.map((s, i) => (
                <motion.div
                  key={s.shift}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.45, ease: "easeOut" }}
                  className="rounded-2xl border border-black/5 bg-white p-7 shadow-sm flex items-start gap-6"
                >
                  <div className="flex-shrink-0 rounded-xl bg-emerald-50 border border-emerald-100 px-3 py-1.5 text-xs font-semibold text-emerald-700 whitespace-nowrap">
                    {s.impact}
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold text-foreground">{s.shift}</h3>
                    <p className="text-sm text-secondary leading-relaxed">{s.what}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Models */}
          <section className="space-y-10">
            <div className="space-y-2">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-secondary">The model landscape</p>
              <h2 className="text-3xl md:text-4xl font-heading font-semibold text-foreground leading-tight">
                Which models matter in 2026
              </h2>
              <p className="text-secondary leading-relaxed max-w-3xl">
                The model market has bifurcated: frontier models for deep reasoning, fast/cheap models for high-volume tasks. The right choice depends on your use case, not on chasing the latest release.
              </p>
            </div>
            <div className="space-y-6">
              {models2026.map((org) => (
                <div key={org.org} className="space-y-3">
                  <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-secondary pl-1">{org.org}</h3>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {org.models.map((m) => (
                      <div key={m.name} className="rounded-xl border border-black/5 bg-white p-5 shadow-sm space-y-2 hover:border-emerald-200 transition-colors">
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm font-semibold text-foreground">{m.name}</h4>
                          <span className="text-xs bg-slate-100 text-slate-600 px-2.5 py-0.5 rounded-full font-medium">{m.tier}</span>
                        </div>
                        <p className="text-sm text-secondary leading-relaxed">{m.strength}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="rounded-2xl border border-black/5 bg-slate-50 p-6 space-y-2">
              <p className="text-sm font-semibold text-foreground">The rule of thumb for 2026</p>
              <p className="text-secondary leading-relaxed">
                Use Haiku/Flash/mini for classification, routing, and summarization. Use Sonnet/GPT-4o for standard production tasks. Use Opus/GPT-5/Gemini Ultra for complex reasoning, analysis, and strategic decisions. Use o3/extended-thinking when depth matters more than speed. Match the model to the task — not to what&apos;s newest.
              </p>
            </div>
          </section>

          {/* Operations impact */}
          <section className="space-y-10">
            <div className="space-y-2">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-secondary">Operational impact — measured</p>
              <h2 className="text-3xl md:text-4xl font-heading font-semibold text-foreground leading-tight">
                What AI is delivering in operations today
              </h2>
              <p className="text-secondary leading-relaxed max-w-3xl">
                Not projections. Outcomes being reported by companies that went past pilot stage in 2024–2025 and are now running AI in production operations.
              </p>
            </div>
            <div className="space-y-4">
              {operationsImpact.map((row, i) => (
                <motion.div
                  key={row.function}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.4 }}
                  className="rounded-2xl border border-black/5 bg-white shadow-sm overflow-hidden"
                >
                  <div className="border-b border-black/5 bg-slate-50/60 px-6 py-3 flex items-center justify-between">
                    <h3 className="text-sm font-semibold text-foreground">{row.function}</h3>
                    <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-100 px-3 py-1 rounded-full">{row.roi}</span>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-6 p-6">
                    <div className="space-y-1">
                      <p className="text-xs font-semibold uppercase tracking-wide text-secondary">Before</p>
                      <p className="text-sm text-secondary leading-relaxed">{row.before}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">After</p>
                      <p className="text-sm text-foreground leading-relaxed">{row.after}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Watch list */}
          <section className="space-y-10">
            <div className="space-y-2">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-secondary">What to watch</p>
              <h2 className="text-3xl md:text-4xl font-heading font-semibold text-foreground leading-tight">
                The five developments that will matter most
              </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-5">
              {watchList.map((w, i) => (
                <motion.div
                  key={w.name}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07 }}
                  className="rounded-2xl border border-black/5 bg-white p-7 shadow-sm space-y-4"
                >
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-base font-semibold text-foreground leading-snug">{w.name}</h3>
                    <span className="flex-shrink-0 text-xs font-medium text-secondary bg-slate-100 px-2.5 py-1 rounded-full whitespace-nowrap">{w.horizon}</span>
                  </div>
                  <p className="text-sm text-secondary leading-relaxed">{w.desc}</p>
                </motion.div>
              ))}
            </div>
          </section>

          {/* The operational professional's position */}
          <section>
            <div className="rounded-3xl border border-black/5 bg-gradient-to-br from-slate-900 to-slate-800 p-10 lg:p-14 text-white space-y-8">
              <div className="space-y-2">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-400">The position to take in 2026</p>
                <h2 className="text-3xl md:text-4xl font-heading font-semibold leading-tight">
                  The gap between AI users and AI operators is widening.
                </h2>
              </div>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h3 className="font-semibold text-white">AI user</h3>
                  <ul className="space-y-2 text-slate-300 text-sm">
                    <li>Uses ChatGPT, Claude.ai, Gemini interchangeably</li>
                    <li>Prompts for individual tasks in isolation</li>
                    <li>No persistent knowledge base or domain memory</li>
                    <li>Dependent on the same tools as everyone else</li>
                    <li>Productivity gains: 10–30%</li>
                  </ul>
                </div>
                <div className="space-y-4">
                  <h3 className="font-semibold text-emerald-400">AI operator</h3>
                  <ul className="space-y-2 text-slate-200 text-sm">
                    <li>Builds systems that use AI — not just uses AI</li>
                    <li>Orchestrates agents across end-to-end workflows</li>
                    <li>Domain knowledge stored, indexed, and queryable</li>
                    <li>Proprietary data and systems create competitive moat</li>
                    <li>Leverage gains: 5–10× and compounding</li>
                  </ul>
                </div>
              </div>
              <p className="text-slate-300 leading-relaxed max-w-3xl">
                The operations professional who understands AI as infrastructure — who can design the system, wire the tools, and govern the outputs — is the most valuable person in any organization in 2026. This map exists to create that person.
              </p>
            </div>
          </section>

        </div>
      </main>
    </div>
  );
}
