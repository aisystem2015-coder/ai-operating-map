"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquareText, Target, LayoutList, ShieldAlert, ArrowRight, Check, X } from "lucide-react";
import Navigation from "../Navigation";
import InteractiveGlow from "../ui/interactive-glow";
import { COMPARISON, CATEGORICAL } from "../charts/tokens";

const FRAMEWORK = [
  {
    icon: MessageSquareText,
    title: "Context",
    body: "What's actually going on — the system, the data, the constraint that makes this ask non-generic. Without it, the model fills the gap with a guess.",
  },
  {
    icon: Target,
    title: "Task",
    body: "The exact action, stated as a verb, not a topic. “Summarize into 3 sections” beats “help with this document.”",
  },
  {
    icon: LayoutList,
    title: "Format",
    body: "What the output looks like before you've seen it — a table, a numbered list, one paragraph, a length cap.",
  },
  {
    icon: ShieldAlert,
    title: "Constraints",
    body: "What NOT to do, and what to do when it's unsure — guess, skip, or flag. Leave this out and it decides for you.",
  },
];

const SCENARIOS = [
  {
    id: "meeting",
    label: "Meeting notes",
    vague: "Summarize this meeting transcript.",
    specific:
      "Summarize this transcript into 3 sections: Decisions made, Action items (owner + due date), and Open questions. Skip small talk. If a task has no stated owner, write “unassigned” instead of guessing who it was.",
    why: "Names the exact output shape, and tells it what to do when information is missing instead of letting it invent an owner.",
  },
  {
    id: "data",
    label: "Messy export",
    vague: "Clean up this spreadsheet.",
    specific:
      "This export has 3 different date formats and duplicate rows from a failed sync on 6/14. Normalize all dates to YYYY-MM-DD, drop exact duplicate rows, and flag — don't silently fix — any row where the customer ID isn't 8 digits.",
    why: "Names the actual problem instead of “clean up,” and draws the line between fix automatically and flag for a human.",
  },
  {
    id: "sop",
    label: "Process doc",
    vague: "Write instructions for the new intake process.",
    specific:
      "Write a step-by-step SOP for the new intake process, for someone doing it the first time with no context. Number every step, name the tool used at each one, and add a “if this fails” line under any step that depends on a third party. One page max.",
    why: "Specifies the reader's skill level, the structure, and a length cap — three things a vague ask leaves to chance.",
  },
];

const DOS = [
  "Name the exact output shape before you ask.",
  "Say what to do when information is missing — not just what to do when it's there.",
  "Give it one real example if the shape is unusual.",
];

const DONTS = [
  "Ask it to “help” with something — help is not an instruction.",
  "Assume it knows your team's shorthand — spell it out once.",
  "Bury the ask in three paragraphs of backstory — task first, constraints last.",
];

function ScenarioSwitcher() {
  const [active, setActive] = useState(0);
  const scenario = SCENARIOS[active];

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap gap-2" role="tablist" aria-label="Prompt scenarios">
        {SCENARIOS.map((s, i) => (
          <button
            key={s.id}
            role="tab"
            aria-selected={i === active}
            onClick={() => setActive(i)}
            className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 ${
              i === active
                ? "border-transparent text-white"
                : "border-black/10 text-secondary hover:text-foreground hover:bg-black/5"
            }`}
            style={i === active ? { backgroundColor: CATEGORICAL[i % CATEGORICAL.length] } : undefined}
          >
            {s.label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={scenario.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
          className="grid md:grid-cols-2 gap-4"
        >
          <div
            className="rounded-2xl border border-black/5 bg-white/70 shadow-sm p-6 space-y-3"
            style={{ borderLeftWidth: 4, borderLeftColor: COMPARISON.baseline }}
          >
            <div className="flex items-center gap-2">
              <X className="h-4 w-4" style={{ color: COMPARISON.baseline }} aria-hidden />
              <span
                className="text-xs font-semibold uppercase tracking-[0.14em]"
                style={{ color: COMPARISON.baseline }}
              >
                Vague
              </span>
            </div>
            <p className="text-base text-foreground leading-relaxed">&ldquo;{scenario.vague}&rdquo;</p>
            <p className="text-sm text-secondary">Technically a prompt. Leaves every real decision to a guess.</p>
          </div>

          <div
            className="rounded-2xl border border-black/5 bg-white/70 shadow-sm p-6 space-y-3"
            style={{ borderLeftWidth: 4, borderLeftColor: COMPARISON.actual }}
          >
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4" style={{ color: COMPARISON.actual }} aria-hidden />
              <span
                className="text-xs font-semibold uppercase tracking-[0.14em]"
                style={{ color: COMPARISON.actual }}
              >
                Specific
              </span>
            </div>
            <p className="text-base text-foreground leading-relaxed">&ldquo;{scenario.specific}&rdquo;</p>
            <p className="text-sm text-secondary">{scenario.why}</p>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default function HowToPromptPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="pt-32 pb-24">
        <div className="max-w-5xl mx-auto px-6 lg:px-8 space-y-16">
          {/* Hero */}
          <section className="relative isolate overflow-hidden rounded-3xl py-10 px-2 -mx-2">
            <InteractiveGlow colors={["#2563eb", "#2563EB", "#D97706"]} />
            <div className="relative z-10 space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-semibold uppercase tracking-[0.14em] mb-2">
                Training
              </div>
              <h1 className="text-5xl md:text-6xl font-heading font-bold text-foreground leading-tight">
                How to Prompt
              </h1>
              <p className="text-lg text-secondary leading-relaxed max-w-3xl">
                You don&rsquo;t need to be technical to drive this system well — you need to be specific.
                A vague prompt gets a generic answer because the model fills every gap you left with a
                guess. A specific prompt closes those gaps yourself.
              </p>
              <p className="text-lg text-secondary leading-relaxed max-w-3xl">
                This isn&rsquo;t a syntax to memorize. It&rsquo;s four questions to answer before you hit send.
              </p>
            </div>
          </section>

          {/* Framework */}
          <section className="space-y-6">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-secondary">
              The four questions
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              {FRAMEWORK.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.title}
                    className="hover-glow rounded-2xl border border-black/5 bg-white/80 p-5 shadow-sm flex gap-3 items-start"
                  >
                    <Icon className="h-5 w-5 text-blue-600 mt-0.5 shrink-0" aria-hidden />
                    <div className="space-y-1.5">
                      <h3 className="text-base font-semibold text-foreground">{item.title}</h3>
                      <p className="text-sm text-secondary leading-relaxed">{item.body}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Before / after */}
          <section className="space-y-6">
            <div className="space-y-2">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-secondary">
                Same ask, two prompts
              </p>
              <h2 className="text-3xl md:text-4xl font-heading font-semibold text-foreground leading-tight">
                The gap is always in the specifics.
              </h2>
              <p className="text-secondary leading-relaxed max-w-3xl">
                Three real ops asks. Click one to see the vague version next to the specific one —
                same task, very different output.
              </p>
            </div>
            <ScenarioSwitcher />
          </section>

          {/* Do / don't */}
          <section className="grid gap-6 sm:grid-cols-2">
            <div className="rounded-2xl border border-blue-100 bg-blue-50/60 p-6 space-y-4">
              <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-blue-700">Do</h3>
              <ul className="space-y-3">
                {DOS.map((d) => (
                  <li key={d} className="flex gap-2.5 text-sm text-blue-950 leading-relaxed">
                    <Check className="h-4 w-4 mt-0.5 shrink-0 text-blue-600" aria-hidden />
                    {d}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-red-100 bg-red-50/50 p-6 space-y-4">
              <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-red-700">Don&rsquo;t</h3>
              <ul className="space-y-3">
                {DONTS.map((d) => (
                  <li key={d} className="flex gap-2.5 text-sm text-foreground/90 leading-relaxed">
                    <X className="h-4 w-4 mt-0.5 shrink-0 text-red-500" aria-hidden />
                    {d}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Closing / CTA */}
          <section className="space-y-4">
            <p className="text-lg text-secondary leading-relaxed max-w-3xl">
              This is the one skill that transfers across every layer of the system map — the
              reasoning core only ever does what you actually told it to do.
            </p>
            <Link
              href="/execution-checklist"
              className="inline-flex items-center gap-2 text-sm font-semibold text-accent hover:gap-3 transition-all"
            >
              See how this fits the full execution checklist
              <ArrowRight size={16} />
            </Link>
          </section>
        </div>
      </main>
    </div>
  );
}
