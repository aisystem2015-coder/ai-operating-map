"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import Navigation from "./Navigation";
import SystemViewCard from "./ui/system-view-card";

const fadeIn = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: "easeOut" },
};

// ── Data ──────────────────────────────────────────────────────────────────────

const majorShifts2026 = [
  {
    shift: "MCP becomes the standard",
    what: "Model Context Protocol (MCP), open-sourced by Anthropic in 2024, became the universal connector layer for AI tools in 2025–2026. 300+ connectors available. Every major AI tool now speaks MCP. This is what makes AI integrations composable instead of custom-coded.",
    impact: "Infrastructure",
  },
  {
    shift: "Agentic systems replace copilots",
    what: "The market shifted from AI that assists to AI that acts. Claude Code, Cursor, Devin, and similar tools handle full software development cycles. Multi-agent orchestration frameworks (n8n, LangGraph, CrewAI) power end-to-end business processes without human intervention at each step.",
    impact: "Workflow",
  },
  {
    shift: "On-device AI goes mainstream",
    what: "Apple Intelligence, Qualcomm Snapdragon X Elite NPUs, and Samsung Galaxy AI bring capable models to personal devices. Data never leaves the device for sensitive tasks. Inference latency drops to milliseconds. Privacy-preserving AI becomes the default for personal use.",
    impact: "Privacy",
  },
  {
    shift: "Physical AI arrives",
    what: "Figure 02, Apptronik Apollo, and Tesla Optimus begin limited commercial deployment. These are reasoning models in robot bodies — not the rigid automation of previous decades. Industrial AI shifts from software-only to embodied.",
    impact: "Physical",
  },
  {
    shift: "Reasoning models change the ceiling",
    what: "OpenAI o3, Anthropic extended thinking (Claude 3.7+), and Google Gemini Thinking show that thinking before answering dramatically changes what AI can solve. PhD-level science, complex legal analysis, and multi-week research projects become single-agent tasks.",
    impact: "Capability",
  },
  {
    shift: "Open source closes the gap",
    what: "DeepSeek R1 matched GPT-4-level performance at open-source cost. Llama 4 added multimodal capability. The cost of deploying frontier-quality AI dropped 95% between 2023 and 2026. This democratized advanced AI for startups and individuals.",
    impact: "Accessibility",
  },
  {
    shift: "Knowledge externalization as strategy",
    what: "The most effective AI practitioners in 2026 treat their knowledge as structured infrastructure. Obsidian + MCP, Notion databases, and personal vector stores become standard professional tools. The gap between people who externalize knowledge to AI and those who don&apos;t compounds with every week.",
    impact: "Personal",
  },
];

const models2026 = [
  {
    org: "Anthropic",
    models: [
      { name: "Claude Fable 5", tier: "Frontier", strength: "Most capable — complex reasoning, long-form analysis, agentic workflows" },
      { name: "Claude Opus 4.8", tier: "Expert", strength: "Deep reasoning, coding, multi-step planning. Best for technical depth." },
      { name: "Claude Sonnet 4.6", tier: "Default", strength: "The 80/20 model — excellent quality at production speed and cost" },
      { name: "Claude Haiku 4.5", tier: "Fast", strength: "Sub-second responses, low cost, high throughput. Classification, routing, summarization." },
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

const marketRealityReasons = [
  { id: "1", title: "Expectations", body: "Unrealistic assumptions about what AI can deliver without proper data foundations and integration." },
  { id: "2", title: "Data", body: "Weak data foundations: messy, siloed, or incomplete data that cannot support reliable AI systems. 60–70% of AI use cases fail at the data layer." },
  { id: "3", title: "Wrong mindset", body: "Horizontal thinking: building generic AI that tries to do everything instead of vertical, domain-specific solutions." },
];

const genericTraits = [
  "General knowledge, no domain depth",
  "Separate interface — not embedded in workflows",
  "Provides suggestions — human executes",
  "Low adoption: users don&apos;t trust outputs they can&apos;t verify",
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

const verticalExamples = [
  {
    domain: "Operations",
    title: "AI Operations Director",
    description: "Knows production schedules, supplier lead times, and KPI targets. Monitors dashboards 24/7, surfaces exceptions before humans notice, drafts corrective action memos, and integrates with ERP to adjust purchase orders within defined rules.",
    outcome: "30–40% reduction in time spent on exception management.",
    tools: ["Claude Sonnet 4.6", "Airtable MCP", "SAP connector", "Slack alerts"],
    status: "Production at scale — 2026",
  },
  {
    domain: "Supply Chain",
    title: "Demand Forecast Agent",
    description: "Ingests sales data, weather events, competitor launches, and macro trends. Outputs weekly demand adjustments with confidence intervals. Flags when a forecast revision should trigger a procurement action and drafts the PO for human approval.",
    outcome: "15–25% improvement in inventory accuracy.",
    tools: ["GPT-5 / Claude Opus", "Vector DB", "ERP API", "Power BI"],
    status: "Pilots → production at Fortune 500, 2025–2026",
  },
  {
    domain: "Customer Support",
    title: "Tier-1 Resolution Agent",
    description: "Accesses order history, product docs, warranty policies, and known issues. Resolves 70% of common cases autonomously. Escalates with full context when human judgment is needed. Never re-asks the customer the same question.",
    outcome: "70% deflection rate, CSAT +18 points on escalated tickets.",
    tools: ["Relevance AI", "Zendesk MCP", "Knowledge base RAG", "Claude Haiku"],
    status: "Widely deployed — 2024–2026",
  },
  {
    domain: "Finance",
    title: "Month-End Close Agent",
    description: "Ingests GL entries, reconciles discrepancies against prior months and budgets, flags anomalies with explanations, and drafts the variance commentary for the CFO report. What took 3 days now takes hours.",
    outcome: "40–60% reduction in close cycle time.",
    tools: ["Claude Opus 4.8", "NetSuite API", "Excel MCP", "Notion"],
    status: "Early production — 2025–2026",
  },
  {
    domain: "Legal",
    title: "Contract Review Agent",
    description: "Knows your standard terms, red-line policies, and jurisdiction-specific clauses. Flags high-risk provisions, suggests pre-approved alternatives, and drafts negotiation memos.",
    outcome: "50%+ reduction in outside counsel hours on standard contracts.",
    tools: ["Claude Opus 4.8", "Google Drive MCP", "Vector DB", "Docusign API"],
    status: "Deployed at top 50 law firms — 2025–2026",
  },
  {
    domain: "Content / Marketing",
    title: "Brand Voice Agent",
    description: "Trained on your brand guidelines, audience personas, and top-performing content. Drafts posts, emails, and product descriptions in your voice. Knows which channels convert, schedules, and reports performance back.",
    outcome: "5x content throughput at 80% brand compliance.",
    tools: ["Claude Sonnet 4.6", "Playwright MCP", "Airtable", "Relevance AI"],
    status: "Widely in use among AI-first marketing teams — 2025–2026",
  },
];

const buildSteps = [
  { n: "01", title: "Define the domain boundary", desc: "What does this agent know and not know? Where does human judgment still belong? Draw a line." },
  { n: "02", title: "Assemble the knowledge base", desc: "Internal docs, process guides, historical decisions, product specs — these become the agent&apos;s domain memory via a vector database." },
  { n: "03", title: "Wire the tools (MCP)", desc: "Connect the agent to the systems where actions live: your CRM, ERP, calendar, file store, APIs. Model Context Protocol (MCP) is now the standard connector layer." },
  { n: "04", title: "Define the output contract", desc: "Decisions vs. recommendations vs. actions vs. alerts — be explicit about what the agent outputs and who approves what." },
  { n: "05", title: "Add human-in-the-loop checkpoints", desc: "High-stakes actions get a human gate. Define the threshold upfront: what can the agent do autonomously, what requires approval?" },
  { n: "06", title: "Instrument and observe", desc: "Log every agent action, decision, and output. Review weekly. The agent improves when you can see where it drifts." },
];

const agentPatterns = [
  {
    n: "01",
    name: "ReAct (Reason + Act)",
    description: "The agent alternates between reasoning about a problem and taking an action. It observes the result of each action before deciding the next step. The most common pattern for tool-using agents.",
    when: "When the path to a solution isn&apos;t known upfront and the agent must discover it by doing.",
    example: "Research agent: searches the web, reads results, decides what to search next, writes a summary.",
  },
  {
    n: "02",
    name: "Plan-and-Execute",
    description: "A planning model generates a full step-by-step plan first. An execution model carries out each step. This separates strategic reasoning from tactical action — better for complex, predictable workflows.",
    when: "When the workflow has known structure but requires AI reasoning at each step.",
    example: "Month-end close agent: plans the entire reconciliation sequence, then executes step by step.",
  },
  {
    n: "03",
    name: "Multi-Agent (Orchestrator + Specialists)",
    description: "One orchestrator agent decomposes a complex task and delegates subtasks to specialized agents. Each specialist is optimized for its domain. Results flow back to the orchestrator for synthesis.",
    when: "When a task requires multiple domains of expertise, parallel execution, or very long context.",
    example: "Proposal agent: orchestrator delegates market research to one agent, pricing to another, writing to a third.",
  },
  {
    n: "04",
    name: "MCP-Connected (Tool Execution)",
    description: "The agent has direct access to external tools via Model Context Protocol — databases, APIs, file systems, calendars, communication tools. It acts in the real world, not just in chat.",
    when: "When the agent must read from or write to production systems as part of its work.",
    example: "LinkedIn content agent: drafts post → publishes via Playwright → logs performance in Airtable → reports back.",
  },
  {
    n: "05",
    name: "Human-in-the-Loop",
    description: "The agent completes analysis and proposes an action, then pauses for human approval before executing. Critical for high-stakes, irreversible, or high-cost decisions.",
    when: "When the consequences of an error are significant — financial, legal, operational.",
    example: "Procurement agent: recommends a purchase order → human approves → agent submits to ERP.",
  },
];

const agentStack = [
  { layer: "Model", role: "Reasoning engine", examples: "Claude Sonnet 4.6, Claude Opus 4.8, GPT-5, Gemini 2.5" },
  { layer: "Memory", role: "Short-term context + long-term retrieval", examples: "Context window + Qdrant / Pinecone / pgvector" },
  { layer: "Tools (MCP)", role: "Actions the agent can take", examples: "APIs, file systems, browsers, databases, email, calendar" },
  { layer: "Orchestration", role: "Controls task flow, retries, handoffs", examples: "n8n, LangGraph, CrewAI, Claude Code, Relevance AI" },
  { layer: "Guardrails", role: "Prevents unsafe or incorrect outputs", examples: "Schema validation, human checkpoints, step limits, confidence thresholds" },
  { layer: "Observability", role: "Full audit trail of every action and decision", examples: "LangSmith, custom logging, Sentry, PostHog" },
];

const productionFailures = [
  { failure: "Hallucination without guardrails", cause: "Agent invents facts, especially in long reasoning chains", fix: "Add retrieval (RAG) for factual claims. Validate outputs against schemas. Use smaller, focused prompts." },
  { failure: "Tool call loops", cause: "Agent gets stuck calling the same tool repeatedly without progress", fix: "Implement step limits and loop detection. Add explicit termination conditions." },
  { failure: "Context overflow", cause: "Long agent runs fill the context window; early instructions are forgotten", fix: "Compress intermediate results. Use summarization agents. Structure tasks to stay within window." },
  { failure: "No observability", cause: "Agent acts but no one can audit what it did or why", fix: "Log every tool call, reasoning step, and output. Treat agent traces like production logs." },
  { failure: "Cascading errors", cause: "A wrong decision early in the chain propagates through all downstream steps", fix: "Add validation checkpoints between steps. Use human gates at high-stakes branch points." },
  { failure: "Permission creep", cause: "Agent is given too many tools just in case, then uses them incorrectly", fix: "Grant minimum viable permissions. Define explicit tool scope at deployment time." },
];

const benchmarks2026 = [
  { name: "SWE-bench (coding)", score2023: "< 5%", score2026: "65–80%", meaning: "Agents now autonomously fix real GitHub issues" },
  { name: "GAIA (general AI assistant)", score2023: "< 20%", score2026: "55–70%", meaning: "Complex multi-step tasks completed without human help" },
  { name: "Humanity&apos;s Last Exam", score2023: "n/a", score2026: "40–60%", meaning: "PhD-level questions across science, law, medicine" },
  { name: "ARC-AGI", score2023: "< 10%", score2026: "75–85%", meaning: "Novel reasoning that required human-level adaptation" },
];

const operationsImpact = [
  { function: "Supply Chain", before: "Weekly manual demand review, spreadsheet-based forecasting, reactive inventory adjustments", after: "Daily AI-driven demand signals, automated PO generation within defined rules, predictive exception alerts", roi: "15–30% inventory cost reduction" },
  { function: "Customer Operations", before: "Tier-1 support handled entirely by humans, 48-hour average resolution time", after: "70% deflection by AI agents, 4-hour average resolution, human agents handle complex cases with full context", roi: "40–60% support cost reduction" },
  { function: "Finance / FP&A", before: "3-day month-end close, manual variance commentary, static budgets", after: "Hours-long close process, AI-drafted commentary reviewed by humans, rolling AI-updated forecasts", roi: "60% reduction in close time" },
  { function: "IT / DevOps", before: "Manual ticket triage, human-only code review, reactive incident response", after: "AI-routed tickets, AI-assisted PR review at scale, anomaly detection and first-response automation", roi: "50% MTTR reduction, 3× throughput" },
  { function: "HR / Talent", before: "Manual resume screening, reactive workforce planning, generic onboarding", after: "AI-first screening against structured criteria, predictive workforce models, personalized onboarding agents", roi: "70% reduction in time-to-hire" },
  { function: "Content / Marketing", before: "Manual content creation, slow campaign iteration, generic messaging", after: "AI-generated content in brand voice, automated A/B testing, personalized messaging at scale", roi: "5× content throughput" },
];

const watchList = [
  { name: "Reasoning-native workflows", desc: "As o3-level reasoning becomes standard, AI shifts from completing tasks to solving problems. The organizations that redesign workflows around reasoning agents will have a structural advantage.", horizon: "Now — 2027" },
  { name: "AI memory infrastructure", desc: "Persistent, evolving AI memory (personal knowledge graphs, organizational memory systems) is the next foundation layer. Obsidian + MCP is the early pattern. Enterprise versions are being built.", horizon: "2026 — 2028" },
  { name: "Physical-digital AI integration", desc: "Reasoning models that operate robots and physical systems will transform manufacturing, logistics, and field operations. The same model that drafts your strategy memo will eventually operate your warehouse.", horizon: "2026 — 2030" },
  { name: "AI governance as infrastructure", desc: "The EU AI Act is live. US framework is developing. Organizations without AI governance infrastructure face regulatory and reputational exposure. Governance is no longer optional.", horizon: "Now" },
  { name: "Multi-modal as default", desc: "Text-only AI is already an edge case. Voice, image, video, and code are native inputs for 2026 frontier models. The next wave of vertical AI will be built for multi-modal operations.", horizon: "Now — 2027" },
];

// ── Component ─────────────────────────────────────────────────────────────────

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />

      <main className="pt-28 pb-24">
        <div className="max-w-6xl mx-auto px-6 lg:px-10 space-y-28">

          {/* ── 1. Hero ── */}
          <section>
            <motion.div
              initial={{ opacity: 1, y: 12 }}
              animate={fadeIn.animate}
              transition={fadeIn.transition}
              className="relative overflow-hidden rounded-3xl border border-black/5 bg-white shadow-sm"
            >
              <div
                className="pointer-events-none absolute inset-0 opacity-60"
                aria-hidden
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 1px 1px, rgba(15,23,42,0.06) 1px, transparent 0), radial-gradient(circle at 19px 19px, rgba(15,23,42,0.04) 1px, transparent 0)",
                  backgroundSize: "36px 36px",
                  backgroundPosition: "0 0, 18px 18px",
                }}
              />
              <div className="relative px-8 py-12 lg:px-12 lg:py-16 space-y-8">
                <div className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-secondary border border-black/5 shadow-sm">
                  AI Operating Map — July 2026
                </div>
                <div className="space-y-6 max-w-3xl">
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold leading-tight">
                    AI is not a product. It is the reasoning layer inside your system.
                  </h1>
                  <div className="overflow-hidden rounded-2xl border border-emerald-100 bg-white/80 shadow-sm divide-y divide-emerald-100">
                    {[
                      "AI has slashed the cost of building software, so isolated demos are now trivial.",
                      "Working software isn&apos;t a full system — prototypes skip failure modes, recovery, and ownership that production must handle.",
                      "This operating map adds the architectural discipline to turn scattered pilots into an enterprise system that compounds value.",
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-start gap-3 p-4 sm:p-5">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-50 text-sm font-semibold text-emerald-700">
                          {`0${idx + 1}`}
                        </div>
                        <p className="text-base text-secondary leading-[1.7]" dangerouslySetInnerHTML={{ __html: item }} />
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {["System-first, not tool-first", "Ownership before orchestration", "Prevention before execution"].map((item) => (
                    <span key={item} className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-3 py-2 text-xs font-semibold text-slate-700">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" aria-hidden />
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </section>

          {/* ── 2. Where AI is right now ── */}
          <section className="space-y-10">
            <motion.div {...fadeIn} className="space-y-2">
              <div className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700 border border-emerald-200 shadow-sm">
                AI Today — July 2026
              </div>
              <h2 className="text-3xl md:text-4xl font-heading font-semibold leading-tight">
                Seven shifts that changed everything
              </h2>
              <p className="text-base text-secondary leading-[1.7] max-w-3xl">
                Not the hype. Not the demos. The operational reality of AI in 2026 — what happened, what works, and what it means for operations professionals.
              </p>
            </motion.div>
            <div className="space-y-4">
              {majorShifts2026.map((s, i) => (
                <motion.div
                  key={s.shift}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.4, ease: "easeOut" }}
                  className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm flex items-start gap-5"
                >
                  <div className="flex-shrink-0 rounded-xl bg-emerald-50 border border-emerald-100 px-3 py-1.5 text-xs font-semibold text-emerald-700 whitespace-nowrap">
                    {s.impact}
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-base font-semibold text-foreground">{s.shift}</h3>
                    <p className="text-sm text-secondary leading-relaxed">{s.what}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* ── 3. Model landscape ── */}
          <section className="space-y-10">
            <motion.div {...fadeIn} className="space-y-2">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-secondary">The model landscape 2026</p>
              <h2 className="text-3xl md:text-4xl font-heading font-semibold leading-tight">
                Which models matter — and why
              </h2>
              <p className="text-base text-secondary leading-[1.7] max-w-3xl">
                The market has bifurcated: frontier models for deep reasoning, fast/cheap models for high-volume tasks. Match the model to the task — not to what&apos;s newest.
              </p>
            </motion.div>
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
          </section>

          {/* ── 4. Why 95% fail ── */}
          <motion.div {...fadeIn} className="rounded-3xl border border-black/5 bg-gradient-to-br from-white via-emerald-50/40 to-white p-10 shadow-sm space-y-8">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-secondary border border-black/5 shadow-sm w-fit">
                Market Reality
              </div>
              <h2 className="text-3xl md:text-4xl font-heading font-semibold leading-tight">
                95% of GenAI pilots fail to scale.
              </h2>
              <p className="text-base text-secondary leading-[1.7]">
                The gap between &quot;demo&quot; and &quot;production&quot; is structural, not technical.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {marketRealityReasons.map((reason) => (
                <div key={reason.title} className="flex flex-col items-start gap-3 px-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 border border-emerald-200 text-xs font-medium text-emerald-800">
                    {reason.id}
                  </div>
                  <p className="text-base font-semibold text-foreground">{reason.title}</p>
                  <p className="text-sm text-secondary leading-[1.7]">{reason.body}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ── 5. Generic vs Vertical AI ── */}
          <section className="space-y-10">
            <motion.div {...fadeIn} className="space-y-2">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-secondary">The distinction that matters</p>
              <h2 className="text-3xl md:text-4xl font-heading font-semibold leading-tight">
                Generic AI helps. Vertical AI compounds.
              </h2>
              <p className="text-base text-secondary leading-[1.7] max-w-3xl">
                A generic AI assistant knows everything about the world and nothing about your company. A vertical AI system knows your domain, your data, and your workflows — and it gets smarter every time it runs.
              </p>
            </motion.div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="rounded-2xl border border-black/10 bg-white p-8 space-y-5 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 text-sm font-bold">×</div>
                  <h3 className="text-xl font-heading font-semibold text-foreground">Generic Copilot</h3>
                </div>
                <ul className="space-y-3">
                  {genericTraits.map((t, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-secondary">
                      <span className="mt-1 h-4 w-4 flex-shrink-0 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center text-xs">–</span>
                      <span dangerouslySetInnerHTML={{ __html: t }} />
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
          </section>

          {/* ── 6. Vertical AI in production ── */}
          <section className="space-y-10">
            <motion.div {...fadeIn} className="space-y-2">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-secondary">Real-world deployments — 2025–2026</p>
              <h2 className="text-3xl md:text-4xl font-heading font-semibold leading-tight">
                What vertical AI looks like in production
              </h2>
              <p className="text-base text-secondary leading-[1.7] max-w-3xl">
                Not demos. Not pilots. Operational systems running at companies that decided to build vertical, domain-specific AI instead of deploying a generic assistant.
              </p>
            </motion.div>
            <div className="grid md:grid-cols-2 gap-6">
              {verticalExamples.map((ex, i) => (
                <motion.div
                  key={ex.title}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.4, ease: "easeOut" }}
                  className="rounded-2xl border border-black/5 bg-white p-7 shadow-sm space-y-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold uppercase tracking-[0.18em] text-secondary bg-slate-100 px-3 py-1 rounded-full">{ex.domain}</span>
                    <span className="text-xs text-secondary">{ex.status}</span>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-heading font-semibold text-foreground">{ex.title}</h3>
                    <p className="text-sm text-secondary leading-relaxed">{ex.description}</p>
                  </div>
                  <div className="rounded-xl bg-emerald-50 border border-emerald-100 px-4 py-3 space-y-1">
                    <p className="text-xs font-semibold text-emerald-700 uppercase tracking-wide">Outcome</p>
                    <p className="text-sm font-semibold text-emerald-900">{ex.outcome}</p>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {ex.tools.map((t) => (
                      <span key={t} className="text-xs bg-slate-100 text-slate-600 px-2.5 py-1 rounded-full font-medium">{t}</span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* ── 7. How to build vertical AI ── */}
          <section className="space-y-10">
            <motion.div {...fadeIn} className="space-y-2">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-secondary">How to build one</p>
              <h2 className="text-3xl md:text-4xl font-heading font-semibold leading-tight">
                Six steps to a production vertical AI system
              </h2>
            </motion.div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {buildSteps.map((step) => (
                <div key={step.n} className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm space-y-3 hover:border-emerald-200 transition-colors">
                  <div className="text-3xl font-heading font-bold text-emerald-200">{step.n}</div>
                  <h3 className="text-base font-semibold text-foreground">{step.title}</h3>
                  <p className="text-sm text-secondary leading-relaxed" dangerouslySetInnerHTML={{ __html: step.desc }} />
                </div>
              ))}
            </div>
          </section>

          {/* ── 8. AI Mindset — System View ── */}
          <motion.div {...fadeIn} className="rounded-3xl border border-black/5 bg-gradient-to-br from-white via-emerald-50/40 to-white p-10 shadow-sm space-y-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-secondary border border-black/5 shadow-sm w-fit">
                AI Mindset
              </div>
              <h2 className="text-3xl md:text-4xl font-heading font-semibold leading-tight">
                AI must be viewed as a system.
              </h2>
              <p className="text-base text-secondary leading-[1.7] max-w-4xl">
                AI should sit cleanly inside your operating system. Any AI tool should be able to drop into this model so you can govern it, connect it to real data and APIs, and compound gains instead of running isolated pilots.
              </p>
            </div>
            <SystemViewCard layoutId="home-system-view" variant="expanded" showDetailPanel={true} showCaption={true} showSubtitles={true} />
          </motion.div>

          {/* ── 9. What Works ── */}
          <motion.div {...fadeIn} className="rounded-3xl border border-black/5 bg-gradient-to-br from-white to-emerald-50/40 p-10 shadow-sm space-y-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-secondary border border-black/5 shadow-sm w-fit">
                What Works
              </div>
              <h2 className="text-3xl md:text-4xl font-heading font-semibold leading-tight">
                LLMs are AI. The system around them makes them compound.
              </h2>
              <p className="text-base text-secondary leading-[1.7] max-w-4xl">
                LLMs are the reasoning layer — our job is to wire them into our knowledge, tools, and flows so they execute real work. Connect them to your data, APIs, and schemas to get enterprise-grade outcomes instead of isolated demos.
              </p>
            </div>
            <div className="relative rounded-2xl border border-black/5 bg-white shadow-md overflow-hidden">
              <Image
                src="/what-works/evolution-arc.png"
                alt="AI evolution arc"
                width={1212}
                height={615}
                sizes="(max-width: 768px) 100vw, (max-width: 1440px) 80vw, 1400px"
                quality={95}
                priority
                className="w-full h-auto object-contain"
                style={{ objectPosition: "65% center" }}
              />
            </div>
          </motion.div>

          {/* ── 10. LLMs think. Agents act. ── */}
          <section className="space-y-10">
            <motion.div {...fadeIn} className="space-y-6 max-w-4xl">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-secondary">Agent architecture</p>
              <h2 className="text-4xl md:text-5xl font-heading font-bold leading-tight">
                LLMs think.<br />Agents act.
              </h2>
              <p className="text-xl text-secondary leading-relaxed">
                A language model responds to prompts. An AI agent uses tools, executes tasks, and operates autonomously within constraints you define. The gap between these two is the gap between &ldquo;impressive demo&rdquo; and &ldquo;operational leverage.&rdquo;
              </p>
            </motion.div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {[
                { title: "Tool access", desc: "The model can call external APIs, read files, run code, browse the web, query databases — and observe the results." },
                { title: "Memory", desc: "Short-term: the current context window. Long-term: a vector database with your domain knowledge and past agent outputs." },
                { title: "Planning", desc: "The ability to decompose a goal into steps, evaluate progress, and adapt when a step fails or produces unexpected results." },
                { title: "Autonomy within constraints", desc: "The agent operates independently on pre-defined tasks, stops at defined limits, and escalates when uncertainty exceeds threshold." },
              ].map((item) => (
                <div key={item.title} className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm space-y-3">
                  <div className="h-8 w-8 rounded-lg bg-emerald-100 flex items-center justify-center">
                    <span className="h-3 w-3 rounded-full bg-emerald-500" />
                  </div>
                  <h3 className="text-base font-semibold text-foreground">{item.title}</h3>
                  <p className="text-sm text-secondary leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ── 11. Five production patterns ── */}
          <section className="space-y-10">
            <motion.div {...fadeIn} className="space-y-2">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-secondary">Five production patterns</p>
              <h2 className="text-3xl md:text-4xl font-heading font-semibold leading-tight">
                How agents are actually built
              </h2>
              <p className="text-secondary leading-relaxed max-w-3xl">
                There is no single &ldquo;agentic architecture.&rdquo; These five patterns cover the vast majority of production use cases. Understanding them lets you pick the right one — and avoid over-engineering.
              </p>
            </motion.div>
            <div className="space-y-5">
              {agentPatterns.map((p, i) => (
                <motion.div
                  key={p.name}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.4, ease: "easeOut" }}
                  className="rounded-2xl border border-black/5 bg-white p-7 shadow-sm space-y-5"
                >
                  <div className="flex items-start gap-5">
                    <div className="flex-shrink-0 h-10 w-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-sm font-bold text-emerald-700">{p.n}</div>
                    <div className="space-y-2 flex-1">
                      <h3 className="text-lg font-heading font-semibold text-foreground">{p.name}</h3>
                      <p className="text-secondary leading-relaxed text-sm">{p.description}</p>
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4 pl-15">
                    <div className="rounded-xl bg-slate-50 border border-black/5 p-4 space-y-1">
                      <p className="text-xs font-semibold uppercase tracking-wide text-secondary">When to use</p>
                      <p className="text-sm text-foreground" dangerouslySetInnerHTML={{ __html: p.when }} />
                    </div>
                    <div className="rounded-xl bg-emerald-50 border border-emerald-100 p-4 space-y-1">
                      <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">Example</p>
                      <p className="text-sm text-foreground">{p.example}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* ── 12. Agent stack ── */}
          <section className="space-y-10">
            <motion.div {...fadeIn} className="space-y-2">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-secondary">Agent infrastructure</p>
              <h2 className="text-3xl md:text-4xl font-heading font-semibold leading-tight">
                What a production agent stack looks like in 2026
              </h2>
            </motion.div>
            <div className="overflow-x-auto rounded-2xl border border-black/5 bg-white shadow-sm">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-black/5 bg-slate-50/60">
                    <th className="text-left text-xs font-semibold uppercase tracking-[0.16em] text-secondary px-6 py-4">Layer</th>
                    <th className="text-left text-xs font-semibold uppercase tracking-[0.16em] text-secondary px-6 py-4">Role</th>
                    <th className="text-left text-xs font-semibold uppercase tracking-[0.16em] text-secondary px-6 py-4">2026 Options</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/5">
                  {agentStack.map((row) => (
                    <tr key={row.layer} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-4 text-sm font-semibold text-foreground whitespace-nowrap">{row.layer}</td>
                      <td className="px-6 py-4 text-sm text-secondary">{row.role}</td>
                      <td className="px-6 py-4 text-sm text-secondary">{row.examples}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* ── 13. Production failure modes ── */}
          <section className="space-y-10">
            <motion.div {...fadeIn} className="space-y-2">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-secondary">Production reality</p>
              <h2 className="text-3xl md:text-4xl font-heading font-semibold leading-tight">
                How agents fail in production — and how to prevent it
              </h2>
            </motion.div>
            <div className="grid md:grid-cols-2 gap-5">
              {productionFailures.map((f) => (
                <div key={f.failure} className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="h-2 w-2 rounded-full bg-red-400 flex-shrink-0" />
                    <h3 className="text-base font-semibold text-foreground">{f.failure}</h3>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-start gap-2">
                      <span className="text-secondary font-medium w-16 flex-shrink-0">Why:</span>
                      <p className="text-secondary leading-relaxed">{f.cause}</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-emerald-700 font-medium w-16 flex-shrink-0">Fix:</span>
                      <p className="text-foreground leading-relaxed">{f.fix}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ── 14. Benchmarks ── */}
          <section className="space-y-10">
            <motion.div {...fadeIn} className="space-y-2">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-secondary">How far we&apos;ve come</p>
              <h2 className="text-3xl md:text-4xl font-heading font-semibold leading-tight">
                Agent capability in 2026 vs. 2023
              </h2>
              <p className="text-secondary leading-relaxed max-w-3xl">
                The jump in agent capability from 2023 to 2026 is not incremental — it is a category change. Tasks that required human experts now run autonomously.
              </p>
            </motion.div>
            <div className="overflow-x-auto rounded-2xl border border-black/5 bg-white shadow-sm">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-black/5 bg-slate-50/60">
                    <th className="text-left text-xs font-semibold uppercase tracking-[0.16em] text-secondary px-6 py-4">Benchmark</th>
                    <th className="text-left text-xs font-semibold uppercase tracking-[0.16em] text-secondary px-6 py-4">2023</th>
                    <th className="text-left text-xs font-semibold uppercase tracking-[0.16em] text-secondary px-6 py-4">2026</th>
                    <th className="text-left text-xs font-semibold uppercase tracking-[0.16em] text-secondary px-6 py-4">What this means</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/5">
                  {benchmarks2026.map((b) => (
                    <tr key={b.name} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-4 text-sm font-semibold text-foreground" dangerouslySetInnerHTML={{ __html: b.name }} />
                      <td className="px-6 py-4 text-sm text-secondary">{b.score2023}</td>
                      <td className="px-6 py-4 text-sm font-semibold text-emerald-700">{b.score2026}</td>
                      <td className="px-6 py-4 text-sm text-secondary leading-relaxed">{b.meaning}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* ── 15. Operations impact ── */}
          <section className="space-y-10">
            <motion.div {...fadeIn} className="space-y-2">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-secondary">Operational impact — measured</p>
              <h2 className="text-3xl md:text-4xl font-heading font-semibold leading-tight">
                What AI is delivering in operations today
              </h2>
              <p className="text-secondary leading-relaxed max-w-3xl">
                Not projections. Outcomes being reported by companies that went past pilot stage in 2024–2025 and are now running AI in production operations.
              </p>
            </motion.div>
            <div className="space-y-4">
              {operationsImpact.map((row, i) => (
                <motion.div
                  key={row.function}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.4 }}
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

          {/* ── 16. Watch list ── */}
          <section className="space-y-10">
            <motion.div {...fadeIn} className="space-y-2">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-secondary">What to watch</p>
              <h2 className="text-3xl md:text-4xl font-heading font-semibold leading-tight">
                Five developments that will matter most
              </h2>
            </motion.div>
            <div className="grid md:grid-cols-2 gap-5">
              {watchList.map((w, i) => (
                <motion.div
                  key={w.name}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06 }}
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

          {/* ── 17. AI user vs AI operator ── */}
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

          {/* ── 18. CTA ── */}
          <section>
            <motion.div {...fadeIn} className="rounded-3xl border border-black/5 bg-white p-10 shadow-sm space-y-6">
              <h2 className="text-3xl md:text-4xl font-heading font-semibold leading-tight">
                Understanding comes before execution.
              </h2>
              <p className="text-base text-secondary leading-[1.7] max-w-3xl">
                Acting without a system view creates fragility. Acting with one creates leverage. Use this map to decide how far to go before you commit teams and budgets.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href="/ai-mindset"
                  className="inline-flex items-center justify-center rounded-xl bg-foreground px-5 py-3 text-sm font-semibold text-background shadow-sm transition hover:bg-foreground/90 focus:outline-none focus:ring-2 focus:ring-foreground focus:ring-offset-2"
                >
                  Start with the AI Mindset
                </Link>
                <Link
                  href="/execution-checklist"
                  className="inline-flex items-center justify-center rounded-xl border border-black/10 bg-white px-5 py-3 text-sm font-semibold text-foreground transition hover:border-foreground focus:outline-none focus:ring-2 focus:ring-foreground focus:ring-offset-2"
                >
                  Go to the Execution Checklist
                </Link>
              </div>
            </motion.div>
          </section>

        </div>
      </main>
    </div>
  );
}
