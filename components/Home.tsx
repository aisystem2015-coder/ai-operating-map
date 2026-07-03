"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import Navigation from "./Navigation";
import SystemViewCard from "./ui/system-view-card";
import {
  Zap, Brain, Network, Bot, Shield, Eye, Layers, Target,
  Globe, CheckCircle, XCircle, AlertTriangle, BarChart2, Cpu,
  Database, GitBranch, Sparkles, ArrowRight, Building2, Rocket,
  ChevronRight, Radio, Factory, BookOpen, Lock, Mic2,
} from "lucide-react";

// ── Animated Neural Orb ───────────────────────────────────────────────────────

function AnimatedNeuralOrb() {
  const SZ = 420;
  const CX = SZ / 2;
  const r1 = 158, r2 = 108, r3 = 60;
  const mkPts = (r: number, angles: number[]) =>
    angles.map((a) => ({
      x: CX + r * Math.cos((a * Math.PI) / 180),
      y: CX + r * Math.sin((a * Math.PI) / 180),
    }));

  return (
    <div className="relative" style={{ width: SZ, height: SZ }}>
      {/* Background radial glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-80 h-80 rounded-full" style={{ background: "radial-gradient(circle, rgba(16,185,129,0.10) 0%, transparent 70%)" }} />
      </div>

      {/* Pulse rings */}
      {[0, 1.4, 2.8].map((delay, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full border border-emerald-500/20"
          style={{ width: 80, height: 80, top: "50%", left: "50%", marginLeft: -40, marginTop: -40 }}
          initial={{ scale: 1, opacity: 0.7 }}
          animate={{ scale: 5, opacity: 0 }}
          transition={{ duration: 3.5, repeat: Infinity, delay, ease: "easeOut" }}
        />
      ))}

      {/* Ring 1 — outer, slow CW */}
      <motion.div className="absolute inset-0" animate={{ rotate: 360 }} transition={{ duration: 16, repeat: Infinity, ease: "linear" }}>
        <svg className="absolute inset-0 w-full h-full" viewBox={`0 0 ${SZ} ${SZ}`}>
          <circle cx={CX} cy={CX} r={r1} fill="none" stroke="rgba(16,185,129,0.20)" strokeWidth="1" strokeDasharray="5 10" />
          {mkPts(r1, [0, 120, 240]).map((p, i) => (
            <g key={i}>
              <circle cx={p.x} cy={p.y} r={5} fill="#34d399" opacity="0.95" />
              <circle cx={p.x} cy={p.y} r={11} fill="rgba(16,185,129,0.18)" />
            </g>
          ))}
        </svg>
      </motion.div>

      {/* Ring 2 — middle, CCW */}
      <motion.div className="absolute inset-0" animate={{ rotate: -360 }} transition={{ duration: 10, repeat: Infinity, ease: "linear" }}>
        <svg className="absolute inset-0 w-full h-full" viewBox={`0 0 ${SZ} ${SZ}`}>
          <circle cx={CX} cy={CX} r={r2} fill="none" stroke="rgba(139,92,246,0.22)" strokeWidth="1" strokeDasharray="3 8" />
          {mkPts(r2, [45, 225]).map((p, i) => (
            <g key={i}>
              <circle cx={p.x} cy={p.y} r={4} fill="#a78bfa" opacity="0.95" />
              <circle cx={p.x} cy={p.y} r={9} fill="rgba(139,92,246,0.18)" />
            </g>
          ))}
        </svg>
      </motion.div>

      {/* Ring 3 — inner, fast CW */}
      <motion.div className="absolute inset-0" animate={{ rotate: 360 }} transition={{ duration: 5, repeat: Infinity, ease: "linear" }}>
        <svg className="absolute inset-0 w-full h-full" viewBox={`0 0 ${SZ} ${SZ}`}>
          <circle cx={CX} cy={CX} r={r3} fill="none" stroke="rgba(34,211,238,0.22)" strokeWidth="1" />
          {mkPts(r3, [0]).map((p, i) => (
            <g key={i}>
              <circle cx={p.x} cy={p.y} r={3.5} fill="#22d3ee" opacity="0.95" />
              <circle cx={p.x} cy={p.y} r={7} fill="rgba(34,211,238,0.18)" />
            </g>
          ))}
        </svg>
      </motion.div>

      {/* Central core */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
        <div className="absolute -inset-10 rounded-full" style={{ background: "radial-gradient(circle, rgba(16,185,129,0.22) 0%, transparent 70%)" }} />
        <motion.div
          className="relative w-[72px] h-[72px] rounded-full border-2 border-emerald-400/50 flex items-center justify-center"
          animate={{ boxShadow: ["0 0 24px rgba(16,185,129,0.4)", "0 0 48px rgba(16,185,129,0.65)", "0 0 24px rgba(16,185,129,0.4)"] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          style={{ background: "rgba(5,20,15,0.85)" }}
        >
          <Bot size={30} className="text-emerald-300 relative z-10" />
        </motion.div>
      </div>

      {/* Floating label cards */}
      {[
        { label: "Memory", sub: "Vector DB", x: "2%",  y: "15%", col: "violet" },
        { label: "Reasoning", sub: "LLM Core", x: "72%", y: "6%",  col: "emerald" },
        { label: "Tools / MCP", sub: "300+ connectors", x: "74%", y: "72%", col: "cyan" },
        { label: "Orchestration", sub: "n8n · LangGraph",  x: "0%",  y: "70%", col: "indigo" },
      ].map((tag, idx) => (
        <motion.div
          key={tag.label}
          className="absolute text-xs leading-tight"
          style={{ left: tag.x, top: tag.y }}
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 3 + idx * 0.5, repeat: Infinity, ease: "easeInOut", delay: idx * 0.7 }}
        >
          <div className={`rounded-xl px-3 py-2 backdrop-blur-md border ${
            tag.col === "violet"  ? "border-violet-500/35 bg-violet-950/70 text-violet-300"  :
            tag.col === "emerald" ? "border-emerald-500/35 bg-emerald-950/70 text-emerald-300" :
            tag.col === "cyan"    ? "border-cyan-500/35 bg-cyan-950/70 text-cyan-300"    :
                                    "border-indigo-500/35 bg-indigo-950/70 text-indigo-300"
          }`}>
            <div className="font-semibold text-white text-[11px]">{tag.label}</div>
            <div className="opacity-60 text-[10px]">{tag.sub}</div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

// ── Color system (dark-mode neon palette) ─────────────────────────────────────

const C: Record<string, { border: string; bg: string; icon: string; text: string; badge: string; glow: string }> = {
  emerald: { border:"border-emerald-500/25", bg:"bg-emerald-500/8",   icon:"bg-emerald-500/15 border border-emerald-500/30 text-emerald-400", text:"text-emerald-400", badge:"border-emerald-500/30 bg-emerald-500/12 text-emerald-400", glow:"0 0 20px rgba(16,185,129,0.3)" },
  violet:  { border:"border-violet-500/25",  bg:"bg-violet-500/8",    icon:"bg-violet-500/15 border border-violet-500/30 text-violet-400",   text:"text-violet-400",  badge:"border-violet-500/30 bg-violet-500/12 text-violet-400",   glow:"0 0 20px rgba(139,92,246,0.3)" },
  cyan:    { border:"border-cyan-500/25",     bg:"bg-cyan-500/8",      icon:"bg-cyan-500/15 border border-cyan-500/30 text-cyan-400",         text:"text-cyan-400",    badge:"border-cyan-500/30 bg-cyan-500/12 text-cyan-400",         glow:"0 0 20px rgba(34,211,238,0.3)" },
  blue:    { border:"border-blue-500/25",     bg:"bg-blue-500/8",      icon:"bg-blue-500/15 border border-blue-500/30 text-blue-400",         text:"text-blue-400",    badge:"border-blue-500/30 bg-blue-500/12 text-blue-400",         glow:"0 0 20px rgba(59,130,246,0.3)" },
  indigo:  { border:"border-indigo-500/25",   bg:"bg-indigo-500/8",    icon:"bg-indigo-500/15 border border-indigo-500/30 text-indigo-400",   text:"text-indigo-400",  badge:"border-indigo-500/30 bg-indigo-500/12 text-indigo-400",   glow:"0 0 20px rgba(99,102,241,0.3)" },
  teal:    { border:"border-teal-500/25",     bg:"bg-teal-500/8",      icon:"bg-teal-500/15 border border-teal-500/30 text-teal-400",         text:"text-teal-400",    badge:"border-teal-500/30 bg-teal-500/12 text-teal-400",         glow:"0 0 20px rgba(20,184,166,0.3)" },
  orange:  { border:"border-orange-500/25",   bg:"bg-orange-500/8",    icon:"bg-orange-500/15 border border-orange-500/30 text-orange-400",   text:"text-orange-400",  badge:"border-orange-500/30 bg-orange-500/12 text-orange-400",   glow:"0 0 20px rgba(249,115,22,0.3)" },
  pink:    { border:"border-pink-500/25",     bg:"bg-pink-500/8",      icon:"bg-pink-500/15 border border-pink-500/30 text-pink-400",         text:"text-pink-400",    badge:"border-pink-500/30 bg-pink-500/12 text-pink-400",         glow:"0 0 20px rgba(236,72,153,0.3)" },
  red:     { border:"border-red-500/25",      bg:"bg-red-500/8",       icon:"bg-red-500/15 border border-red-500/30 text-red-400",            text:"text-red-400",     badge:"border-red-500/30 bg-red-500/12 text-red-400",            glow:"0 0 20px rgba(239,68,68,0.3)" },
};

const TIER: Record<string, string> = {
  Frontier: "bg-yellow-500/15 text-yellow-400 border border-yellow-500/30",
  Expert:   "bg-purple-500/15 text-purple-400 border border-purple-500/30",
  Default:  "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30",
  Fast:     "bg-blue-500/15 text-blue-400 border border-blue-500/30",
  Reasoning:"bg-indigo-500/15 text-indigo-400 border border-indigo-500/30",
  Open:     "bg-teal-500/15 text-teal-400 border border-teal-500/30",
};

// ── Data ───────────────────────────────────────────────────────────────────────

const majorShifts2026 = [
  { shift: "MCP becomes the standard", what: "Model Context Protocol, open-sourced by Anthropic in 2024, became the universal connector layer. 300+ connectors available. Every major AI tool now speaks MCP.", impact: "Infrastructure", icon: Network, color: "emerald" },
  { shift: "Agentic systems replace copilots", what: "The market shifted from AI that assists to AI that acts. Multi-agent frameworks (n8n, LangGraph, CrewAI) now power end-to-end business processes without human intervention at each step.", impact: "Workflow", icon: Bot, color: "violet" },
  { shift: "On-device AI goes mainstream", what: "Apple Intelligence, Qualcomm NPUs, and Samsung Galaxy AI bring capable models to personal devices. Privacy-preserving AI becomes the default for personal use.", impact: "Privacy", icon: Cpu, color: "cyan" },
  { shift: "Physical AI arrives", what: "Figure 02, Apptronik Apollo, and Tesla Optimus begin limited commercial deployment — reasoning models in robot bodies. Industrial AI shifts from software-only to embodied.", impact: "Physical", icon: Factory, color: "orange" },
  { shift: "Reasoning models change the ceiling", what: "OpenAI o3, Anthropic extended thinking, and Google Gemini Thinking show that thinking before answering dramatically changes what AI can solve. PhD-level science becomes single-agent tasks.", impact: "Capability", icon: Brain, color: "indigo" },
  { shift: "Open source closes the gap", what: "DeepSeek R1 matched GPT-4 performance at open-source cost. The cost of deploying frontier-quality AI dropped 95% between 2023 and 2026. Advanced AI is now accessible to anyone.", impact: "Accessibility", icon: Rocket, color: "teal" },
  { shift: "Knowledge externalization as strategy", what: "The most effective AI practitioners treat their knowledge as structured infrastructure. Obsidian + MCP, Notion databases, and personal vector stores become standard professional tools.", impact: "Personal", icon: BookOpen, color: "pink" },
];

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

const verticalExamples = [
  { domain: "Operations", icon: Building2, color: "emerald", title: "AI Operations Director", description: "Knows production schedules, supplier lead times, and KPI targets. Monitors dashboards 24/7, surfaces exceptions before humans notice, integrates with ERP to adjust purchase orders within defined rules.", outcome: "30–40% reduction in exception management time", tools: ["Claude Sonnet 4.6", "Airtable MCP", "SAP connector", "Slack"] },
  { domain: "Supply Chain", icon: GitBranch, color: "blue", title: "Demand Forecast Agent", description: "Ingests sales data, weather events, competitor launches, and macro trends. Outputs weekly demand adjustments with confidence intervals and drafts POs for human approval.", outcome: "15–25% improvement in inventory accuracy", tools: ["Claude Opus / GPT-5", "Vector DB", "ERP API", "Power BI"] },
  { domain: "Customer Support", icon: Mic2, color: "violet", title: "Tier-1 Resolution Agent", description: "Accesses order history, product docs, and warranty policies. Resolves 70% of cases autonomously. Escalates with full context when human judgment is needed.", outcome: "70% deflection rate, CSAT +18 points", tools: ["Relevance AI", "Zendesk MCP", "RAG", "Claude Haiku"] },
  { domain: "Finance", icon: BarChart2, color: "indigo", title: "Month-End Close Agent", description: "Ingests GL entries, reconciles discrepancies, flags anomalies, and drafts the variance commentary for the CFO report. 3 days → hours.", outcome: "40–60% reduction in close cycle time", tools: ["Claude Opus 4.8", "NetSuite API", "Excel MCP", "Notion"] },
  { domain: "Legal", icon: Lock, color: "teal", title: "Contract Review Agent", description: "Knows your standard terms, red-line policies, and jurisdiction-specific clauses. Flags high-risk provisions, suggests pre-approved alternatives, drafts negotiation memos.", outcome: "50%+ reduction in outside counsel hours", tools: ["Claude Opus 4.8", "Drive MCP", "Vector DB", "Docusign"] },
  { domain: "Marketing", icon: Radio, color: "pink", title: "Brand Voice Agent", description: "Trained on your brand guidelines, audience personas, and top-performing content. Drafts posts, emails, and product descriptions in your voice. Schedules and reports performance.", outcome: "5x content throughput at 80% brand compliance", tools: ["Claude Sonnet 4.6", "Playwright MCP", "Airtable", "Relevance AI"] },
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
  { n: "04", name: "MCP-Connected (Tool Execution)", icon: Network, color: "indigo", description: "The agent has direct access to external tools via Model Context Protocol — databases, APIs, file systems, calendars, communication tools.", when: "When the agent must read from or write to production systems as part of its work.", example: "LinkedIn content agent: drafts post → publishes via Playwright → logs performance in Airtable → reports back." },
  { n: "05", name: "Human-in-the-Loop", icon: Shield, color: "teal", description: "The agent completes analysis and proposes an action, then pauses for human approval before executing. Critical for high-stakes, irreversible, or high-cost decisions.", when: "When the consequences of an error are significant — financial, legal, operational.", example: "Procurement agent: recommends a purchase order → human approves → agent submits to ERP." },
];

const agentStack = [
  { layer: "Model", icon: Brain, role: "Reasoning engine", examples: "Claude Sonnet 4.6 · Claude Opus 4.8 · GPT-5 · Gemini 2.5", color: "violet" },
  { layer: "Memory", icon: Database, role: "Short-term context + long-term retrieval", examples: "Context window + Qdrant / Pinecone / pgvector", color: "blue" },
  { layer: "Tools (MCP)", icon: Network, role: "Actions the agent can take", examples: "APIs · file systems · browsers · databases · email · calendar", color: "emerald" },
  { layer: "Orchestration", icon: GitBranch, role: "Controls task flow, retries, handoffs", examples: "n8n · LangGraph · CrewAI · Claude Code · Relevance AI", color: "indigo" },
  { layer: "Guardrails", icon: Shield, role: "Prevents unsafe or incorrect outputs", examples: "Schema validation · human checkpoints · step limits · confidence thresholds", color: "teal" },
  { layer: "Observability", icon: Eye, role: "Full audit trail of every action and decision", examples: "LangSmith · custom logging · Sentry · PostHog", color: "orange" },
];

const productionFailures = [
  { failure: "Hallucination without guardrails", cause: "Agent invents facts, especially in long reasoning chains", fix: "Add retrieval (RAG) for factual claims. Validate outputs against schemas." },
  { failure: "Tool call loops", cause: "Agent gets stuck calling the same tool repeatedly without progress", fix: "Implement step limits and loop detection. Add explicit termination conditions." },
  { failure: "Context overflow", cause: "Long agent runs fill the context window; early instructions are forgotten", fix: "Compress intermediate results. Use summarization agents." },
  { failure: "No observability", cause: "Agent acts but no one can audit what it did or why", fix: "Log every tool call, reasoning step, and output. Treat agent traces like production logs." },
  { failure: "Cascading errors", cause: "A wrong decision early in the chain propagates through all downstream steps", fix: "Add validation checkpoints between steps. Use human gates at high-stakes branch points." },
  { failure: "Permission creep", cause: "Agent is given too many tools just in case, then uses them incorrectly", fix: "Grant minimum viable permissions. Define explicit tool scope at deployment time." },
];

const benchmarks2026 = [
  { name: "SWE-bench (coding)", score2023: "< 5%", score2026: "65–80%", meaning: "Agents now autonomously fix real GitHub issues", pct: 72, color: "emerald" },
  { name: "GAIA (general AI assistant)", score2023: "< 20%", score2026: "55–70%", meaning: "Complex multi-step tasks completed without human help", pct: 62, color: "violet" },
  { name: "Humanity's Last Exam", score2023: "n/a", score2026: "40–60%", meaning: "PhD-level questions across science, law, medicine", pct: 50, color: "cyan" },
  { name: "ARC-AGI", score2023: "< 10%", score2026: "75–85%", meaning: "Novel reasoning that required human-level adaptation", pct: 80, color: "indigo" },
];

const operationsImpact = [
  { function: "Supply Chain", icon: GitBranch, before: "Weekly manual demand review, spreadsheet-based forecasting, reactive inventory", after: "Daily AI-driven demand signals, automated PO generation, predictive exception alerts", roi: "15–30% cost ↓", color: "emerald" },
  { function: "Customer Ops", icon: Mic2, before: "Tier-1 support handled by humans, 48-hour average resolution time", after: "70% deflection by AI agents, 4-hour resolution, humans handle complex cases with full context", roi: "40–60% support cost ↓", color: "violet" },
  { function: "Finance / FP&A", icon: BarChart2, before: "3-day month-end close, manual variance commentary, static budgets", after: "Hours-long close, AI-drafted commentary reviewed by humans, rolling AI-updated forecasts", roi: "60% close time ↓", color: "blue" },
  { function: "IT / DevOps", icon: Cpu, before: "Manual ticket triage, human-only code review, reactive incident response", after: "AI-routed tickets, AI-assisted PR review at scale, anomaly detection and first-response automation", roi: "50% MTTR ↓, 3× throughput", color: "indigo" },
  { function: "HR / Talent", icon: Building2, before: "Manual resume screening, reactive workforce planning, generic onboarding", after: "AI-first screening against structured criteria, predictive workforce models, personalized onboarding", roi: "70% faster time-to-hire", color: "teal" },
  { function: "Content / Marketing", icon: Radio, before: "Manual content creation, slow campaign iteration, generic messaging", after: "AI-generated content in brand voice, automated A/B testing, personalized messaging at scale", roi: "5× content throughput", color: "pink" },
];

const watchList = [
  { name: "Reasoning-native workflows", desc: "As o3-level reasoning becomes standard, AI shifts from completing tasks to solving problems. Organizations that redesign workflows around reasoning agents will have a structural advantage.", horizon: "Now — 2027", icon: Brain, color: "emerald" },
  { name: "AI memory infrastructure", desc: "Persistent, evolving AI memory — personal knowledge graphs, organizational memory — is the next foundation layer. Obsidian + MCP is the early pattern. Enterprise versions are being built.", horizon: "2026 — 2028", icon: Database, color: "violet" },
  { name: "Physical-digital AI integration", desc: "Reasoning models that operate robots and physical systems will transform manufacturing, logistics, and field operations. The same model that drafts your strategy memo will eventually operate your warehouse.", horizon: "2026 — 2030", icon: Factory, color: "cyan" },
  { name: "AI governance as infrastructure", desc: "The EU AI Act is live. US framework is developing. Organizations without AI governance infrastructure face regulatory and reputational exposure. Governance is no longer optional.", horizon: "Now", icon: Shield, color: "orange" },
  { name: "Multi-modal as default", desc: "Text-only AI is already an edge case. Voice, image, video, and code are native inputs for 2026 frontier models. The next wave of vertical AI will be built for multi-modal operations.", horizon: "Now — 2027", icon: Mic2, color: "pink" },
];

// ── UI helpers ─────────────────────────────────────────────────────────────────

function NeonBadge({ label, color = "emerald" }: { label: string; color?: string }) {
  const c = C[color] ?? C.emerald;
  const dotColor: Record<string, string> = { emerald:"bg-emerald-400", violet:"bg-violet-400", cyan:"bg-cyan-400", blue:"bg-blue-400", indigo:"bg-indigo-400", teal:"bg-teal-400", orange:"bg-orange-400", pink:"bg-pink-400", red:"bg-red-400" };
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] border ${c.badge}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${dotColor[color] ?? "bg-emerald-400"} animate-pulse`} />
      {label}
    </span>
  );
}

const GLASS = "rounded-2xl border border-white/[0.07] bg-white/[0.03] backdrop-blur-sm";
const FI = { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5 } };

// ── Page ────────────────────────────────────────────────────────────────────────

export default function Home() {
  return (
    <div className="min-h-screen text-slate-200" style={{ background: "#0c1220" }}>
      <Navigation />

      {/* Ambient glows */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden z-0" aria-hidden>
        <div className="absolute -top-40 left-1/4 w-[700px] h-[700px] rounded-full" style={{ background: "radial-gradient(circle, rgba(16,185,129,0.07) 0%, transparent 70%)" }} />
        <div className="absolute top-1/2 right-0 w-[500px] h-[500px] rounded-full" style={{ background: "radial-gradient(circle, rgba(139,92,246,0.06) 0%, transparent 70%)", transform: "translate(40%,0)" }} />
      </div>

      <main className="relative z-10 pt-28 pb-32">
        <div className="max-w-6xl mx-auto px-6 lg:px-10 space-y-32">

          {/* ─── 1. HERO ─── */}
          <section>
            <div
              className="relative overflow-hidden rounded-3xl border border-white/[0.08]"
              style={{ background: "linear-gradient(135deg, #060e1a 0%, #080c1e 55%, #0b0718 100%)" }}
            >
              {/* Grid texture */}
              <div className="pointer-events-none absolute inset-0" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.06) 1px, transparent 0)", backgroundSize: "28px 28px" }} />
              {/* Top neon line */}
              <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent 0%, rgba(16,185,129,0.7) 40%, rgba(139,92,246,0.7) 60%, transparent 100%)" }} />

              <div className="relative px-8 py-12 lg:px-14 lg:py-16">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                  <motion.div {...FI} className="space-y-8">
                    <div className="flex items-center gap-3">
                      <NeonBadge label="AI Operating Map" color="emerald" />
                      <span className="text-xs text-slate-500">Updated July 2026</span>
                    </div>

                    <div className="space-y-4">
                      <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold leading-[1.08] text-white">
                        AI is not a product.<br />
                        <span className="text-emerald-400" style={{ textShadow: "0 0 50px rgba(16,185,129,0.55)" }}>
                          It is the reasoning layer
                        </span><br />
                        inside your system.
                      </h1>
                      <p className="text-slate-400 leading-relaxed text-base max-w-lg">
                        A complete reference for operations professionals navigating AI in 2026 — from model landscape to agent architecture to production results.
                      </p>
                    </div>

                    {/* Stat chips */}
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { stat: "95%",   label: "GenAI pilots fail to scale", color: "red"     },
                        { stat: "300+",  label: "MCP connectors",              color: "emerald" },
                        { stat: "5–10×", label: "AI operator leverage",        color: "violet"  },
                        { stat: "2026",  label: "Agents go to production",     color: "cyan"    },
                      ].map((s) => (
                        <div key={s.stat} className={`rounded-xl border ${C[s.color].border} ${C[s.color].bg} px-4 py-3 space-y-0.5`}>
                          <div className={`text-2xl font-heading font-black ${C[s.color].text}`} style={{ textShadow: C[s.color].glow }}>{s.stat}</div>
                          <div className="text-[11px] text-slate-400">{s.label}</div>
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">
                      <Link href="/ai-mindset" className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 px-6 py-3 text-sm font-semibold text-white transition-all" style={{ boxShadow: "0 0 30px rgba(16,185,129,0.4)" }}>
                        Start with AI Mindset <ArrowRight size={15} />
                      </Link>
                      <Link href="/execution-checklist" className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 px-6 py-3 text-sm font-semibold text-slate-200 transition">
                        Execution Checklist <ChevronRight size={15} />
                      </Link>
                    </div>
                  </motion.div>

                  {/* Animated orb */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.88 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.9, delay: 0.2 }}
                    className="hidden lg:flex items-center justify-center"
                  >
                    <AnimatedNeuralOrb />
                  </motion.div>
                </div>
              </div>
            </div>
          </section>

          {/* ─── 2. SEVEN SHIFTS ─── */}
          <section className="space-y-10">
            <motion.div {...FI} className="space-y-3">
              <NeonBadge label="AI Today — July 2026" color="emerald" />
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-white">Seven shifts that changed everything</h2>
              <p className="text-slate-400 max-w-2xl">Not hype. Not demos. The operational reality of AI in 2026.</p>
            </motion.div>
            <div className="grid md:grid-cols-2 gap-4">
              {majorShifts2026.map((s, i) => {
                const c = C[s.color]; const Icon = s.icon;
                return (
                  <motion.div key={s.shift} initial={{ opacity:0,y:16 }} animate={{ opacity:1,y:0 }} transition={{ delay:i*0.06 }}
                    className={`rounded-2xl border ${c.border} p-6 space-y-3 hover:border-opacity-50 transition-all group`}
                    style={{ background:"rgba(255,255,255,0.025)" }}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`h-9 w-9 rounded-xl flex items-center justify-center ${c.icon}`} style={{ boxShadow: c.glow }}><Icon size={17} /></div>
                      <span className={`text-[10px] font-bold uppercase tracking-[0.2em] ${c.text}`}>{s.impact}</span>
                    </div>
                    <h3 className="text-sm font-semibold text-white">{s.shift}</h3>
                    <p className="text-sm text-slate-400 leading-relaxed">{s.what}</p>
                  </motion.div>
                );
              })}
            </div>
          </section>

          {/* ─── 3. MODELS ─── */}
          <section className="space-y-10">
            <motion.div {...FI} className="space-y-3">
              <NeonBadge label="Model Landscape 2026" color="indigo" />
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-white">Which models matter — and why</h2>
              <p className="text-slate-400 max-w-2xl">Match the model to the task. Frontier for depth, fast for volume.</p>
            </motion.div>
            <div className="grid lg:grid-cols-2 gap-5">
              {models2026.map((org) => {
                const c = C[org.color];
                return (
                  <div key={org.org} className={`rounded-2xl border ${c.border} overflow-hidden`} style={{ background:"rgba(255,255,255,0.02)" }}>
                    <div className={`px-5 py-3 border-b ${c.border} ${c.bg}`}>
                      <h3 className={`text-[10px] font-bold uppercase tracking-[0.2em] ${c.text}`}>{org.org}</h3>
                    </div>
                    <div className="divide-y divide-white/[0.05]">
                      {org.models.map((m) => (
                        <div key={m.name} className="px-5 py-3.5 flex items-start justify-between gap-4 hover:bg-white/[0.03] transition-colors">
                          <div className="space-y-0.5 flex-1">
                            <div className="text-sm font-semibold text-white">{m.name}</div>
                            <div className="text-xs text-slate-400 leading-relaxed">{m.strength}</div>
                          </div>
                          <span className={`flex-shrink-0 text-[10px] font-semibold px-2.5 py-1 rounded-full ${TIER[m.tier] ?? "bg-white/10 text-slate-300"}`}>{m.tier}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
            <div className={`${GLASS} p-5 flex items-start gap-4`}>
              <div className="h-10 w-10 rounded-xl bg-yellow-500/15 border border-yellow-500/30 flex items-center justify-center flex-shrink-0">
                <Zap size={20} className="text-yellow-400" />
              </div>
              <p className="text-sm text-slate-300 leading-relaxed"><span className="font-semibold text-white">Rule of thumb: </span>Use Haiku/Flash/mini for classification, routing, summarization. Sonnet/GPT-4o for standard production tasks. Opus/GPT-5 for complex reasoning. o3/extended-thinking when depth matters more than speed.</p>
            </div>
          </section>

          {/* ─── 4. MARKET REALITY ─── */}
          <section>
            <motion.div {...FI}
              className="relative overflow-hidden rounded-3xl border border-rose-500/20 p-10 lg:p-14 space-y-8"
              style={{ background:"linear-gradient(135deg, #160510 0%, #0f0315 55%, #0c0e1a 100%)" }}
            >
              <div className="pointer-events-none absolute inset-0" style={{ backgroundImage:"radial-gradient(circle at 1px 1px, rgba(255,255,255,0.04) 1px, transparent 0)", backgroundSize:"24px 24px" }} />
              <div className="pointer-events-none absolute top-0 right-0 w-96 h-96 rounded-full opacity-25" style={{ background:"radial-gradient(circle, rgba(239,68,68,0.35) 0%, transparent 70%)" }} />

              <div className="relative space-y-3">
                <NeonBadge label="Market Reality" color="red" />
                <div className="flex items-end gap-5 flex-wrap">
                  <motion.div
                    className="text-8xl md:text-9xl font-heading font-black text-rose-400 leading-none"
                    animate={{ textShadow:["0 0 40px rgba(239,68,68,0.5)","0 0 80px rgba(239,68,68,0.85)","0 0 40px rgba(239,68,68,0.5)"] }}
                    transition={{ duration:3, repeat:Infinity, ease:"easeInOut" }}
                  >95%</motion.div>
                  <div className="pb-3">
                    <p className="text-2xl font-heading font-bold text-white">of GenAI pilots fail to scale.</p>
                    <p className="text-slate-400 mt-1">The gap between &ldquo;demo&rdquo; and &ldquo;production&rdquo; is structural, not technical.</p>
                  </div>
                </div>
              </div>

              <div className="relative grid md:grid-cols-3 gap-5">
                {[
                  { id:"01", title:"Unrealistic expectations", body:"Assumptions about AI&apos;s capabilities without proper data foundations and integration strategy.", icon:AlertTriangle },
                  { id:"02", title:"Weak data foundations", body:"Messy, siloed, or incomplete data. 60–70% of AI use cases fail at the data layer, not the AI layer.", icon:Database },
                  { id:"03", title:"Horizontal thinking", body:"Building generic AI that tries to do everything instead of vertical, domain-specific solutions.", icon:Globe },
                ].map((r) => {
                  const Icon = r.icon;
                  return (
                    <div key={r.id} className="rounded-2xl border border-rose-500/20 bg-rose-500/[0.06] p-6 space-y-3 backdrop-blur-sm">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-lg bg-rose-500/15 border border-rose-500/30 flex items-center justify-center">
                          <Icon size={16} className="text-rose-400" />
                        </div>
                        <span className="text-xs font-bold text-rose-400">{r.id}</span>
                      </div>
                      <p className="text-sm font-semibold text-white">{r.title}</p>
                      <p className="text-sm text-slate-400 leading-relaxed">{r.body}</p>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </section>

          {/* ─── 5. GENERIC vs VERTICAL ─── */}
          <section className="space-y-10">
            <motion.div {...FI} className="space-y-3">
              <NeonBadge label="Vertical AI" color="teal" />
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-white">Generic AI helps.<br /><span className="text-emerald-400" style={{ textShadow:"0 0 30px rgba(16,185,129,0.4)" }}>Vertical AI compounds.</span></h2>
              <p className="text-slate-400 max-w-3xl">A generic AI knows everything about the world and nothing about your company. Vertical AI knows your domain, your data, and your workflows — and gets smarter every time it runs.</p>
            </motion.div>
            <div className="grid md:grid-cols-2 gap-5">
              <div className={`${GLASS} p-8 space-y-5`}>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center"><Globe size={20} className="text-slate-400" /></div>
                  <h3 className="text-base font-semibold text-slate-300">Generic Copilot</h3>
                </div>
                <ul className="space-y-3">
                  {["General knowledge, no domain depth","Separate interface — not embedded in workflows","Provides suggestions — human executes","Low adoption: users can&apos;t verify outputs","Same model for everyone — no competitive moat","Session-based — no memory, no compound learning"].map((t,i) => (
                    <li key={i} className="flex items-start gap-2.5"><XCircle size={15} className="text-slate-600 mt-0.5 flex-shrink-0" /><span className="text-sm text-slate-400">{t}</span></li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl border border-emerald-500/30 p-8 space-y-5" style={{ background:"linear-gradient(135deg, rgba(16,185,129,0.07) 0%, rgba(255,255,255,0.01) 100%)", boxShadow:"0 0 40px rgba(16,185,129,0.06)" }}>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center" style={{ boxShadow:"0 0 20px rgba(16,185,129,0.3)" }}><Target size={20} className="text-emerald-400" /></div>
                  <h3 className="text-base font-semibold text-emerald-300">Vertical AI System</h3>
                </div>
                <ul className="space-y-3">
                  {["Deep domain knowledge: your products, your KPIs, your language","Embedded inside your existing tools and workflows","Executes actions — creates tickets, sends alerts, updates records","High adoption: users trust it because it knows their context","Proprietary edge — your data trains your advantage","Persistent memory — gets better every time it runs"].map((t) => (
                    <li key={t} className="flex items-start gap-2.5"><CheckCircle size={15} className="text-emerald-400 mt-0.5 flex-shrink-0" /><span className="text-sm text-slate-200">{t}</span></li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="rounded-2xl border border-amber-500/20 bg-amber-500/[0.05] p-5 flex items-start gap-4">
              <AlertTriangle size={19} className="text-amber-400 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-slate-300 leading-relaxed">Generic AI keeps everyone at the same level. Vertical AI built on your data creates an advantage competitors can&apos;t replicate — because they don&apos;t have your data, your domain knowledge, or your operational history.</p>
            </div>
          </section>

          {/* ─── 6. PRODUCTION EXAMPLES ─── */}
          <section className="space-y-10">
            <motion.div {...FI} className="space-y-3">
              <NeonBadge label="Real-world deployments 2025–2026" color="violet" />
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-white">What vertical AI looks like in production</h2>
              <p className="text-slate-400 max-w-2xl">Operational systems running at companies that chose to build vertical, domain-specific AI.</p>
            </motion.div>
            <div className="grid md:grid-cols-2 gap-5">
              {verticalExamples.map((ex, i) => {
                const c = C[ex.color]; const Icon = ex.icon;
                return (
                  <motion.div key={ex.title} initial={{ opacity:0,y:16 }} animate={{ opacity:1,y:0 }} transition={{ delay:i*0.06 }}
                    className={`rounded-2xl border ${c.border} p-6 space-y-4 hover:shadow-lg transition-all`}
                    style={{ background:"rgba(255,255,255,0.025)" }}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`h-8 w-8 rounded-lg flex items-center justify-center ${c.icon}`} style={{ boxShadow:c.glow }}><Icon size={15} /></div>
                      <span className={`text-[10px] font-bold uppercase tracking-[0.18em] ${c.text}`}>{ex.domain}</span>
                    </div>
                    <div className="space-y-1.5">
                      <h3 className="text-sm font-semibold text-white">{ex.title}</h3>
                      <p className="text-sm text-slate-400 leading-relaxed">{ex.description}</p>
                    </div>
                    <div className={`rounded-xl border ${c.border} ${c.bg} px-4 py-3`}>
                      <p className={`text-[10px] font-bold uppercase tracking-wide ${c.text} mb-0.5`}>Outcome</p>
                      <p className={`text-sm font-semibold ${c.text}`}>{ex.outcome}</p>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {ex.tools.map((t) => <span key={t} className="text-[10px] bg-white/5 border border-white/[0.08] text-slate-400 px-2.5 py-1 rounded-full">{t}</span>)}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </section>

          {/* ─── 7. BUILD STEPS ─── */}
          <section className="space-y-10">
            <motion.div {...FI} className="space-y-3">
              <NeonBadge label="How to build one" color="emerald" />
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-white">Six steps to a production vertical AI system</h2>
            </motion.div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {buildSteps.map((step, i) => {
                const Icon = step.icon;
                return (
                  <motion.div key={step.n} initial={{ opacity:0,y:16 }} animate={{ opacity:1,y:0 }} transition={{ delay:i*0.06 }}
                    className="group rounded-2xl border border-white/[0.07] bg-white/[0.025] p-6 space-y-4 hover:border-emerald-500/30 hover:bg-emerald-500/[0.04] transition-all"
                  >
                    <div className="flex items-start justify-between">
                      <div className="h-10 w-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center group-hover:border-emerald-500/40 transition-colors">
                        <Icon size={19} className="text-emerald-400" />
                      </div>
                      <span className="text-3xl font-heading font-black text-white/10 group-hover:text-emerald-500/25 transition-colors leading-none">{step.n}</span>
                    </div>
                    <h3 className="text-sm font-semibold text-white">{step.title}</h3>
                    <p className="text-sm text-slate-400 leading-relaxed">{step.desc}</p>
                  </motion.div>
                );
              })}
            </div>
          </section>

          {/* ─── 8. AI MINDSET / SYSTEM VIEW ─── */}
          <motion.div {...FI} className={`${GLASS} p-10 lg:p-14 space-y-6`}>
            <NeonBadge label="AI Mindset" color="violet" />
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-white">AI must be viewed as a system.</h2>
            <p className="text-slate-400 leading-relaxed max-w-4xl">Any AI tool should sit cleanly inside your operating system — wired to real data, real APIs, and governed outputs. That&apos;s how you compound gains instead of running isolated pilots.</p>
            <div className="overflow-hidden rounded-2xl border border-white/[0.06]">
              <SystemViewCard layoutId="home-system-view" variant="expanded" showDetailPanel={true} showCaption={true} showSubtitles={true} />
            </div>
          </motion.div>

          {/* ─── 9. WHAT WORKS ─── */}
          <motion.div {...FI} className={`${GLASS} p-10 space-y-6`}>
            <NeonBadge label="What Works" color="emerald" />
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-white">LLMs are AI. The system around them makes them compound.</h2>
            <p className="text-slate-400 leading-relaxed max-w-4xl">Connect them to your data, APIs, and schemas to get enterprise-grade outcomes instead of isolated demos.</p>
            <div className="rounded-2xl overflow-hidden border border-white/[0.06]">
              <Image src="/what-works/evolution-arc.png" alt="AI evolution arc" width={1212} height={615} sizes="(max-width: 768px) 100vw, 80vw" quality={95} priority className="w-full h-auto object-contain" />
            </div>
          </motion.div>

          {/* ─── 10. AGENTS DARK ─── */}
          <section>
            <motion.div {...FI}
              className="relative overflow-hidden rounded-3xl border border-violet-500/20 p-10 lg:p-14 space-y-8"
              style={{ background:"linear-gradient(135deg, #0a0318 0%, #07041e 55%, #0c0e1a 100%)" }}
            >
              <div className="pointer-events-none absolute inset-0" style={{ backgroundImage:"radial-gradient(circle at 1px 1px, rgba(255,255,255,0.04) 1px, transparent 0)", backgroundSize:"24px 24px" }} />
              <div className="pointer-events-none absolute top-0 right-0 w-96 h-96 rounded-full opacity-20" style={{ background:"radial-gradient(circle, rgba(139,92,246,0.4) 0%, transparent 70%)" }} />
              <div className="pointer-events-none absolute bottom-0 left-0 w-64 h-64 rounded-full opacity-15" style={{ background:"radial-gradient(circle, rgba(16,185,129,0.4) 0%, transparent 70%)" }} />

              <div className="relative space-y-4 max-w-3xl">
                <NeonBadge label="Agent Architecture" color="violet" />
                <h2 className="text-4xl md:text-5xl font-heading font-black text-white leading-tight">
                  LLMs think.<br /><span className="text-violet-400" style={{ textShadow:"0 0 40px rgba(139,92,246,0.65)" }}>Agents act.</span>
                </h2>
                <p className="text-slate-400 leading-relaxed text-lg">
                  A language model responds to prompts. An AI agent uses tools, executes tasks, and operates autonomously. The gap between these two is the gap between &ldquo;impressive demo&rdquo; and &ldquo;operational leverage.&rdquo;
                </p>
              </div>

              <div className="relative grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { title:"Tool access", desc:"Calls external APIs, reads files, runs code, browses the web, queries databases.", icon:Network, color:"emerald" },
                  { title:"Memory", desc:"Short-term: the context window. Long-term: a vector database with domain knowledge.", icon:Database, color:"violet" },
                  { title:"Planning", desc:"Decomposes a goal into steps, evaluates progress, adapts when a step fails.", icon:Layers, color:"cyan" },
                  { title:"Autonomy within constraints", desc:"Operates independently on pre-defined tasks, stops at defined limits, escalates when uncertain.", icon:Shield, color:"indigo" },
                ].map((item) => {
                  const Icon = item.icon; const c = C[item.color];
                  return (
                    <div key={item.title} className={`rounded-xl border ${c.border} bg-white/[0.03] p-5 space-y-3 hover:bg-white/[0.06] transition-colors`}>
                      <div className={`h-8 w-8 rounded-lg flex items-center justify-center ${c.icon}`} style={{ boxShadow:c.glow }}><Icon size={16} /></div>
                      <h3 className="text-sm font-semibold text-white">{item.title}</h3>
                      <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </section>

          {/* ─── 11. FIVE PATTERNS ─── */}
          <section className="space-y-10">
            <motion.div {...FI} className="space-y-3">
              <NeonBadge label="Five production patterns" color="violet" />
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-white">How agents are actually built</h2>
              <p className="text-slate-400 max-w-3xl">There is no single &ldquo;agentic architecture.&rdquo; These five patterns cover the vast majority of production use cases.</p>
            </motion.div>
            <div className="space-y-4">
              {agentPatterns.map((p, i) => {
                const c = C[p.color]; const Icon = p.icon;
                return (
                  <motion.div key={p.name} initial={{ opacity:0,x:-12 }} animate={{ opacity:1,x:0 }} transition={{ delay:i*0.07 }}
                    className={`rounded-2xl border ${c.border} p-7 space-y-5`} style={{ background:"rgba(255,255,255,0.025)" }}
                  >
                    <div className="flex items-start gap-5">
                      <div className={`flex-shrink-0 h-11 w-11 rounded-xl flex items-center justify-center ${c.icon}`} style={{ boxShadow:c.glow }}><Icon size={20} /></div>
                      <div className="space-y-1.5 flex-1">
                        <div className="flex items-center gap-2.5">
                          <span className={`text-xs font-bold ${c.text}`}>{p.n}</span>
                          <h3 className="text-base font-semibold text-white">{p.name}</h3>
                        </div>
                        <p className="text-sm text-slate-400 leading-relaxed">{p.description}</p>
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4 pl-16">
                      <div className="rounded-xl bg-white/[0.03] border border-white/[0.06] p-4 space-y-1.5">
                        <p className="text-[10px] font-bold uppercase tracking-wide text-slate-500">When to use</p>
                        <p className="text-sm text-slate-300 leading-relaxed">{p.when}</p>
                      </div>
                      <div className={`rounded-xl ${c.bg} border ${c.border} p-4 space-y-1.5`}>
                        <p className={`text-[10px] font-bold uppercase tracking-wide ${c.text}`}>Example</p>
                        <p className="text-sm text-slate-300 leading-relaxed">{p.example}</p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </section>

          {/* ─── 12. STACK ─── */}
          <section className="space-y-10">
            <motion.div {...FI} className="space-y-3">
              <NeonBadge label="Agent infrastructure" color="indigo" />
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-white">Production agent stack in 2026</h2>
            </motion.div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {agentStack.map((row) => {
                const c = C[row.color]; const Icon = row.icon;
                return (
                  <div key={row.layer} className={`rounded-2xl border ${c.border} ${c.bg} p-6 space-y-3`}>
                    <div className="flex items-center gap-3">
                      <div className={`h-9 w-9 rounded-xl flex items-center justify-center ${c.icon}`} style={{ boxShadow:c.glow }}><Icon size={17} /></div>
                      <h3 className="text-sm font-semibold text-white">{row.layer}</h3>
                    </div>
                    <p className="text-xs text-slate-400">{row.role}</p>
                    <p className="text-xs text-slate-300">{row.examples}</p>
                  </div>
                );
              })}
            </div>
          </section>

          {/* ─── 13. FAILURE MODES ─── */}
          <section className="space-y-10">
            <motion.div {...FI} className="space-y-3">
              <NeonBadge label="Production reality" color="red" />
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-white">How agents fail — and how to prevent it</h2>
              <p className="text-slate-400 max-w-2xl">Agents that work in demos fail in production for predictable reasons.</p>
            </motion.div>
            <div className="grid md:grid-cols-2 gap-4">
              {productionFailures.map((f) => (
                <div key={f.failure} className="rounded-2xl border border-red-500/20 bg-red-500/[0.04] p-6 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-lg bg-red-500/15 border border-red-500/30 flex items-center justify-center"><XCircle size={15} className="text-red-400" /></div>
                    <h3 className="text-sm font-semibold text-white">{f.failure}</h3>
                  </div>
                  <div className="space-y-2 text-sm pl-11">
                    <p className="text-slate-400"><span className="text-[10px] font-bold uppercase tracking-wide text-slate-500">Why: </span>{f.cause}</p>
                    <p className="text-slate-300"><span className="text-[10px] font-bold uppercase tracking-wide text-emerald-400">Fix: </span>{f.fix}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ─── 14. BENCHMARKS ─── */}
          <section className="space-y-10">
            <motion.div {...FI} className="space-y-3">
              <NeonBadge label="Benchmarks" color="blue" />
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-white">Agent capability: 2023 vs. 2026</h2>
              <p className="text-slate-400 max-w-2xl">Tasks that required human experts now run autonomously. The jump is not incremental.</p>
            </motion.div>
            <div className="grid md:grid-cols-2 gap-5">
              {benchmarks2026.map((b, i) => {
                const c = C[b.color];
                const glowColor = { emerald:"#34d399", violet:"#a78bfa", cyan:"#22d3ee", indigo:"#818cf8" }[b.color] ?? "#34d399";
                return (
                  <motion.div key={b.name} initial={{ opacity:0,y:12 }} animate={{ opacity:1,y:0 }} transition={{ delay:i*0.08 }}
                    className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-6 space-y-4"
                  >
                    <h3 className="text-sm font-semibold text-white">{b.name}</h3>
                    <div className="flex items-center gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-black text-slate-600">{b.score2023}</div>
                        <div className="text-xs text-slate-500 mt-0.5">2023</div>
                      </div>
                      <ArrowRight size={17} className={c.text} />
                      <div className="text-center">
                        <div className={`text-2xl font-black ${c.text}`} style={{ textShadow:`0 0 20px ${glowColor}` }}>{b.score2026}</div>
                        <div className="text-xs text-slate-500 mt-0.5">2026</div>
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <div className="h-2 rounded-full bg-white/[0.06] overflow-hidden">
                        <motion.div className="h-full rounded-full" style={{ background:glowColor, boxShadow:`0 0 10px ${glowColor}` }}
                          initial={{ width:0 }} animate={{ width:`${b.pct}%` }}
                          transition={{ delay:i*0.08+0.3, duration:0.9, ease:"easeOut" }}
                        />
                      </div>
                      <p className="text-xs text-slate-400">{b.meaning}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </section>

          {/* ─── 15. OPS IMPACT ─── */}
          <section className="space-y-10">
            <motion.div {...FI} className="space-y-3">
              <NeonBadge label="Operational impact — measured" color="teal" />
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-white">What AI is delivering in operations today</h2>
              <p className="text-slate-400 max-w-2xl">Outcomes from companies that went past pilot stage and are running AI in production.</p>
            </motion.div>
            <div className="space-y-4">
              {operationsImpact.map((row, i) => {
                const c = C[row.color]; const Icon = row.icon;
                return (
                  <motion.div key={row.function} initial={{ opacity:0,y:10 }} animate={{ opacity:1,y:0 }} transition={{ delay:i*0.05 }}
                    className="rounded-2xl border border-white/[0.07] overflow-hidden" style={{ background:"rgba(255,255,255,0.02)" }}
                  >
                    <div className="border-b border-white/[0.06] bg-white/[0.02] px-6 py-3 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`h-7 w-7 rounded-lg flex items-center justify-center ${c.icon}`}><Icon size={13} /></div>
                        <h3 className="text-sm font-semibold text-white">{row.function}</h3>
                      </div>
                      <span className={`text-[10px] font-bold ${c.text} border ${c.border} ${c.bg} px-3 py-1 rounded-full`}>{row.roi}</span>
                    </div>
                    <div className="grid sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-white/[0.05]">
                      <div className="px-6 py-4 space-y-1.5">
                        <p className="text-[10px] font-bold uppercase tracking-wide text-slate-500 flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-slate-600" />Before</p>
                        <p className="text-sm text-slate-400 leading-relaxed">{row.before}</p>
                      </div>
                      <div className="px-6 py-4 space-y-1.5">
                        <p className={`text-[10px] font-bold uppercase tracking-wide ${c.text} flex items-center gap-1.5`}><span className={`h-1.5 w-1.5 rounded-full ${c.text.replace("text-","bg-")}`} />After</p>
                        <p className="text-sm text-slate-200 leading-relaxed">{row.after}</p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </section>

          {/* ─── 16. WATCH LIST ─── */}
          <section className="space-y-10">
            <motion.div {...FI} className="space-y-3">
              <NeonBadge label="What to watch" color="pink" />
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-white">Five developments that will matter most</h2>
            </motion.div>
            <div className="grid md:grid-cols-2 gap-5">
              {watchList.map((w, i) => {
                const c = C[w.color]; const Icon = w.icon;
                return (
                  <motion.div key={w.name} initial={{ opacity:0,y:14 }} animate={{ opacity:1,y:0 }} transition={{ delay:i*0.06 }}
                    className="rounded-2xl border border-white/[0.07] p-7 space-y-4 hover:border-white/20 transition-all"
                    style={{ background:"rgba(255,255,255,0.025)" }}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className={`h-9 w-9 rounded-xl flex items-center justify-center flex-shrink-0 ${c.icon}`} style={{ boxShadow:c.glow }}><Icon size={17} /></div>
                        <h3 className="text-base font-semibold text-white">{w.name}</h3>
                      </div>
                      <span className={`flex-shrink-0 text-[10px] font-bold border ${c.border} ${c.bg} ${c.text} px-2.5 py-1 rounded-full whitespace-nowrap`}>{w.horizon}</span>
                    </div>
                    <p className="text-sm text-slate-400 leading-relaxed pl-12">{w.desc}</p>
                  </motion.div>
                );
              })}
            </div>
          </section>

          {/* ─── 17. USER vs OPERATOR ─── */}
          <section>
            <div className="relative overflow-hidden rounded-3xl border border-white/[0.07] p-10 lg:p-14 space-y-8"
              style={{ background:"linear-gradient(135deg, #060e18 0%, #080c1e 55%, #0a0718 100%)" }}
            >
              <div className="pointer-events-none absolute inset-0" style={{ backgroundImage:"radial-gradient(circle at 1px 1px, rgba(255,255,255,0.05) 1px, transparent 0)", backgroundSize:"28px 28px" }} />
              <div className="pointer-events-none absolute top-0 right-0 w-80 h-80 rounded-full opacity-12" style={{ background:"radial-gradient(circle, rgba(16,185,129,0.4) 0%, transparent 70%)" }} />
              <div className="pointer-events-none absolute bottom-0 left-0 w-64 h-64 rounded-full opacity-12" style={{ background:"radial-gradient(circle, rgba(139,92,246,0.4) 0%, transparent 70%)" }} />

              <div className="relative">
                <NeonBadge label="The position to take in 2026" color="emerald" />
                <h2 className="text-3xl md:text-4xl font-heading font-bold text-white leading-tight mt-3">
                  The gap between AI users<br />and AI operators is widening.
                </h2>
              </div>

              <div className="relative grid md:grid-cols-2 gap-5">
                <div className="rounded-2xl border border-white/[0.07] bg-white/[0.03] p-6 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center"><Globe size={17} className="text-slate-400" /></div>
                    <h3 className="font-semibold text-slate-300">AI user</h3>
                  </div>
                  <ul className="space-y-2.5">
                    {["Uses ChatGPT, Claude.ai, Gemini interchangeably","Prompts for individual tasks in isolation","No persistent knowledge base or domain memory","Dependent on the same tools as everyone else","Productivity gains: 10–30%"].map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-sm text-slate-400"><span className="h-1.5 w-1.5 rounded-full bg-slate-600 mt-1.5 flex-shrink-0" />{item}</li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/[0.05] p-6 space-y-4" style={{ boxShadow:"0 0 40px rgba(16,185,129,0.07)" }}>
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center" style={{ boxShadow:"0 0 20px rgba(16,185,129,0.3)" }}><Sparkles size={17} className="text-emerald-400" /></div>
                    <h3 className="font-semibold text-emerald-400">AI operator</h3>
                  </div>
                  <ul className="space-y-2.5">
                    {["Builds systems that use AI — not just uses AI","Orchestrates agents across end-to-end workflows","Domain knowledge stored, indexed, and queryable","Proprietary data and systems create competitive moat","Leverage gains: 5–10× and compounding"].map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-sm text-slate-200"><CheckCircle size={14} className="text-emerald-400 mt-0.5 flex-shrink-0" />{item}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <p className="relative text-slate-400 leading-relaxed max-w-3xl">
                The operations professional who understands AI as infrastructure — who can design the system, wire the tools, and govern the outputs — is the most valuable person in any organization in 2026. This map exists to create that person.
              </p>
            </div>
          </section>

          {/* ─── 18. CTA ─── */}
          <section>
            <motion.div {...FI}
              className="relative overflow-hidden rounded-3xl border border-emerald-500/25 p-10 lg:p-14 space-y-6"
              style={{ background:"linear-gradient(135deg, #05160e 0%, #030e1a 55%, #0c0e1a 100%)" }}
            >
              <div className="pointer-events-none absolute inset-0" style={{ backgroundImage:"radial-gradient(circle at 1px 1px, rgba(255,255,255,0.05) 1px, transparent 0)", backgroundSize:"24px 24px" }} />
              <div className="pointer-events-none absolute right-0 top-0 w-80 h-80 opacity-20" style={{ background:"radial-gradient(circle, rgba(16,185,129,0.4) 0%, transparent 70%)" }} />
              <div className="relative flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center" style={{ boxShadow:"0 0 20px rgba(16,185,129,0.3)" }}>
                  <Rocket size={20} className="text-emerald-400" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-400">Understanding comes before execution</span>
              </div>
              <h2 className="relative text-3xl md:text-4xl font-heading font-bold text-white leading-tight">
                Acting without a system view creates fragility.<br />
                <span className="text-emerald-400" style={{ textShadow:"0 0 40px rgba(16,185,129,0.5)" }}>Acting with one creates leverage.</span>
              </h2>
              <p className="relative text-slate-400 leading-relaxed max-w-3xl">
                Use this map to decide how far to go before you commit teams and budgets. The first agent is always the hardest. The tenth is operational infrastructure.
              </p>
              <div className="relative flex flex-col sm:flex-row gap-3">
                <Link href="/ai-mindset" className="inline-flex items-center gap-2 justify-center rounded-xl bg-emerald-500 hover:bg-emerald-400 px-6 py-3 text-sm font-semibold text-white transition-all" style={{ boxShadow:"0 0 30px rgba(16,185,129,0.45)" }}>
                  Start with AI Mindset <ArrowRight size={15} />
                </Link>
                <Link href="/execution-checklist" className="inline-flex items-center gap-2 justify-center rounded-xl border border-white/10 bg-white/[0.04] hover:bg-white/10 px-6 py-3 text-sm font-semibold text-slate-200 transition">
                  Execution Checklist <ChevronRight size={15} />
                </Link>
              </div>
            </motion.div>
          </section>

        </div>
      </main>
    </div>
  );
}
