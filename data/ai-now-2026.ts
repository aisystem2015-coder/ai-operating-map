export interface MajorShift {
  shift: string;
  what: string;
  impact: string;
}

export const MAJOR_SHIFTS_2026: MajorShift[] = [
  { shift: "MCP becomes the standard", what: "Model Context Protocol, open-sourced by Anthropic in 2024, became the universal connector layer for AI tools in 2025–2026. 300+ connectors available. Every major AI tool now speaks MCP.", impact: "Infrastructure" },
  { shift: "Agentic systems replace copilots", what: "The market shifted from AI that assists to AI that acts. Claude Code, Cursor, Devin, and multi-agent frameworks (n8n, LangGraph, CrewAI) power end-to-end business processes without human intervention at each step.", impact: "Workflow" },
  { shift: "On-device AI goes mainstream", what: "Apple Intelligence, Qualcomm Snapdragon X Elite NPUs, and Samsung Galaxy AI bring capable models to personal devices. Privacy-preserving AI becomes the default for personal use.", impact: "Privacy" },
  { shift: "Physical AI arrives", what: "Figure 02, Apptronik Apollo, and Tesla Optimus begin limited commercial deployment — reasoning models in robot bodies. Industrial AI shifts from software-only to embodied.", impact: "Physical" },
  { shift: "Reasoning models change the ceiling", what: "OpenAI o3, Anthropic extended thinking, and Google Gemini Thinking show that thinking before answering dramatically changes what AI can solve. PhD-level science becomes single-agent tasks.", impact: "Capability" },
  { shift: "Open source closes the gap", what: "DeepSeek R1 matched GPT-4 performance at open-source cost. The cost of deploying frontier-quality AI dropped 95% between 2023 and 2026. Advanced AI is now accessible to anyone.", impact: "Accessibility" },
  { shift: "Knowledge externalization as strategy", what: "The most effective AI practitioners treat their knowledge as structured infrastructure. Obsidian + MCP, Notion databases, and personal vector stores become standard professional tools.", impact: "Personal" },
];

export interface ModelEntry {
  name: string;
  tier: string;
  strength: string;
}

export interface ModelOrg {
  org: string;
  models: ModelEntry[];
}

export const MODELS_2026: ModelOrg[] = [
  { org: "Anthropic", models: [
    { name: "Claude Fable 5", tier: "Frontier", strength: "Most capable — complex reasoning, long-form analysis, agentic workflows" },
    { name: "Claude Opus 4.8", tier: "Expert", strength: "Deep reasoning, coding, multi-step planning. Best for technical depth." },
    { name: "Claude Sonnet 4.6", tier: "Default", strength: "The 80/20 model — excellent quality at production speed and cost" },
    { name: "Claude Haiku 4.5", tier: "Fast", strength: "Sub-second responses, low cost. Classification, routing, summarization." },
  ]},
  { org: "OpenAI", models: [
    { name: "GPT-5", tier: "Frontier", strength: "Multimodal, tool-use, long context. Strong on structured reasoning." },
    { name: "o3 / o4", tier: "Reasoning", strength: "Thinks before it answers. Best for math, science, and complex logic." },
    { name: "GPT-4o mini", tier: "Fast", strength: "Low-cost, fast — widely deployed in consumer applications." },
  ]},
  { org: "Google", models: [
    { name: "Gemini 2.5 Ultra", tier: "Frontier", strength: "1M+ token context window. Best for processing entire codebases or document sets." },
    { name: "Gemini 2.5 Flash", tier: "Fast", strength: "Speed-optimized, highly cost-effective for high-volume tasks." },
  ]},
  { org: "Open Source", models: [
    { name: "Llama 4 (Meta)", tier: "Open", strength: "Multimodal, runs locally. Changed the economics of private deployment." },
    { name: "DeepSeek R2", tier: "Open", strength: "Frontier-level reasoning at open-source cost. Shocked the market in 2025." },
    { name: "Mistral Large", tier: "Open", strength: "European alternative, strong multilingual capabilities." },
  ]},
];

export interface Benchmark {
  name: string;
  score2023: string;
  score2026: string;
  meaning: string;
  pct: number;
}

export const BENCHMARKS_2026: Benchmark[] = [
  { name: "SWE-bench (coding)", score2023: "< 5%", score2026: "65–80%", meaning: "Agents now autonomously fix real GitHub issues", pct: 72 },
  { name: "GAIA (general AI assistant)", score2023: "< 20%", score2026: "55–70%", meaning: "Complex multi-step tasks completed without human help", pct: 62 },
  { name: "Humanity's Last Exam", score2023: "n/a", score2026: "40–60%", meaning: "PhD-level questions across science, law, medicine", pct: 50 },
  { name: "ARC-AGI", score2023: "< 10%", score2026: "75–85%", meaning: "Novel reasoning that required human-level adaptation", pct: 80 },
];

export interface OperationsImpactRow {
  function: string;
  before: string;
  after: string;
  roi: string;
}

export const OPERATIONS_IMPACT: OperationsImpactRow[] = [
  { function: "Supply Chain", before: "Weekly manual demand review, spreadsheet-based forecasting, reactive inventory", after: "Daily AI-driven demand signals, automated PO generation, predictive exception alerts", roi: "15–30% cost reduction" },
  { function: "Customer Operations", before: "Tier-1 support handled by humans, 48-hour average resolution time", after: "70% deflection by AI agents, 4-hour resolution, humans handle complex cases with full context", roi: "40–60% support cost ↓" },
  { function: "Finance / FP&A", before: "3-day month-end close, manual variance commentary, static budgets", after: "Hours-long close, AI-drafted commentary reviewed by humans, rolling AI-updated forecasts", roi: "60% close time ↓" },
  { function: "IT / DevOps", before: "Manual ticket triage, human-only code review, reactive incident response", after: "AI-routed tickets, AI-assisted PR review at scale, anomaly detection and first-response automation", roi: "50% MTTR ↓, 3× throughput" },
  { function: "HR / Talent", before: "Manual resume screening, reactive workforce planning, generic onboarding", after: "AI-first screening against structured criteria, predictive workforce models, personalized onboarding", roi: "70% faster time-to-hire" },
  { function: "Content / Marketing", before: "Manual content creation, slow campaign iteration, generic messaging", after: "AI-generated content in brand voice, automated A/B testing, personalized messaging at scale", roi: "5× content throughput" },
];

export interface WatchItem {
  name: string;
  desc: string;
  horizon: string;
}

export const WATCH_LIST: WatchItem[] = [
  { name: "Reasoning-native workflows", desc: "As o3-level reasoning becomes standard, AI shifts from completing tasks to solving problems. Organizations that redesign workflows around reasoning agents will have a structural advantage.", horizon: "Now — 2027" },
  { name: "AI memory infrastructure", desc: "Persistent, evolving AI memory (personal knowledge graphs, organizational memory) is the next foundation layer. Obsidian + MCP is the early pattern. Enterprise versions are being built.", horizon: "2026 — 2028" },
  { name: "Physical-digital AI integration", desc: "Reasoning models that operate robots and physical systems will transform manufacturing, logistics, and field operations. The same model that drafts your strategy memo will eventually operate your warehouse.", horizon: "2026 — 2030" },
  { name: "AI governance as infrastructure", desc: "The EU AI Act is live. US framework is developing. Organizations without AI governance infrastructure face regulatory and reputational exposure. Governance is no longer optional.", horizon: "Now" },
  { name: "Multi-modal as default", desc: "Text-only AI is already an edge case. Voice, image, video, and code are native inputs for 2026 frontier models. The next wave of vertical AI will be built for multi-modal operations.", horizon: "Now — 2027" },
];
