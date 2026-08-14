"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import Navigation from "./Navigation";
import SystemViewCard from "./ui/system-view-card";
import { AnimatedGradientText } from "./ui/animated-gradient-text";
import StatTile from "./charts/StatTile";
import RankedBarChart from "./charts/RankedBarChart";
import SlopeChart from "./charts/SlopeChart";
import { CATEGORICAL } from "./charts/tokens";
import { BENCHMARKS_2026, OPERATIONS_IMPACT } from "@/data/ai-now-2026";
import { NeuroNoise } from "@/components/ui/neuro-noise";
import {
  Zap, Brain, Network, Bot, TrendingUp, Shield, Eye,
  Layers, Target, Globe, CheckCircle, XCircle, AlertTriangle,
  BarChart2, Cpu, Database, GitBranch, Clock, Sparkles,
  ArrowRight, Building2, Rocket, FlaskConical, ChevronRight,
  Radio, Smartphone, Factory, BookOpen, Lock, Mic2, MessageSquare,
} from "lucide-react";

const fadeIn = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: "easeOut" },
};

// ── Data ──────────────────────────────────────────────────────────────────────

const majorShifts2026 = [
  { shift: "MCP becomes the standard", what: "Model Context Protocol, open-sourced by Anthropic in 2024, became the universal connector layer for AI tools in 2025–2026. 300+ connectors available. Every major AI tool now speaks MCP.", impact: "Infrastructure", icon: Network, color: "emerald" },
  { shift: "Agentic systems replace copilots", what: "The market shifted from AI that assists to AI that acts. Claude Code, Cursor, Devin, and multi-agent frameworks (n8n, LangGraph, CrewAI) power end-to-end business processes without human intervention at each step.", impact: "Workflow", icon: Bot, color: "violet" },
  { shift: "On-device AI goes mainstream", what: "Apple Intelligence, Qualcomm Snapdragon X Elite NPUs, and Samsung Galaxy AI bring capable models to personal devices. Privacy-preserving AI becomes the default for personal use.", impact: "Privacy", icon: Smartphone, color: "blue" },
  { shift: "Physical AI arrives", what: "Figure 02, Apptronik Apollo, and Tesla Optimus begin limited commercial deployment — reasoning models in robot bodies. Industrial AI shifts from software-only to embodied.", impact: "Physical", icon: Factory, color: "orange" },
  { shift: "Reasoning models change the ceiling", what: "OpenAI o3, Anthropic extended thinking, and Google Gemini Thinking show that thinking before answering dramatically changes what AI can solve. PhD-level science becomes single-agent tasks.", impact: "Capability", icon: Brain, color: "indigo" },
  { shift: "Open source closes the gap", what: "DeepSeek R1 matched GPT-4 performance at open-source cost. The cost of deploying frontier-quality AI dropped 95% between 2023 and 2026. Advanced AI is now accessible to anyone.", impact: "Accessibility", icon: Rocket, color: "teal" },
  { shift: "Knowledge externalization as strategy", what: "The most effective AI practitioners treat their knowledge as structured infrastructure. Obsidian + MCP, Notion databases, and personal vector stores become standard professional tools.", impact: "Personal", icon: BookOpen, color: "pink" },
];

const colorMap: Record<string, { bg: string; text: string; border: string; badge: string }> = {
  emerald: { bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200", badge: "bg-emerald-100 text-emerald-700" },
  violet:  { bg: "bg-violet-50",  text: "text-violet-700",  border: "border-violet-200",  badge: "bg-violet-100 text-violet-700" },
  blue:    { bg: "bg-blue-50",    text: "text-blue-700",    border: "border-blue-200",    badge: "bg-blue-100 text-blue-700" },
  orange:  { bg: "bg-orange-50",  text: "text-orange-700",  border: "border-orange-200",  badge: "bg-orange-100 text-orange-700" },
  indigo:  { bg: "bg-indigo-50",  text: "text-indigo-700",  border: "border-indigo-200",  badge: "bg-indigo-100 text-indigo-700" },
  teal:    { bg: "bg-teal-50",    text: "text-teal-700",    border: "border-teal-200",    badge: "bg-teal-100 text-teal-700" },
  pink:    { bg: "bg-pink-50",    text: "text-pink-700",    border: "border-pink-200",    badge: "bg-pink-100 text-pink-700" },
  red:     { bg: "bg-red-50",     text: "text-red-700",     border: "border-red-200",     badge: "bg-red-100 text-red-700" },
};

const models2026 = [
  { org: "Anthropic", color: "emerald", models: [
    { name: "Claude Fable 5", tier: "Frontier", strength: "Most capable — complex reasoning, long-form analysis, agentic workflows" },
    { name: "Claude Opus 4.8", tier: "Expert", strength: "Deep reasoning, coding, multi-step planning. Best for technical depth." },
    { name: "Claude Sonnet 4.6", tier: "Default", strength: "The 80/20 model — excellent quality at production speed and cost" },
    { name: "Claude Haiku 4.5", tier: "Fast", strength: "Sub-second responses, low cost. Classification, routing, summarization." },
  ]},
  { org: "OpenAI", color: "blue", models: [
    { name: "GPT-5", tier: "Frontier", strength: "Multimodal, tool-use, long context. Strong on structured reasoning." },
    { name: "o3 / o4", tier: "Reasoning", strength: "Thinks before it answers. Best for math, science, and complex logic." },
    { name: "GPT-4o mini", tier: "Fast", strength: "Low-cost, fast — widely deployed in consumer applications." },
  ]},
  { org: "Google", color: "indigo", models: [
    { name: "Gemini 2.5 Ultra", tier: "Frontier", strength: "1M+ token context window. Best for processing entire codebases or document sets." },
    { name: "Gemini 2.5 Flash", tier: "Fast", strength: "Speed-optimized, highly cost-effective for high-volume tasks." },
  ]},
  { org: "Open Source", color: "teal", models: [
    { name: "Llama 4 (Meta)", tier: "Open", strength: "Multimodal, runs locally. Changed the economics of private deployment." },
    { name: "DeepSeek R2", tier: "Open", strength: "Frontier-level reasoning at open-source cost. Shocked the market in 2025." },
    { name: "Mistral Large", tier: "Open", strength: "European alternative, strong multilingual capabilities." },
  ]},
];

const tierColors: Record<string, string> = {
  Frontier: "bg-yellow-100 text-yellow-800 border border-yellow-200",
  Expert: "bg-purple-100 text-purple-800 border border-purple-200",
  Default: "bg-emerald-100 text-emerald-800 border border-emerald-200",
  Fast: "bg-blue-100 text-blue-800 border border-blue-200",
  Reasoning: "bg-indigo-100 text-indigo-800 border border-indigo-200",
  Open: "bg-teal-100 text-teal-800 border border-teal-200",
};

const genericTraits = [
  "General knowledge, no domain depth",
  "Separate interface — not embedded in workflows",
  "Provides suggestions — human executes",
  "Low adoption: users can't verify outputs",
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
  { domain: "Operations", icon: Building2, color: "emerald", title: "AI Operations Director", description: "Knows production schedules, supplier lead times, and KPI targets. Monitors dashboards 24/7, surfaces exceptions before humans notice, and integrates with ERP to adjust purchase orders within defined rules.", outcome: "30–40% reduction in exception management time", tools: ["Claude Sonnet 4.6", "Airtable MCP", "SAP connector", "Slack alerts"], status: "Production — 2026" },
  { domain: "Supply Chain", icon: GitBranch, color: "blue", title: "Demand Forecast Agent", description: "Ingests sales data, weather events, competitor launches, and macro trends. Outputs weekly demand adjustments with confidence intervals and drafts POs for human approval.", outcome: "15–25% improvement in inventory accuracy", tools: ["GPT-5 / Claude Opus", "Vector DB", "ERP API", "Power BI"], status: "Fortune 500, 2025–2026" },
  { domain: "Customer Support", icon: Mic2, color: "violet", title: "Tier-1 Resolution Agent", description: "Accesses order history, product docs, and warranty policies. Resolves 70% of cases autonomously. Escalates with full context when human judgment is needed.", outcome: "70% deflection rate, CSAT +18 points", tools: ["Relevance AI", "Zendesk MCP", "RAG", "Claude Haiku"], status: "Widely deployed — 2024–2026" },
  { domain: "Finance", icon: BarChart2, color: "indigo", title: "Month-End Close Agent", description: "Ingests GL entries, reconciles discrepancies against prior months and budgets, flags anomalies, and drafts the variance commentary for the CFO report. 3 days → hours.", outcome: "40–60% reduction in close cycle time", tools: ["Claude Opus 4.8", "NetSuite API", "Excel MCP", "Notion"], status: "Early production — 2025–2026" },
  { domain: "Legal", icon: Lock, color: "teal", title: "Contract Review Agent", description: "Knows your standard terms, red-line policies, and jurisdiction-specific clauses. Flags high-risk provisions, suggests pre-approved alternatives, and drafts negotiation memos.", outcome: "50%+ reduction in outside counsel hours", tools: ["Claude Opus 4.8", "Google Drive MCP", "Vector DB", "Docusign"], status: "Top 50 law firms — 2025–2026" },
  { domain: "Marketing", icon: Radio, color: "pink", title: "Brand Voice Agent", description: "Trained on your brand guidelines, audience personas, and top-performing content. Drafts posts, emails, and product descriptions in your voice. Schedules and reports performance.", outcome: "5x content throughput at 80% brand compliance", tools: ["Claude Sonnet 4.6", "Playwright MCP", "Airtable", "Relevance AI"], status: "AI-first teams — 2025–2026" },
];

const buildSteps = [
  { n: "01", title: "Define the domain boundary", desc: "What does this agent know and not know? Where does human judgment still belong? Draw a line.", icon: Target },
  { n: "02", title: "Assemble the knowledge base", desc: "Internal docs, process guides, historical decisions — these become the agent's domain memory via a vector database.", icon: Database },
  { n: "03", title: "Wire the tools (MCP)", desc: "Connect the agent to the systems where actions live: CRM, ERP, calendar, file store, APIs. MCP is now the standard connector layer.", icon: Network },
  { n: "04", title: "Define the output contract", desc: "Decisions vs. recommendations vs. actions vs. alerts — be explicit about what the agent outputs and who approves what.", icon: Layers },
  { n: "05", title: "Add human-in-the-loop checkpoints", desc: "High-stakes actions get a human gate. Define the threshold: what can the agent do autonomously, what requires approval?", icon: Shield },
  { n: "06", title: "Instrument and observe", desc: "Log every agent action, decision, and output. Review weekly. The agent improves when you can see where it drifts.", icon: Eye },
];

const agentPatterns = [
  { n: "01", name: "ReAct (Reason + Act)", icon: Brain, color: "emerald", description: "The agent alternates between reasoning about a problem and taking an action. Observes the result of each action before deciding the next step.", when: "When the path to a solution isn't known upfront and the agent must discover it by doing.", example: "Research agent: searches the web, reads results, decides what to search next, writes a summary." },
  { n: "02", name: "Plan-and-Execute", icon: Layers, color: "blue", description: "A planning model generates a full step-by-step plan first. An execution model carries out each step. Separates strategic reasoning from tactical action.", when: "When the workflow has known structure but requires AI reasoning at each step.", example: "Month-end close agent: plans the entire reconciliation sequence, then executes step by step." },
  { n: "03", name: "Multi-Agent (Orchestrator + Specialists)", icon: GitBranch, color: "violet", description: "One orchestrator agent decomposes a complex task and delegates subtasks to specialized agents. Each specialist is optimized for its domain.", when: "When a task requires multiple domains of expertise, parallel execution, or very long context.", example: "Proposal agent: orchestrator delegates market research, pricing analysis, and writing to three specialists." },
  { n: "04", name: "MCP-Connected (Tool Execution)", icon: Network, color: "indigo", description: "The agent has direct access to external tools via Model Context Protocol — databases, APIs, file systems, calendars, communication tools. It acts in the real world.", when: "When the agent must read from or write to production systems as part of its work.", example: "LinkedIn content agent: drafts post → publishes via Playwright → logs performance in Airtable → reports back." },
  { n: "05", name: "Human-in-the-Loop", icon: Shield, color: "teal", description: "The agent completes analysis and proposes an action, then pauses for human approval before executing. Critical for high-stakes, irreversible, or high-cost decisions.", when: "When the consequences of an error are significant — financial, legal, operational.", example: "Procurement agent: recommends a purchase order → human approves → agent submits to ERP." },
];

const agentStack = [
  { layer: "Model", icon: Brain, role: "Reasoning engine", examples: "Claude Sonnet 4.6, Claude Opus 4.8, GPT-5, Gemini 2.5", color: "violet" },
  { layer: "Memory", icon: Database, role: "Short-term context + long-term retrieval", examples: "Context window + Qdrant / Pinecone / pgvector", color: "blue" },
  { layer: "Tools (MCP)", icon: Network, role: "Actions the agent can take", examples: "APIs, file systems, browsers, databases, email, calendar", color: "emerald" },
  { layer: "Orchestration", icon: GitBranch, role: "Controls task flow, retries, handoffs", examples: "n8n, LangGraph, CrewAI, Claude Code, Relevance AI", color: "indigo" },
  { layer: "Guardrails", icon: Shield, role: "Prevents unsafe or incorrect outputs", examples: "Schema validation, human checkpoints, step limits, confidence thresholds", color: "teal" },
  { layer: "Observability", icon: Eye, role: "Full audit trail of every action and decision", examples: "LangSmith, custom logging, Sentry, PostHog", color: "orange" },
];

const productionFailures = [
  { failure: "Hallucination without guardrails", cause: "Agent invents facts, especially in long reasoning chains", fix: "Add retrieval (RAG) for factual claims. Validate outputs against schemas." },
  { failure: "Tool call loops", cause: "Agent gets stuck calling the same tool repeatedly without progress", fix: "Implement step limits and loop detection. Add explicit termination conditions." },
  { failure: "Context overflow", cause: "Long agent runs fill the context window; early instructions are forgotten", fix: "Compress intermediate results. Use summarization agents." },
  { failure: "No observability", cause: "Agent acts but no one can audit what it did or why", fix: "Log every tool call, reasoning step, and output. Treat agent traces like production logs." },
  { failure: "Cascading errors", cause: "A wrong decision early in the chain propagates through all downstream steps", fix: "Add validation checkpoints between steps. Use human gates at high-stakes branch points." },
  { failure: "Permission creep", cause: "Agent is given too many tools just in case, then uses them incorrectly", fix: "Grant minimum viable permissions. Define explicit tool scope at deployment time." },
];

const watchList = [
  { name: "Reasoning-native workflows", desc: "As o3-level reasoning becomes standard, AI shifts from completing tasks to solving problems. Organizations that redesign workflows around reasoning agents will have a structural advantage.", horizon: "Now — 2027", icon: Brain },
  { name: "AI memory infrastructure", desc: "Persistent, evolving AI memory (personal knowledge graphs, organizational memory) is the next foundation layer. Obsidian + MCP is the early pattern. Enterprise versions are being built.", horizon: "2026 — 2028", icon: Database },
  { name: "Physical-digital AI integration", desc: "Reasoning models that operate robots and physical systems will transform manufacturing, logistics, and field operations. The same model that drafts your strategy memo will eventually operate your warehouse.", horizon: "2026 — 2030", icon: Factory },
  { name: "AI governance as infrastructure", desc: "The EU AI Act is live. US framework is developing. Organizations without AI governance infrastructure face regulatory and reputational exposure. Governance is no longer optional.", horizon: "Now", icon: Shield },
  { name: "Multi-modal as default", desc: "Text-only AI is already an edge case. Voice, image, video, and code are native inputs for 2026 frontier models. The next wave of vertical AI will be built for multi-modal operations.", horizon: "Now — 2027", icon: Mic2 },
];

// ── Section header component ──────────────────────────────────────────────────

function SectionBadge({ label, color = "emerald" }: { label: string; color?: string }) {
  const c = colorMap[color] ?? colorMap.emerald;
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] border ${c.bg} ${c.text} ${c.border}`}>
      {label}
    </span>
  );
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function Home() {
  return (
    <div className="min-h-screen bg-[#f8faf9] text-foreground">
      <Navigation />

      <main className="pt-28 pb-32">
        <div className="max-w-6xl mx-auto px-6 lg:px-10 space-y-32">

          {/* ── 1. HERO ── */}
          <section>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="relative overflow-hidden rounded-3xl border border-emerald-100 shadow-xl"
            >
              {/* Ambient shader background — same NeuroNoise treatment as the
                  closing CTA, so the page opens and closes on the same
                  animated "system" motif instead of a flat gradient. Replaces
                  the old static gradient + grid-texture + blur blobs, which
                  would otherwise fight the shader's own movement. */}
              <NeuroNoise
                className="pointer-events-none absolute inset-0 -z-10 h-full w-full"
                colorFront="#0E7A68"
                colorMid="#9FE3D5"
                colorBack="#F4F3F5"
                brightness={0.45}
                contrast={0.35}
                speed={0.3}
                scale={1.4}
              />
              <div className="pointer-events-none absolute inset-0 -z-10 bg-white/60" aria-hidden />

              <div className="relative px-8 py-14 lg:px-14 lg:py-20 space-y-10">
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="inline-flex items-center gap-2 rounded-full bg-emerald-100 border border-emerald-200 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    AI Operating Map
                  </span>
                  <span className="text-xs text-secondary font-medium">Updated August 2026</span>
                </div>

                <div className="space-y-5 max-w-3xl">
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold leading-[1.1] text-foreground">
                    AI is not a product.<br />
                    <AnimatedGradientText className="font-bold">It is the reasoning layer</AnimatedGradientText><br />
                    inside your system.
                  </h1>
                  <p className="text-lg text-secondary leading-relaxed max-w-2xl">
                    A complete reference for operations professionals navigating AI in 2026 — from model landscape to agent architecture to production results.
                  </p>
                </div>

                {/* Stats row */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { stat: "95%", label: "of GenAI pilots fail to scale" },
                    { stat: "300+", label: "MCP connectors available" },
                    { stat: "5–10×", label: "leverage for AI operators" },
                    { stat: "2026", label: "the year agents went to production" },
                  ].map((s, i) => (
                    <StatTile
                      key={s.stat}
                      label={s.label}
                      value={s.stat}
                      accentColor={CATEGORICAL[i % CATEGORICAL.length]}
                    />
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <Link href="/ai-mindset" className="inline-flex items-center gap-2 justify-center rounded-xl bg-emerald-500 hover:bg-emerald-400 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-500/30 transition">
                    Start with the AI Mindset <ArrowRight size={16} />
                  </Link>
                  <Link href="/execution-checklist" className="inline-flex items-center gap-2 justify-center rounded-xl border border-black/10 bg-white hover:bg-slate-50 px-6 py-3 text-sm font-semibold text-foreground shadow-sm transition">
                    Execution Checklist <ChevronRight size={16} />
                  </Link>
                </div>
              </div>
            </motion.div>
          </section>

          {/* ── 2. SEVEN SHIFTS ── */}
          <section className="space-y-10">
            <motion.div {...fadeIn} className="space-y-3">
              <SectionBadge label="AI Today — July 2026" color="emerald" />
              <h2 className="text-3xl md:text-4xl font-heading font-bold leading-tight">
                Seven shifts that changed everything
              </h2>
              <p className="text-base text-secondary leading-relaxed max-w-3xl">
                Not the hype. Not the demos. The operational reality of AI in 2026 — what happened between 2024 and now.
              </p>
            </motion.div>
            <div className="grid md:grid-cols-2 gap-4">
              {majorShifts2026.map((s, i) => {
                const c = colorMap[s.color];
                const Icon = s.icon;
                return (
                  <motion.div
                    key={s.shift}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.4 }}
                    className={`rounded-2xl border ${c.border} ${c.bg} p-6 space-y-3`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`h-9 w-9 rounded-xl flex items-center justify-center ${c.bg} border ${c.border}`}>
                        <Icon size={18} className={c.text} />
                      </div>
                      <span className={`text-xs font-semibold uppercase tracking-wide ${c.text}`}>{s.impact}</span>
                    </div>
                    <h3 className="text-base font-semibold text-foreground">{s.shift}</h3>
                    <p className="text-sm text-secondary leading-relaxed">{s.what}</p>
                  </motion.div>
                );
              })}
            </div>
          </section>

          {/* ── 3. MODEL LANDSCAPE ── */}
          <section className="space-y-10">
            <motion.div {...fadeIn} className="space-y-3">
              <SectionBadge label="Model Landscape 2026" color="indigo" />
              <h2 className="text-3xl md:text-4xl font-heading font-bold leading-tight">
                Which models matter — and why
              </h2>
              <p className="text-base text-secondary leading-relaxed max-w-3xl">
                The market has bifurcated: frontier models for deep reasoning, fast/cheap models for high-volume tasks. Match the model to the task — not to what&apos;s newest.
              </p>
            </motion.div>
            <div className="grid lg:grid-cols-2 gap-6">
              {models2026.map((org) => {
                const c = colorMap[org.color];
                return (
                  <div key={org.org} className={`hover-glow rounded-2xl border ${c.border} bg-white shadow-sm overflow-hidden`}>
                    <div className={`px-5 py-3 ${c.bg} border-b ${c.border}`}>
                      <h3 className={`text-sm font-bold uppercase tracking-[0.18em] ${c.text}`}>{org.org}</h3>
                    </div>
                    <div className="divide-y divide-black/5">
                      {org.models.map((m) => (
                        <div key={m.name} className="px-5 py-4 flex items-start justify-between gap-4 hover:bg-slate-50/60 transition-colors">
                          <div className="space-y-0.5 flex-1">
                            <div className="text-sm font-semibold text-foreground">{m.name}</div>
                            <div className="text-xs text-secondary leading-relaxed">{m.strength}</div>
                          </div>
                          <span className={`flex-shrink-0 text-xs font-semibold px-2.5 py-0.5 rounded-full ${tierColors[m.tier] ?? "bg-slate-100 text-slate-600"}`}>{m.tier}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="rounded-2xl border border-black/5 bg-white p-6 flex items-start gap-4 shadow-sm">
              <div className="h-10 w-10 rounded-xl bg-yellow-50 border border-yellow-200 flex items-center justify-center flex-shrink-0">
                <Zap size={20} className="text-yellow-600" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground mb-1">The 2026 rule of thumb</p>
                <p className="text-sm text-secondary leading-relaxed">Use Haiku/Flash/mini for classification, routing, and summarization. Use Sonnet/GPT-4o for standard production tasks. Use Opus/GPT-5/Gemini Ultra for complex reasoning. Use o3/extended-thinking when depth matters more than speed.</p>
              </div>
            </div>
          </section>

          {/* ── 4. MARKET REALITY ── */}
          <section>
            <motion.div
              {...fadeIn}
              className="relative overflow-hidden rounded-3xl border border-rose-100 bg-gradient-to-br from-rose-50 to-orange-50 p-10 lg:p-14 shadow-sm space-y-8"
            >
              <div className="space-y-3">
                <SectionBadge label="Market Reality" color="orange" />
                <div className="flex items-end gap-4 flex-wrap">
                  <div className="text-7xl md:text-8xl font-heading font-black text-rose-500 leading-none">95%</div>
                  <div className="space-y-1 pb-2">
                    <p className="text-2xl font-heading font-bold text-foreground">of GenAI pilots fail to scale.</p>
                    <p className="text-secondary">The gap between &ldquo;demo&rdquo; and &ldquo;production&rdquo; is structural, not technical.</p>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { id: "01", title: "Expectations", body: "Unrealistic assumptions about what AI can deliver without proper data foundations and integration.", icon: AlertTriangle, color: "orange" },
                  { id: "02", title: "Data", body: "Weak data foundations: messy, siloed, or incomplete data. 60–70% of AI use cases fail at the data layer.", icon: Database, color: "rose" as string },
                  { id: "03", title: "Wrong mindset", body: "Horizontal thinking: building generic AI that tries to do everything instead of vertical, domain-specific solutions.", icon: Globe, color: "rose" as string },
                ].map((r) => (
                  <div key={r.id} className="hover-glow bg-white/70 rounded-2xl border border-rose-100 p-6 space-y-3 shadow-sm">
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-xl bg-rose-50 border border-rose-200 flex items-center justify-center">
                        <r.icon size={18} className="text-rose-600" />
                      </div>
                      <span className="text-xs font-bold text-rose-600 uppercase tracking-wide">{r.id}</span>
                    </div>
                    <p className="text-base font-semibold text-foreground">{r.title}</p>
                    <p className="text-sm text-secondary leading-relaxed">{r.body}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </section>

          {/* ── 5. GENERIC vs VERTICAL AI ── */}
          <section className="space-y-10">
            <motion.div {...fadeIn} className="space-y-3">
              <SectionBadge label="Vertical AI" color="teal" />
              <h2 className="text-3xl md:text-4xl font-heading font-bold leading-tight">
                Generic AI helps.<br />Vertical AI compounds.
              </h2>
              <p className="text-base text-secondary leading-relaxed max-w-3xl">
                A generic AI assistant knows everything about the world and nothing about your company. A vertical AI system knows your domain, your data, and your workflows — and it gets smarter every time it runs.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Generic */}
              <div className="rounded-2xl border border-slate-200 bg-white p-8 space-y-5 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-slate-100 flex items-center justify-center">
                    <Globe size={20} className="text-slate-500" />
                  </div>
                  <h3 className="text-xl font-heading font-semibold text-foreground">Generic Copilot</h3>
                </div>
                <ul className="space-y-3">
                  {genericTraits.map((t, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <XCircle size={16} className="text-slate-300 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-secondary">{t}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Vertical */}
              <div className="rounded-2xl border border-emerald-200 bg-gradient-to-br from-emerald-50/80 to-white p-8 space-y-5 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-emerald-100 border border-emerald-200 flex items-center justify-center">
                    <Target size={20} className="text-emerald-700" />
                  </div>
                  <h3 className="text-xl font-heading font-semibold text-foreground">Vertical AI System</h3>
                </div>
                <ul className="space-y-3">
                  {verticalTraits.map((t) => (
                    <li key={t} className="flex items-start gap-3">
                      <CheckCircle size={16} className="text-emerald-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-foreground">{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6 flex items-start gap-4 shadow-sm">
              <AlertTriangle size={22} className="text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-amber-800 mb-1">The compounding gap</p>
                <p className="text-sm text-amber-900/80 leading-relaxed">Generic AI keeps everyone at the same level. Vertical AI built on your data creates an advantage that competitors cannot replicate — because they don&apos;t have your data, your domain knowledge, or your operational history.</p>
              </div>
            </div>
          </section>

          {/* ── 6. PRODUCTION EXAMPLES ── */}
          <section id="vertical-ai-examples" className="space-y-10 scroll-mt-28">
            <motion.div {...fadeIn} className="space-y-3">
              <SectionBadge label="Real-world deployments — 2025–2026" color="violet" />
              <h2 className="text-3xl md:text-4xl font-heading font-bold leading-tight">
                What vertical AI looks like in production
              </h2>
              <p className="text-base text-secondary leading-relaxed max-w-3xl">
                Not demos. Not pilots. Operational systems running at companies that decided to build vertical, domain-specific AI.
              </p>
            </motion.div>
            <div className="grid md:grid-cols-2 gap-5">
              {verticalExamples.map((ex, i) => {
                const c = colorMap[ex.color];
                const Icon = ex.icon;
                return (
                  <motion.div
                    key={ex.title}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.06, duration: 0.4 }}
                    className="rounded-2xl border border-black/5 bg-white p-7 shadow-sm space-y-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className={`h-8 w-8 rounded-lg flex items-center justify-center ${c.bg} border ${c.border}`}>
                          <Icon size={16} className={c.text} />
                        </div>
                        <span className={`text-xs font-semibold uppercase tracking-wide ${c.text}`}>{ex.domain}</span>
                      </div>
                      <span className="text-xs text-secondary">{ex.status}</span>
                    </div>
                    <div className="space-y-1.5">
                      <h3 className="text-base font-semibold text-foreground">{ex.title}</h3>
                      <p className="text-sm text-secondary leading-relaxed">{ex.description}</p>
                    </div>
                    <div className={`rounded-xl ${c.bg} border ${c.border} px-4 py-3`}>
                      <p className={`text-xs font-semibold uppercase tracking-wide ${c.text} mb-0.5`}>Outcome</p>
                      <p className={`text-sm font-semibold ${c.text}`}>{ex.outcome}</p>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {ex.tools.map((t) => (
                        <span key={t} className="text-xs bg-slate-100 text-slate-600 px-2.5 py-1 rounded-full font-medium">{t}</span>
                      ))}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </section>

          {/* ── 7. HOW TO BUILD ── */}
          <section className="space-y-10">
            <motion.div {...fadeIn} className="space-y-3">
              <SectionBadge label="How to build one" color="emerald" />
              <h2 className="text-3xl md:text-4xl font-heading font-bold leading-tight">
                Six steps to a production vertical AI system
              </h2>
            </motion.div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {buildSteps.map((step, i) => {
                const Icon = step.icon;
                return (
                  <motion.div
                    key={step.n}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.06 }}
                    className="group rounded-2xl border border-black/5 bg-white p-6 shadow-sm space-y-4 hover:border-emerald-200 hover:shadow-md transition-all"
                  >
                    <div className="flex items-start justify-between">
                      <div className="h-10 w-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center group-hover:bg-emerald-100 transition-colors">
                        <Icon size={20} className="text-emerald-600" />
                      </div>
                      <span className="text-3xl font-heading font-black text-emerald-100 group-hover:text-emerald-200 transition-colors leading-none">{step.n}</span>
                    </div>
                    <h3 className="text-sm font-semibold text-foreground">{step.title}</h3>
                    <p className="text-sm text-secondary leading-relaxed">{step.desc}</p>
                  </motion.div>
                );
              })}
            </div>
          </section>

          {/* ── 8. AI MINDSET ── */}
          <motion.div
            {...fadeIn}
            className="rounded-3xl border border-black/5 bg-white p-10 lg:p-14 shadow-sm space-y-6"
          >
            <div className="space-y-3">
              <SectionBadge label="AI Mindset" color="violet" />
              <h2 className="text-3xl md:text-4xl font-heading font-bold leading-tight">
                AI must be viewed as a system.
              </h2>
              <p className="text-base text-secondary leading-relaxed max-w-4xl">
                AI should sit cleanly inside your operating system. Any AI tool should be able to drop into this model so you can govern it, connect it to real data and APIs, and compound gains instead of running isolated pilots.
              </p>
            </div>
            <SystemViewCard layoutId="home-system-view" variant="expanded" showDetailPanel={true} showCaption={true} showSubtitles={true} />
          </motion.div>

          {/* ── 9. WHAT WORKS TODAY ── */}
          <motion.div {...fadeIn} className="rounded-3xl border border-black/5 bg-gradient-to-br from-emerald-50/40 to-white p-10 shadow-sm space-y-6">
            <div className="space-y-3">
              <SectionBadge label="What Works Today" color="emerald" />
              <h2 className="text-3xl md:text-4xl font-heading font-bold leading-tight">
                LLMs are AI. The system around them makes them compound.
              </h2>
              <p className="text-base text-secondary leading-relaxed max-w-4xl">
                LLMs are the reasoning layer — our job is to wire them into our knowledge, tools, and flows so they execute real work. Four stages, one progression: LLM → Assistant → AI Agent → Agentic System.
              </p>
            </div>
            <Link
              href="/what-works"
              className="grid grid-cols-2 md:grid-cols-4 gap-3 rounded-2xl border border-black/5 bg-white shadow-md p-5 hover:shadow-lg transition-shadow"
            >
              {[
                { name: "LLMs", year: "2022", icon: Cpu, bg: "bg-foreground", text: "text-white" },
                { name: "Assistants", year: "2022", icon: MessageSquare, bg: "bg-emerald-700", text: "text-white" },
                { name: "AI Agents", year: "2023", icon: Bot, bg: "bg-emerald-500", text: "text-white" },
                { name: "Agentic Systems", year: "2024", icon: Network, bg: "bg-emerald-200", text: "text-emerald-950" },
              ].map((s) => {
                const Icon = s.icon;
                return (
                  <div key={s.name} className="flex flex-col items-center text-center gap-2 py-2">
                    <div className={`h-12 w-12 rounded-xl flex items-center justify-center ${s.bg}`}>
                      <Icon size={22} className={s.text} strokeWidth={1.75} />
                    </div>
                    <div className="text-[10px] font-semibold uppercase tracking-wide text-secondary">{s.year}</div>
                    <div className="text-sm font-heading font-semibold text-foreground">{s.name}</div>
                  </div>
                );
              })}
            </Link>
          </motion.div>

          {/* ── 10. AGENTS ── */}
          <section className="space-y-10">
            <motion.div
              {...fadeIn}
              className="relative overflow-hidden rounded-3xl border border-violet-100 p-10 lg:p-14 space-y-6"
              style={{ background: "linear-gradient(135deg, #f5f3ff 0%, #ffffff 100%)" }}
            >
              <div className="pointer-events-none absolute top-0 right-0 w-80 h-80 rounded-full bg-violet-300/20 blur-3xl" aria-hidden />
              <SectionBadge label="Agent Architecture" color="violet" />
              <div className="space-y-4 max-w-3xl relative">
                <h2 className="text-4xl md:text-5xl font-heading font-black leading-tight text-foreground">
                  LLMs think.<br /><span className="text-violet-600">Agents act.</span>
                </h2>
                <p className="text-secondary leading-relaxed text-lg">
                  A language model responds to prompts. An AI agent uses tools, executes tasks, and operates autonomously. The gap between these two is the gap between &ldquo;impressive demo&rdquo; and &ldquo;operational leverage.&rdquo;
                </p>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 relative">
                {[
                  { title: "Tool access", desc: "Calls external APIs, reads files, runs code, browses the web, queries databases.", icon: Network },
                  { title: "Memory", desc: "Short-term: the context window. Long-term: a vector database with domain knowledge.", icon: Database },
                  { title: "Planning", desc: "Decomposes a goal into steps, evaluates progress, adapts when a step fails.", icon: Layers },
                  { title: "Autonomy within constraints", desc: "Operates independently on pre-defined tasks, stops at defined limits, escalates when uncertain.", icon: Shield },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.title} className="rounded-xl border border-black/5 bg-white shadow-sm p-5 space-y-3 hover:shadow-md transition-shadow">
                      <div className="h-8 w-8 rounded-lg bg-violet-50 border border-violet-200 flex items-center justify-center">
                        <Icon size={16} className="text-violet-700" />
                      </div>
                      <h3 className="text-sm font-semibold text-foreground">{item.title}</h3>
                      <p className="text-xs text-secondary leading-relaxed">{item.desc}</p>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </section>

          {/* ── 11. FIVE PATTERNS ── */}
          <section className="space-y-10">
            <motion.div {...fadeIn} className="space-y-3">
              <SectionBadge label="Five production patterns" color="violet" />
              <h2 className="text-3xl md:text-4xl font-heading font-bold leading-tight">
                How agents are actually built
              </h2>
              <p className="text-secondary leading-relaxed max-w-3xl">
                There is no single &ldquo;agentic architecture.&rdquo; These five patterns cover the vast majority of production use cases.
              </p>
            </motion.div>
            <div className="space-y-4">
              {agentPatterns.map((p, i) => {
                const c = colorMap[p.color];
                const Icon = p.icon;
                return (
                  <motion.div
                    key={p.name}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06, duration: 0.4 }}
                    className="rounded-2xl border border-black/5 bg-white p-7 shadow-sm space-y-5"
                  >
                    <div className="flex items-start gap-5">
                      <div className={`flex-shrink-0 h-11 w-11 rounded-xl flex items-center justify-center ${c.bg} border ${c.border}`}>
                        <Icon size={20} className={c.text} />
                      </div>
                      <div className="space-y-1.5 flex-1">
                        <div className="flex items-center gap-3">
                          <span className={`text-xs font-bold ${c.text}`}>{p.n}</span>
                          <h3 className="text-base font-semibold text-foreground">{p.name}</h3>
                        </div>
                        <p className="text-sm text-secondary leading-relaxed">{p.description}</p>
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4 pl-16">
                      <div className="rounded-xl bg-slate-50 border border-black/5 p-4 space-y-1.5">
                        <p className="text-xs font-semibold uppercase tracking-wide text-secondary">When to use</p>
                        <p className="text-sm text-foreground leading-relaxed">{p.when}</p>
                      </div>
                      <div className={`rounded-xl ${c.bg} border ${c.border} p-4 space-y-1.5`}>
                        <p className={`text-xs font-semibold uppercase tracking-wide ${c.text}`}>Example</p>
                        <p className="text-sm text-foreground leading-relaxed">{p.example}</p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </section>

          {/* ── 12. AGENT STACK ── */}
          <section className="space-y-10">
            <motion.div {...fadeIn} className="space-y-3">
              <SectionBadge label="Agent infrastructure" color="indigo" />
              <h2 className="text-3xl md:text-4xl font-heading font-bold leading-tight">
                Production agent stack in 2026
              </h2>
            </motion.div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {agentStack.map((row) => {
                const c = colorMap[row.color];
                const Icon = row.icon;
                return (
                  <div key={row.layer} className={`hover-glow rounded-2xl border ${c.border} ${c.bg} p-6 space-y-3`}>
                    <div className="flex items-center gap-3">
                      <div className={`h-9 w-9 rounded-xl flex items-center justify-center bg-white border ${c.border}`}>
                        <Icon size={18} className={c.text} />
                      </div>
                      <h3 className="text-sm font-semibold text-foreground">{row.layer}</h3>
                    </div>
                    <p className="text-xs text-secondary">{row.role}</p>
                    <p className="text-xs font-medium text-foreground">{row.examples}</p>
                  </div>
                );
              })}
            </div>
          </section>

          {/* ── 13. FAILURE MODES ── */}
          <section className="space-y-10">
            <motion.div {...fadeIn} className="space-y-3">
              <SectionBadge label="Production reality" color="red" />
              <h2 className="text-3xl md:text-4xl font-heading font-bold leading-tight">
                How agents fail — and how to prevent it
              </h2>
              <p className="text-secondary leading-relaxed max-w-3xl">
                Agents that work in demos fail in production for predictable reasons.
              </p>
            </motion.div>
            <div className="grid md:grid-cols-2 gap-4">
              {productionFailures.map((f) => (
                <div key={f.failure} className="hover-glow rounded-2xl border border-red-100 bg-white p-6 shadow-sm space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-lg bg-red-50 border border-red-200 flex items-center justify-center">
                      <XCircle size={16} className="text-red-500" />
                    </div>
                    <h3 className="text-sm font-semibold text-foreground">{f.failure}</h3>
                  </div>
                  <div className="space-y-2 text-sm pl-11">
                    <div>
                      <span className="text-xs font-semibold uppercase tracking-wide text-secondary">Why: </span>
                      <span className="text-secondary">{f.cause}</span>
                    </div>
                    <div>
                      <span className="text-xs font-semibold uppercase tracking-wide text-emerald-700">Fix: </span>
                      <span className="text-foreground">{f.fix}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ── 14. BENCHMARKS ── */}
          <section className="space-y-10">
            <motion.div {...fadeIn} className="space-y-3">
              <SectionBadge label="Benchmarks" color="blue" />
              <h2 className="text-3xl md:text-4xl font-heading font-bold leading-tight">
                Agent capability: 2023 vs. 2026
              </h2>
              <p className="text-secondary leading-relaxed max-w-3xl">
                The jump is not incremental — it is a category change. Tasks that required human experts now run autonomously.
              </p>
            </motion.div>
            <div className="rounded-2xl border border-black/5 bg-white shadow-sm p-6 md:p-8">
              <RankedBarChart
                series={BENCHMARKS_2026.map((b, i) => ({
                  label: b.name,
                  value: b.pct,
                  valueLabel: b.score2026,
                  color: CATEGORICAL[i % CATEGORICAL.length],
                }))}
                max={100}
              />
              <div className="mt-6 grid sm:grid-cols-2 gap-x-8 gap-y-2">
                {BENCHMARKS_2026.map((b) => (
                  <div key={b.name} className="text-xs text-secondary leading-relaxed">
                    <span className="font-semibold text-foreground">{b.name}</span> — {b.meaning}. 2023 baseline: {b.score2023}.
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── 15. OPERATIONS IMPACT ── */}
          <section className="space-y-10">
            <motion.div {...fadeIn} className="space-y-3">
              <SectionBadge label="Operational impact — measured" color="teal" />
              <h2 className="text-3xl md:text-4xl font-heading font-bold leading-tight">
                What AI is delivering in operations today
              </h2>
              <p className="text-secondary leading-relaxed max-w-3xl">
                Not projections. Outcomes reported by companies that went past pilot stage in 2024–2025 and are now running AI in production.
              </p>
            </motion.div>
            <SlopeChart
              rows={OPERATIONS_IMPACT.map((row) => ({
                label: `${row.function} — ${row.roi}`,
                before: row.before,
                after: row.after,
                improved: true,
              }))}
            />
          </section>

          {/* ── 16. WATCH LIST ── */}
          <section className="space-y-10">
            <motion.div {...fadeIn} className="space-y-3">
              <SectionBadge label="What to watch" color="pink" />
              <h2 className="text-3xl md:text-4xl font-heading font-bold leading-tight">
                Five developments that will matter most
              </h2>
            </motion.div>
            <div className="grid md:grid-cols-2 gap-5">
              {watchList.map((w, i) => {
                const Icon = w.icon;
                return (
                  <motion.div
                    key={w.name}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.06 }}
                    className="rounded-2xl border border-black/5 bg-white p-7 shadow-sm space-y-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="h-9 w-9 rounded-xl bg-pink-50 border border-pink-200 flex items-center justify-center flex-shrink-0">
                          <Icon size={18} className="text-pink-600" />
                        </div>
                        <h3 className="text-base font-semibold text-foreground">{w.name}</h3>
                      </div>
                      <span className="flex-shrink-0 text-xs font-medium text-secondary bg-slate-100 px-2.5 py-1 rounded-full whitespace-nowrap">{w.horizon}</span>
                    </div>
                    <p className="text-sm text-secondary leading-relaxed pl-12">{w.desc}</p>
                  </motion.div>
                );
              })}
            </div>
          </section>

          {/* ── 17. AI USER vs AI OPERATOR ── */}
          <section>
            <div
              className="relative overflow-hidden rounded-3xl border border-black/5 p-10 lg:p-14 space-y-8 shadow-sm"
              style={{ background: "linear-gradient(135deg, #ecfdf5 0%, #ffffff 55%, #f5f3ff 100%)" }}
            >
              <div className="pointer-events-none absolute inset-0 opacity-[0.4]" aria-hidden style={{ backgroundImage: "radial-gradient(circle at 1px 1px, rgba(16,24,40,0.06) 1px, transparent 0)", backgroundSize: "28px 28px" }} />
              <div className="pointer-events-none absolute top-0 right-0 w-80 h-80 rounded-full bg-emerald-300/20 blur-3xl" aria-hidden />
              <div className="pointer-events-none absolute bottom-0 left-0 w-64 h-64 rounded-full bg-violet-300/20 blur-3xl" aria-hidden />
              <div className="relative space-y-2">
                <SectionBadge label="The position to take in 2026" color="emerald" />
                <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground leading-tight">
                  The gap between AI users<br />and AI operators is widening.
                </h2>
              </div>
              <div className="relative grid md:grid-cols-2 gap-6">
                <div className="rounded-2xl border border-black/5 bg-slate-50 p-6 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-xl bg-white border border-black/5 flex items-center justify-center">
                      <Globe size={18} className="text-secondary" />
                    </div>
                    <h3 className="font-semibold text-foreground">AI user</h3>
                  </div>
                  <ul className="space-y-2 text-sm">
                    {["Uses ChatGPT, Claude.ai, Gemini interchangeably", "Prompts for individual tasks in isolation", "No persistent knowledge base or domain memory", "Dependent on the same tools as everyone else", "Productivity gains: 10–30%"].map((item) => (
                      <li key={item} className="flex items-start gap-2 text-secondary">
                        <span className="h-1.5 w-1.5 rounded-full bg-slate-400 mt-1.5 flex-shrink-0" />{item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-xl bg-emerald-100 border border-emerald-200 flex items-center justify-center">
                      <Sparkles size={18} className="text-emerald-700" />
                    </div>
                    <h3 className="font-semibold text-emerald-700">AI operator</h3>
                  </div>
                  <ul className="space-y-2 text-sm">
                    {["Builds systems that use AI — not just uses AI", "Orchestrates agents across end-to-end workflows", "Domain knowledge stored, indexed, and queryable", "Proprietary data and systems create competitive moat", "Leverage gains: 5–10× and compounding"].map((item) => (
                      <li key={item} className="flex items-start gap-2 text-foreground">
                        <CheckCircle size={14} className="text-emerald-600 mt-0.5 flex-shrink-0" />{item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <p className="relative text-secondary leading-relaxed max-w-3xl">
                The operations professional who understands AI as infrastructure — who can design the system, wire the tools, and govern the outputs — is the most valuable person in any organization in 2026. This map exists to create that person.
              </p>
            </div>
          </section>

          {/* ── 18. EXPLORE THE MAP ── */}
          <section className="space-y-10">
            <motion.div {...fadeIn} className="space-y-3">
              <SectionBadge label="Explore the map" color="emerald" />
              <h2 className="text-3xl md:text-4xl font-heading font-bold leading-tight">
                Go deeper on what matters to you
              </h2>
              <p className="text-secondary leading-relaxed max-w-2xl">
                Each section of the map is a standalone deep-dive. Pick the one closest to where you are now.
              </p>
            </motion.div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { href: "/origins", tag: "Foundations", title: "The Tech", desc: "How transformers, GPUs, and vector databases actually work — without the engineering degree.", color: "indigo" },
                { href: "/market-reality", tag: "Data", title: "Market Reality", desc: "Why 95% of GenAI pilots fail to scale, the maturity timeline, and what separates the ones that don't.", color: "orange" },
                { href: "/what-works", tag: "Patterns", title: "What Works Today", desc: "LLMs, Assistants, AI Agents, and Agentic Systems — click through each stage and how to build it.", color: "teal" },
                { href: "/ai-mindset", tag: "Framework", title: "AI Mindset", desc: "The five-layer system model that separates AI users from AI operators.", color: "emerald" },
                { href: "/execution-checklist", tag: "Action", title: "Execution Checklist", desc: "The decisions to make before committing teams and budgets to AI work, plus 9 real systems.", color: "emerald" },
                { href: "/ai-now-2026", tag: "Current", title: "AI Now — 2026", desc: "Where the technology actually stands right now — benchmarks, models, deployments.", color: "pink" },
              ].map((page, i) => {
                const c = colorMap[page.color] ?? colorMap.emerald;
                return (
                  <motion.div
                    key={page.href}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.04 }}
                  >
                    <Link
                      href={page.href}
                      className="group block rounded-2xl border border-black/6 bg-white hover:border-black/12 hover:shadow-md p-6 space-y-3 transition-all h-full"
                    >
                      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wide border ${c.bg} ${c.text} ${c.border}`}>
                        {page.tag}
                      </span>
                      <h3 className="text-base font-semibold text-foreground group-hover:text-accent transition-colors">
                        {page.title}
                      </h3>
                      <p className="text-sm text-secondary leading-relaxed">{page.desc}</p>
                      <div className="flex items-center gap-1 text-xs font-medium text-secondary group-hover:text-accent transition-colors pt-1">
                        Read more <ArrowRight size={12} />
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </section>

          {/* ── 19. CTA ── */}
          <section>
            <motion.div
              {...fadeIn}
              className="relative isolate overflow-hidden rounded-3xl border border-emerald-200 p-10 lg:p-14 shadow-sm space-y-6"
            >
              {/* Ambient shader background — this is the one section on the page
                  with no flat/gradient fill of its own, so it doubles as a
                  closing "vision" moment instead of competing with a section
                  that already has a background treatment. */}
              <NeuroNoise
                className="pointer-events-none absolute inset-0 -z-10 h-full w-full"
                colorFront="#0E7A68"
                colorMid="#9FE3D5"
                colorBack="#F4F3F5"
                brightness={0.45}
                contrast={0.35}
                speed={0.35}
                scale={1.2}
              />
              <div className="pointer-events-none absolute inset-0 -z-10 bg-white/55" aria-hidden />

              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-emerald-100 border border-emerald-200 flex items-center justify-center">
                  <Rocket size={20} className="text-emerald-700" />
                </div>
                <span className="text-sm font-semibold uppercase tracking-wide text-emerald-700">Understanding comes before execution</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-heading font-bold leading-tight text-foreground">
                Acting without a system view creates fragility.<br />Acting with one creates leverage.
              </h2>
              <p className="text-base text-secondary leading-relaxed max-w-3xl">
                Use this map to decide how far to go before you commit teams and budgets. The first agent is always the hardest. The tenth is operational infrastructure.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link href="/ai-mindset" className="inline-flex items-center gap-2 justify-center rounded-xl bg-foreground hover:bg-foreground/90 px-6 py-3 text-sm font-semibold text-background shadow-sm transition">
                  Start with the AI Mindset <ArrowRight size={16} />
                </Link>
                <Link href="/execution-checklist" className="inline-flex items-center gap-2 justify-center rounded-xl border border-black/10 bg-white hover:border-foreground px-6 py-3 text-sm font-semibold text-foreground transition">
                  Execution Checklist <ChevronRight size={16} />
                </Link>
              </div>
            </motion.div>
          </section>

        </div>
      </main>
    </div>
  );
}
