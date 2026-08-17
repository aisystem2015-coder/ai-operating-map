"use client";

import { motion } from "framer-motion";
import RankedBarChart from "../charts/RankedBarChart";
import { CATEGORICAL } from "../charts/tokens";
import { BENCHMARKS_2026 } from "@/data/ai-now-2026";

const agentPatterns = [
  {
    n: "01",
    name: "ReAct (Reason + Act)",
    description:
      "The agent alternates between reasoning about a problem and taking an action. It observes the result of each action before deciding the next step. The most common pattern for tool-using agents.",
    when: "When the path to a solution isn't known upfront and the agent must discover it by doing.",
    example: "Research agent: searches the web, reads results, decides what to search next, writes a summary.",
  },
  {
    n: "02",
    name: "Plan-and-Execute",
    description:
      "A planning model generates a full step-by-step plan first. An execution model carries out each step. This separates strategic reasoning from tactical action — better for complex, predictable workflows.",
    when: "When the workflow has known structure but requires AI reasoning at each step.",
    example: "Month-end close agent: plans the entire reconciliation sequence, then executes step by step.",
  },
  {
    n: "03",
    name: "Multi-Agent (Orchestrator + Specialists)",
    description:
      "One orchestrator agent decomposes a complex task and delegates subtasks to specialized agents. Each specialist is optimized for its domain. Results flow back to the orchestrator for synthesis.",
    when: "When a task requires multiple domains of expertise, parallel execution, or very long context.",
    example: "Proposal agent: orchestrator delegates market research to one agent, pricing analysis to another, writing to a third.",
  },
  {
    n: "04",
    name: "MCP-Connected (Tool Execution)",
    description:
      "The agent has direct access to external tools via Model Context Protocol (MCP) — databases, APIs, file systems, calendars, communication tools. It acts in the real world, not just in chat.",
    when: "When the agent must read from or write to production systems as part of its work.",
    example: "LinkedIn content agent: drafts post → publishes via Playwright → logs performance in Airtable → reports back.",
  },
  {
    n: "05",
    name: "Human-in-the-Loop",
    description:
      "The agent completes analysis and proposes an action, then pauses for human approval before executing. Critical for high-stakes, irreversible, or high-cost decisions.",
    when: "When the consequences of an error are significant — financial, legal, operational.",
    example: "Procurement agent: recommends a purchase order → human approves → agent submits to ERP.",
  },
];

const autonomyModes = [
  {
    title: "Copilot",
    desc: "Suggests, drafts, or recommends — a human does every action. The agent never touches a live system on its own.",
    example: "Drafts a reply, proposes a fix, sketches a plan. You review, edit, and send.",
  },
  {
    title: "Autopilot",
    desc: "Executes routine, pre-approved actions on its own within a defined scope, and escalates anything outside that scope to a human.",
    example: "Auto-triages tickets and resolves the common 70%; hands off anything unusual with full context.",
  },
  {
    title: "Self-Driving",
    desc: "Operates end-to-end on a goal with minimal supervision — plans, acts, corrects course, and only checks in on exceptions or hard constraints.",
    example: "Runs an entire reconciliation or campaign cycle unattended, reporting outcomes rather than asking permission.",
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
  {
    failure: "Hallucination without guardrails",
    cause: "Agent invents facts, especially in long reasoning chains",
    fix: "Add retrieval (RAG) for factual claims. Validate outputs against schemas. Use smaller, focused prompts.",
  },
  {
    failure: "Tool call loops",
    cause: "Agent gets stuck calling the same tool repeatedly without progress",
    fix: "Implement step limits and loop detection. Add explicit termination conditions.",
  },
  {
    failure: "Context overflow",
    cause: "Long agent runs fill the context window; early instructions are forgotten",
    fix: "Compress intermediate results. Use summarization agents. Structure tasks to stay within window.",
  },
  {
    failure: "No observability",
    cause: "Agent acts but no one can audit what it did or why",
    fix: "Log every tool call, reasoning step, and output. Treat agent traces like production logs.",
  },
  {
    failure: "Cascading errors",
    cause: "A wrong decision early in the chain propagates through all downstream steps",
    fix: "Add validation checkpoints between steps. Use human gates at high-stakes branch points.",
  },
  {
    failure: "Permission creep",
    cause: "Agent is given too many tools 'just in case', then uses them incorrectly",
    fix: "Grant minimum viable permissions. Define explicit tool scope at deployment time.",
  },
];

export default function AgentPatternsSection() {
  return (
    <div className="space-y-20">
      {/* Five production patterns */}
      <section className="space-y-10">
        <div className="space-y-2">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-secondary">Five production patterns</p>
          <h3 className="text-3xl md:text-4xl font-heading font-semibold text-foreground leading-tight">
            How agents are actually built
          </h3>
          <p className="text-secondary leading-relaxed max-w-3xl">
            There is no single &ldquo;agentic architecture.&rdquo; These five patterns cover the vast majority of production use cases.
          </p>
        </div>
        <div className="space-y-5">
          {agentPatterns.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.45, ease: "easeOut" }}
              className="rounded-2xl border border-black/5 bg-white p-8 shadow-sm space-y-5"
            >
              <div className="flex items-start gap-5">
                <div className="flex-shrink-0 h-10 w-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-sm font-bold text-blue-700">{p.n}</div>
                <div className="space-y-2 flex-1">
                  <h4 className="text-xl font-heading font-semibold text-foreground">{p.name}</h4>
                  <p className="text-secondary leading-relaxed">{p.description}</p>
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4 pl-15">
                <div className="rounded-xl bg-slate-50 border border-black/5 p-4 space-y-1">
                  <p className="text-xs font-semibold uppercase tracking-wide text-secondary">When to use</p>
                  <p className="text-sm text-foreground">{p.when}</p>
                </div>
                <div className="rounded-xl bg-blue-50 border border-blue-100 p-4 space-y-1">
                  <p className="text-xs font-semibold uppercase tracking-wide text-blue-700">Example</p>
                  <p className="text-sm text-foreground">{p.example}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Copilot / Autopilot / Self-Driving — directly under Human-in-the-Loop */}
        <div className="space-y-4 pt-2">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-secondary">
            The autonomy spectrum for pattern 05
          </p>
          <div className="grid md:grid-cols-3 gap-5">
            {autonomyModes.map((mode) => (
              <div key={mode.title} className="hover-glow rounded-2xl border border-black/5 bg-white p-6 shadow-sm space-y-3">
                <h4 className="text-lg font-heading font-semibold text-foreground">{mode.title}</h4>
                <p className="text-sm text-secondary leading-relaxed">{mode.desc}</p>
                <p className="text-xs text-blue-700 bg-blue-50 border border-blue-100 rounded-lg px-3 py-2 leading-relaxed">{mode.example}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stack */}
      <section className="space-y-10">
        <div className="space-y-2">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-secondary">Agent infrastructure</p>
          <h3 className="text-3xl md:text-4xl font-heading font-semibold text-foreground leading-tight">
            What a production agent stack looks like in 2026
          </h3>
        </div>
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

      {/* Production Failures */}
      <section className="space-y-10">
        <div className="space-y-2">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-secondary">Production reality</p>
          <h3 className="text-3xl md:text-4xl font-heading font-semibold text-foreground leading-tight">
            How agents fail in production — and how to prevent it
          </h3>
        </div>
        <div className="grid md:grid-cols-2 gap-5">
          {productionFailures.map((f) => (
            <div key={f.failure} className="hover-glow rounded-2xl border border-black/5 bg-white p-6 shadow-sm space-y-4">
              <div className="flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-red-400 flex-shrink-0" />
                <h4 className="text-base font-semibold text-foreground">{f.failure}</h4>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex items-start gap-2">
                  <span className="text-secondary font-medium w-16 flex-shrink-0">Why:</span>
                  <p className="text-secondary leading-relaxed">{f.cause}</p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-blue-700 font-medium w-16 flex-shrink-0">Fix:</span>
                  <p className="text-foreground leading-relaxed">{f.fix}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Benchmarks */}
      <section className="space-y-10">
        <div className="space-y-2">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-secondary">How far we&apos;ve come</p>
          <h3 className="text-3xl md:text-4xl font-heading font-semibold text-foreground leading-tight">
            Agent capability in 2026 vs. 2023
          </h3>
        </div>
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

      {/* CTA */}
      <section className="rounded-3xl border border-black/5 bg-gradient-to-br from-white to-blue-50/40 p-10 shadow-sm space-y-5">
        <h3 className="text-3xl font-heading font-semibold text-foreground">
          Agents are not a future state. They are a design choice.
        </h3>
        <p className="text-secondary leading-relaxed max-w-3xl">
          The organizations seeing the most impact from agents in 2026 are not the ones who waited for the technology to mature. They started small, stayed disciplined about scope and guardrails, and built incrementally. The first agent is always the hardest. The tenth is operational infrastructure.
        </p>
      </section>
    </div>
  );
}
