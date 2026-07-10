"use client";

import { useState } from "react";
import { CheckSquare, ChevronDown } from "lucide-react";
import Navigation from "../Navigation";
import { EXAMPLE_CASES } from "@/data/examples";

type CourseCardProps = {
  title: string;
  learn: string;
  outcome: string;
  failure: string;
};

function CourseCard({ title, learn, outcome, failure }: CourseCardProps) {
  return (
    <div className="rounded-2xl border border-black/5 bg-white/70 p-5 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
        <span className="text-xs font-semibold uppercase tracking-[0.16em] text-secondary">
          Course placeholder
        </span>
      </div>
      <div className="mt-3 space-y-3 text-sm text-secondary leading-relaxed">
        <p className="text-foreground font-semibold">What you learn</p>
        <p>{learn}</p>
        <p className="text-foreground font-semibold">What you can do after</p>
        <p>{outcome}</p>
        <p className="text-foreground font-semibold">If you skip this</p>
        <p>{failure}</p>
      </div>
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
          <section className="space-y-6">
            <div className="space-y-3">
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
            </div>
          </section>

          {/* Top Checks */}
          <section className="space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-secondary">
              Immediate checks
            </p>
            <div className="grid gap-4 sm:grid-cols-3">
              {[
                {
                  title: "Understand the technology",
                  body:
                    "You can place any initiative on the system map (inputs → reasoning → orchestration → tools & data → interface & outcomes) and explain what belongs where.",
                },
                {
                  title: "Guide and direct development",
                  body:
                    "You are comfortable asking for, scoping, and steering builds or wraps that fit the system instead of chasing features or demos.",
                },
                {
                  title: "Hands on with AI",
                  body:
                    "You can interact with and adjust the system—prompts, tools, flows—without breaking ownership or governance.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-black/5 bg-white/80 p-4 shadow-sm flex gap-3 items-start"
                >
                  <CheckSquare className="h-5 w-5 text-emerald-600 mt-0.5" aria-hidden />
                  <div className="space-y-2">
                    <h3 className="text-base font-semibold text-foreground">{item.title}</h3>
                    <p className="text-sm text-secondary leading-relaxed">{item.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Levels */}
          <section className="space-y-12">
            {/* Foundational */}
            <div className="space-y-5">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-secondary">
                Foundational — Understanding the system
              </p>
              <div className="space-y-3">
                <h2 className="text-3xl md:text-4xl font-heading font-semibold text-foreground leading-tight">
                  Literacy across the system map.
                </h2>
                <p className="text-secondary leading-relaxed text-lg">
                  This is where you learn what each layer does and why it exists. Execution without this
                  turns into pilots that look promising but fail because basics like data quality,
                  model limits, and placement were never internalized.
                </p>
                <p className="text-foreground font-semibold text-lg">
                  If you stop here: you can talk about the system, but you cannot yet run it.
                </p>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <CourseCard
                  title="Data"
                  learn="What data quality means (freshness, structure, lineage) and why models break without it."
                  outcome="You can diagnose data readiness and stop bad inputs before they reach models."
                  failure="You ship demos on brittle data that collapse in production."
                />
                <CourseCard
                  title="Reasoning / Models"
                  learn="What an LLM does and does not do; where structure, rules, or retrieval are required."
                  outcome="You frame model use with clear intent and constraints."
                  failure="You over-trust outputs and under-specify the work around the model."
                />
                <CourseCard
                  title="Orchestration"
                  learn="Why orchestration turns intent into reliable sequences instead of manual clicks."
                  outcome="You can map a workflow to steps and understand where automation belongs."
                  failure="People keep stitching workflows by hand and blame models for inconsistency."
                />
                <CourseCard
                  title="Tools"
                  learn="Why tools are distinct components for normalization, transformation, calculation."
                  outcome="You can spot missing utilities and avoid overloading prompts."
                  failure="Prompts become a catch-all and reliability erodes."
                />
                <CourseCard
                  title="Interfaces"
                  learn="How interfaces frame behavior and outcomes for users."
                  outcome="You place dashboards, exports, and UIs correctly on the system map."
                  failure="Users bypass the system; outcomes are unseen and untrusted."
                />
                <CourseCard
                  title="Ownership & governance"
                  learn="Why every component needs a named owner and what 'good' looks like."
                  outcome="Questions and issues have a landing spot; learning compounds."
                  failure="Ambiguity stalls progress and no one is accountable."
                />
              </div>
            </div>

            {/* Operational */}
            <div className="space-y-5">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-secondary">
                Operational — Automating the system
              </p>
              <div className="space-y-3">
                <h2 className="text-3xl md:text-4xl font-heading font-semibold text-foreground leading-tight">
                  Make the system run without manual glue.
                </h2>
                <p className="text-secondary leading-relaxed text-lg">
                  This level turns understanding into motion: automations, agents, and guardrails that
                  align with real operations. Execution here is about stability and repeatability.
                </p>
                <p className="text-foreground font-semibold text-lg">
                  If you stop here: you launch automation that drifts because ownership stays at the
                  project level.
                </p>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <CourseCard
                  title="Data"
                  learn="Data contracts, validation, and monitoring that keep automations stable."
                  outcome="You instrument freshness and schema changes before they break flows."
                  failure="Automated steps fail unpredictably and the model gets blamed."
                />
                <CourseCard
                  title="Reasoning / Models"
                  learn="How to constrain models in workflows: prompts with guardrails, retrieval boundaries, fallbacks."
                  outcome="You design predictable model calls that stay within bounds."
                  failure="Agents wander and require constant human correction."
                />
                <CourseCard
                  title="Orchestration"
                  learn="Sequencing, retries, handoffs, and auditability that replace manual coordination."
                  outcome="You can translate a business process into orchestrated steps."
                  failure="Scripts sprawl and only the author can run them."
                />
                <CourseCard
                  title="Tools"
                  learn="When to build utilities versus reuse; how to place and invoke them in flows."
                  outcome="You add tools that strengthen the system instead of duplicating it."
                  failure="Conflicting tools emerge and sources of truth fragment."
                />
                <CourseCard
                  title="Interfaces"
                  learn="Interfaces that surface status, exceptions, and actions without exposing plumbing."
                  outcome="Users see what the system is doing and can intervene safely."
                  failure="People revert to manual work because automation is opaque."
                />
                <CourseCard
                  title="Ownership & governance"
                  learn="Ownership shifts to system stewardship: uptime, data quality, change control."
                  outcome="Drift is detected and corrected; changes have an owner."
                  failure="No one has authority to adjust the system as it runs."
                />
              </div>
            </div>

            {/* Advanced */}
            <div className="space-y-5">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-secondary">
                Advanced — Designing and evolving the system
              </p>
              <div className="space-y-3">
                <h2 className="text-3xl md:text-4xl font-heading font-semibold text-foreground leading-tight">
                  Treat the system as living infrastructure.
                </h2>
                <p className="text-secondary leading-relaxed text-lg">
                  This level is about designing for change and compounding value: second-order effects,
                  when to build, wrap, or buy, and how to evolve without losing ownership.
                </p>
                <p className="text-foreground font-semibold text-lg">
                  If you stop here: you can evolve the system deliberately. If you never reach it, every
                  new requirement feels like a restart.
                </p>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <CourseCard
                  title="Data"
                  learn="Design pipelines that can change safely: migrations, backfills, observability."
                  outcome="You plan changes without breaking downstream behavior."
                  failure="Every schema change is a fire drill."
                />
                <CourseCard
                  title="Reasoning / Models"
                  learn="When to update models, add retrieval, or redesign prompts and policies."
                  outcome="You can roll forward and back with measured impact."
                  failure="Regressions reach production and improvements stall."
                />
                <CourseCard
                  title="Orchestration"
                  learn="Versioning, feature flags, staged rollouts, and modeling second-order effects."
                  outcome="You ship changes safely and understand their ripple effects."
                  failure="Changes ship globally and failures cascade."
                />
                <CourseCard
                  title="Tools"
                  learn="Build, wrap, or buy decisions based on system leverage over time."
                  outcome="You integrate capability without surrendering ownership of behavior or data."
                  failure="The system devolves into disconnected products."
                />
                <CourseCard
                  title="Interfaces"
                  learn="Interfaces that adapt as the system evolves: new controls, impact visibility, safe intervention."
                  outcome="Users stay aligned with system changes and adoption grows."
                  failure="Under-the-hood changes never reach users; trust decays."
                />
                <CourseCard
                  title="Ownership & governance"
                  learn="Governance as operating rhythm: reviewing data, orchestration, and model changes with clear accountability."
                  outcome="You can plan for second-order effects and retire capability responsibly."
                  failure="Complexity grows faster than leverage and accountability dissolves."
                />
              </div>
            </div>
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

function ExamplesGrid() {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <div className="grid md:grid-cols-2 gap-5">
      {EXAMPLE_CASES.map((ex) => {
        const isOpen = openId === ex.id;
        return (
          <div
            key={ex.id}
            className="rounded-2xl border border-black/5 bg-white/70 shadow-sm overflow-hidden hover:shadow-md transition-shadow"
          >
            <button
              onClick={() => setOpenId(isOpen ? null : ex.id)}
              className="w-full flex items-start justify-between gap-4 p-6 text-left"
              aria-expanded={isOpen}
            >
              <div className="space-y-2">
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-secondary bg-slate-100 px-3 py-1 rounded-full">
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
                <div className="rounded-xl bg-emerald-50 border border-emerald-100 p-4 space-y-2">
                  <p className="text-xs font-semibold text-emerald-700 uppercase tracking-wide">System design</p>
                  <p className="text-sm text-emerald-950 leading-relaxed">{ex.systemDesign.description}</p>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {ex.systemDesign.layers.map((l) => (
                      <span key={l} className="text-xs bg-white text-emerald-800 px-2.5 py-1 rounded-full font-medium border border-emerald-100">
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
