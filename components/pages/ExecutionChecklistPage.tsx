"use client";

import { Fragment, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { CheckSquare, ChevronDown, ArrowRight } from "lucide-react";
import Navigation from "../Navigation";
import InteractiveGlow from "../ui/interactive-glow";
import { EXAMPLE_CASES } from "@/data/examples";
import { CATEGORICAL } from "../charts/tokens";

const IMMEDIATE_CHECKS = [
  {
    title: "Understand the technology",
    body: "You can place any initiative on the system map (inputs → reasoning → orchestration → tools & data → interface & outcomes) and explain what belongs where.",
  },
  {
    title: "Guide and direct development",
    body: "You are comfortable asking for, scoping, and steering builds or wraps that fit the system instead of chasing features or demos.",
  },
  {
    title: "Hands on with AI",
    body: "You can interact with and adjust the system—prompts, tools, flows—without breaking ownership or governance.",
  },
];

const TIERS = [
  {
    id: "foundational",
    label: "Foundational",
    subtitle: "Understanding the system",
    headline: "Literacy across the system map.",
    body: "This is where you learn what each layer does and why it exists. Execution without this turns into pilots that look promising but fail because basics like data quality, model limits, and placement were never internalized.",
    ifStop: "You can talk about the system, but you cannot yet run it.",
  },
  {
    id: "operational",
    label: "Operational",
    subtitle: "Automating the system",
    headline: "Make the system run without manual glue.",
    body: "This level turns understanding into motion: automations, agents, and guardrails that align with real operations. Execution here is about stability and repeatability.",
    ifStop: "You launch automation that drifts because ownership stays at the project level.",
  },
  {
    id: "advanced",
    label: "Advanced",
    subtitle: "Designing and evolving the system",
    headline: "Treat the system as living infrastructure.",
    body: "This level is about designing for change and compounding value: second-order effects, when to build, wrap, or buy, and how to evolve without losing ownership.",
    ifStop: "You can evolve the system deliberately. If you never reach it, every new requirement feels like a restart.",
  },
] as const;

const LAYERS = ["Data", "Reasoning / Models", "Orchestration", "Tools", "Interfaces", "Ownership & governance"] as const;

type CellKey = `${(typeof TIERS)[number]["id"]}-${(typeof LAYERS)[number]}`;

const MATRIX: Record<CellKey, { learn: string; outcome: string; failure: string }> = {
  "foundational-Data": {
    learn: "What data quality means (freshness, structure, lineage) and why models break without it.",
    outcome: "You can diagnose data readiness and stop bad inputs before they reach models.",
    failure: "You ship demos on brittle data that collapse in production.",
  },
  "foundational-Reasoning / Models": {
    learn: "What an LLM does and does not do; where structure, rules, or retrieval are required.",
    outcome: "You frame model use with clear intent and constraints.",
    failure: "You over-trust outputs and under-specify the work around the model.",
  },
  "foundational-Orchestration": {
    learn: "Why orchestration turns intent into reliable sequences instead of manual clicks.",
    outcome: "You can map a workflow to steps and understand where automation belongs.",
    failure: "People keep stitching workflows by hand and blame models for inconsistency.",
  },
  "foundational-Tools": {
    learn: "Why tools are distinct components for normalization, transformation, calculation.",
    outcome: "You can spot missing utilities and avoid overloading prompts.",
    failure: "Prompts become a catch-all and reliability erodes.",
  },
  "foundational-Interfaces": {
    learn: "How interfaces frame behavior and outcomes for users.",
    outcome: "You place dashboards, exports, and UIs correctly on the system map.",
    failure: "Users bypass the system; outcomes are unseen and untrusted.",
  },
  "foundational-Ownership & governance": {
    learn: "Why every component needs a named owner and what 'good' looks like.",
    outcome: "Questions and issues have a landing spot; learning compounds.",
    failure: "Ambiguity stalls progress and no one is accountable.",
  },
  "operational-Data": {
    learn: "Data contracts, validation, and monitoring that keep automations stable.",
    outcome: "You instrument freshness and schema changes before they break flows.",
    failure: "Automated steps fail unpredictably and the model gets blamed.",
  },
  "operational-Reasoning / Models": {
    learn: "How to constrain models in workflows: prompts with guardrails, retrieval boundaries, fallbacks.",
    outcome: "You design predictable model calls that stay within bounds.",
    failure: "Agents wander and require constant human correction.",
  },
  "operational-Orchestration": {
    learn: "Sequencing, retries, handoffs, and auditability that replace manual coordination.",
    outcome: "You can translate a business process into orchestrated steps.",
    failure: "Scripts sprawl and only the author can run them.",
  },
  "operational-Tools": {
    learn: "When to build utilities versus reuse; how to place and invoke them in flows.",
    outcome: "You add tools that strengthen the system instead of duplicating it.",
    failure: "Conflicting tools emerge and sources of truth fragment.",
  },
  "operational-Interfaces": {
    learn: "Interfaces that surface status, exceptions, and actions without exposing plumbing.",
    outcome: "Users see what the system is doing and can intervene safely.",
    failure: "People revert to manual work because automation is opaque.",
  },
  "operational-Ownership & governance": {
    learn: "Ownership shifts to system stewardship: uptime, data quality, change control.",
    outcome: "Drift is detected and corrected; changes have an owner.",
    failure: "No one has authority to adjust the system as it runs.",
  },
  "advanced-Data": {
    learn: "Design pipelines that can change safely: migrations, backfills, observability.",
    outcome: "You plan changes without breaking downstream behavior.",
    failure: "Every schema change is a fire drill.",
  },
  "advanced-Reasoning / Models": {
    learn: "When to update models, add retrieval, or redesign prompts and policies.",
    outcome: "You can roll forward and back with measured impact.",
    failure: "Regressions reach production and improvements stall.",
  },
  "advanced-Orchestration": {
    learn: "Versioning, feature flags, staged rollouts, and modeling second-order effects.",
    outcome: "You ship changes safely and understand their ripple effects.",
    failure: "Changes ship globally and failures cascade.",
  },
  "advanced-Tools": {
    learn: "Build, wrap, or buy decisions based on system leverage over time.",
    outcome: "You integrate capability without surrendering ownership of behavior or data.",
    failure: "The system devolves into disconnected products.",
  },
  "advanced-Interfaces": {
    learn: "Interfaces that adapt as the system evolves: new controls, impact visibility, safe intervention.",
    outcome: "Users stay aligned with system changes and adoption grows.",
    failure: "Under-the-hood changes never reach users; trust decays.",
  },
  "advanced-Ownership & governance": {
    learn: "Governance as operating rhythm: reviewing data, orchestration, and model changes with clear accountability.",
    outcome: "You can plan for second-order effects and retire capability responsibly.",
    failure: "Complexity grows faster than leverage and accountability dissolves.",
  },
};

function MaturityBoard() {
  const [selected, setSelected] = useState<{ tier: (typeof TIERS)[number]; layer: string } | null>(null);

  return (
    <div className="space-y-6">
      <div className="overflow-x-auto">
        <div
          className="grid gap-3 min-w-[720px] md:min-w-0"
          style={{ gridTemplateColumns: `140px repeat(${TIERS.length}, minmax(0, 1fr))` }}
        >
          <div />
          {TIERS.map((tier, i) => (
            <div key={tier.id} className="text-center pb-1">
              <div
                className="mx-auto mb-2 h-1.5 w-10 rounded-full"
                style={{ backgroundColor: CATEGORICAL[i % CATEGORICAL.length] }}
              />
              <div className="text-sm font-semibold text-foreground">{tier.label}</div>
              <div className="text-xs text-secondary/70">{tier.subtitle}</div>
            </div>
          ))}

          {LAYERS.map((layer) => (
            <Fragment key={layer}>
              <div className="flex items-center text-sm font-medium text-secondary pr-2">
                {layer}
              </div>
              {TIERS.map((tier) => {
                const key = `${tier.id}-${layer}` as CellKey;
                const cell = MATRIX[key];
                const isActive = selected?.tier.id === tier.id && selected?.layer === layer;
                const color = CATEGORICAL[TIERS.indexOf(tier) % CATEGORICAL.length];
                return (
                  <button
                    key={key}
                    onClick={() => setSelected(isActive ? null : { tier, layer })}
                    className={`hover-glow-flat text-left rounded-xl border px-3 py-3 shadow-sm cursor-pointer transition-all ${
                      isActive ? "border-black/15 bg-white shadow-md" : "border-black/5 bg-white"
                    }`}
                    style={isActive ? { boxShadow: `inset 3px 0 0 0 ${color}` } : undefined}
                  >
                    <div className="text-sm font-medium text-foreground leading-snug">{cell.outcome}</div>
                  </button>
                );
              })}
            </Fragment>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {selected && (
          <motion.div
            key={`${selected.tier.id}-${selected.layer}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="rounded-2xl border border-black/5 bg-white shadow-sm p-6 space-y-4"
          >
            <div className="flex items-center gap-3">
              <span
                className="text-xs font-semibold uppercase tracking-[0.14em] px-2.5 py-1 rounded-full text-white"
                style={{ backgroundColor: CATEGORICAL[TIERS.indexOf(selected.tier) % CATEGORICAL.length] }}
              >
                {selected.tier.label}
              </span>
              <h4 className="text-lg font-heading font-semibold text-foreground">{selected.layer}</h4>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              <div>
                <p className="text-xs font-semibold text-foreground uppercase tracking-wide mb-1">What you learn</p>
                <p className="text-sm text-secondary leading-relaxed">{MATRIX[`${selected.tier.id}-${selected.layer}` as CellKey].learn}</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-foreground uppercase tracking-wide mb-1">What you can do after</p>
                <p className="text-sm text-secondary leading-relaxed">{MATRIX[`${selected.tier.id}-${selected.layer}` as CellKey].outcome}</p>
              </div>
              <div className="rounded-lg bg-red-50/60 border-l-4 border-red-400 p-3">
                <p className="text-xs font-semibold text-red-700 uppercase tracking-wide mb-1">If you skip this</p>
                <p className="text-sm text-foreground/90 leading-relaxed">{MATRIX[`${selected.tier.id}-${selected.layer}` as CellKey].failure}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {!selected && (
        <p className="text-sm text-secondary/70 text-center">Click any cell to see what it takes and what breaks without it.</p>
      )}
    </div>
  );
}

function ExamplesGrid() {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <div className="grid md:grid-cols-2 gap-5">
      {EXAMPLE_CASES.map((ex, i) => {
        const isOpen = openId === ex.id;
        const color = CATEGORICAL[i % CATEGORICAL.length];
        return (
          <div
            key={ex.id}
            className="rounded-2xl border border-black/5 bg-white/70 shadow-sm overflow-hidden hover:shadow-md transition-shadow"
          >
            <div className="h-1 w-full" style={{ backgroundColor: color }} />
            <button
              onClick={() => setOpenId(isOpen ? null : ex.id)}
              className="w-full flex items-start justify-between gap-4 p-6 text-left"
              aria-expanded={isOpen}
            >
              <div className="space-y-2">
                <span
                  className="text-xs font-semibold uppercase tracking-[0.14em] px-3 py-1 rounded-full"
                  style={{ backgroundColor: `${color}1A`, color }}
                >
                  {ex.domain}
                </span>
                <h3 className="text-lg font-semibold text-foreground">{ex.title}</h3>
                <p className="text-sm text-secondary">Owner: {ex.humanOwner}</p>
              </div>
              <ChevronDown
                size={18}
                className={`flex-shrink-0 mt-1 text-secondary transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
              />
            </button>
            {isOpen && (
              <div className="px-6 pb-6 space-y-4 text-sm">
                <div>
                  <p className="text-xs font-semibold text-foreground uppercase tracking-wide mb-1">Problem</p>
                  <p className="text-secondary leading-relaxed">{ex.problem}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-foreground uppercase tracking-wide mb-1">Why current tools fail</p>
                  <p className="text-secondary leading-relaxed">{ex.whyCurrentToolsFail}</p>
                </div>
                <div className="rounded-xl bg-blue-50 border border-blue-100 p-4 space-y-2">
                  <p className="text-xs font-semibold text-blue-700 uppercase tracking-wide">System design</p>
                  <p className="text-sm text-blue-950 leading-relaxed">{ex.systemDesign.description}</p>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {ex.systemDesign.layers.map((l) => (
                      <span key={l} className="text-xs bg-white text-blue-800 px-2.5 py-1 rounded-full font-medium border border-blue-100">
                        {l}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default function ExecutionChecklistPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="pt-32 pb-24">
        <div className="max-w-5xl mx-auto px-6 lg:px-8 space-y-16">
          {/* Intro */}
          <section className="relative isolate overflow-hidden rounded-3xl py-10 px-2 -mx-2">
            <InteractiveGlow colors={["#2563eb", "#D97706", "#2563EB"]} />
            <div className="relative z-10 space-y-3">
              <h1 className="text-5xl md:text-6xl font-heading font-bold text-foreground leading-tight">
                Execution Checklist
              </h1>
              <p className="text-lg text-secondary leading-relaxed max-w-3xl">
                The goal is responsible execution. Understanding the technology is the prerequisite;
                acting without it creates hidden failure. This page defines what understanding means at
                each depth.
              </p>
              <p className="text-lg text-secondary leading-relaxed max-w-3xl">
                Most organizations stop after superficial familiarity. Durable execution requires
                progressing through three levels of understanding, with capability to match.
              </p>
              <Link
                href="/how-to-prompt"
                className="inline-flex items-center gap-2 text-sm font-semibold text-accent hover:gap-3 transition-all"
              >
                Start with the one skill that transfers across every layer: how to prompt
                <ArrowRight size={16} />
              </Link>
            </div>
          </section>

          {/* Top Checks */}
          <section className="space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-secondary">
              Immediate checks
            </p>
            <div className="grid gap-4 sm:grid-cols-3">
              {IMMEDIATE_CHECKS.map((item) => (
                <div
                  key={item.title}
                  className="hover-glow rounded-2xl border border-black/5 bg-white/80 p-4 shadow-sm flex gap-3 items-start"
                >
                  <CheckSquare className="h-5 w-5 text-blue-600 mt-0.5" aria-hidden />
                  <div className="space-y-2">
                    <h3 className="text-base font-semibold text-foreground">{item.title}</h3>
                    <p className="text-sm text-secondary leading-relaxed">{item.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Maturity board */}
          <section className="space-y-6">
            <div className="space-y-2">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-secondary">
                The maturity board
              </p>
              <h2 className="text-3xl md:text-4xl font-heading font-semibold text-foreground leading-tight">
                Six layers × three levels of depth.
              </h2>
              <p className="text-secondary leading-relaxed text-lg max-w-3xl">
                Every layer of the system map needs to progress through the same three levels. Stopping
                early at any layer is a specific, named failure mode — not a vague sense of &ldquo;not ready.&rdquo;
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              {TIERS.map((tier, i) => (
                <div
                  key={tier.id}
                  className="hover-glow-flat rounded-xl border border-black/5 bg-white/70 px-4 py-3"
                  style={{ borderLeftWidth: 4, borderLeftColor: CATEGORICAL[i % CATEGORICAL.length] }}
                >
                  <p className="text-sm font-semibold text-foreground">{tier.headline}</p>
                  <p className="text-xs text-secondary mt-1">If you stop here: {tier.ifStop}</p>
                </div>
              ))}
            </div>

            <MaturityBoard />
          </section>

          {/* Examples in practice */}
          <section className="space-y-10">
            <div className="space-y-2">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-secondary">
                Execution in practice
              </p>
              <h2 className="text-3xl md:text-4xl font-heading font-semibold text-foreground leading-tight">
                Nine vertical AI systems, mapped to this checklist
              </h2>
              <p className="text-secondary leading-relaxed max-w-3xl">
                Each of these is a real pattern across operations, support, manufacturing, sales,
                HR, finance, IT, and compliance — built by applying the same levels above. Click
                one to see the problem, why generic tools fail at it, and how the system is
                designed.
              </p>
            </div>
            <ExamplesGrid />
          </section>

          {/* Closing */}
          <section className="space-y-3">
            <p className="text-lg text-secondary leading-relaxed max-w-3xl">
              Execution is the responsibility once these levels are understood. Choosing not to
              progress is a decision. Acting without progressing is not.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
