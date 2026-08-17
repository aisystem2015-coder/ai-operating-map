"use client";

import { motion } from "framer-motion";
import Navigation from "../Navigation";
import InteractiveGlow from "../ui/interactive-glow";
import RankedBarChart from "../charts/RankedBarChart";
import SlopeChart from "../charts/SlopeChart";
import { CATEGORICAL } from "../charts/tokens";
import {
  MAJOR_SHIFTS_2026,
  MODELS_2026,
  BENCHMARKS_2026,
  OPERATIONS_IMPACT,
  WATCH_LIST,
} from "@/data/ai-now-2026";

const fade = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: "easeOut" },
};

export default function AINow2026Page() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="pt-32 pb-24">
        <div className="max-w-6xl mx-auto px-6 lg:px-8 space-y-28">

          {/* Hero */}
          <motion.section {...fade} className="relative isolate overflow-hidden rounded-3xl py-10 px-2 -mx-2 space-y-8">
            <InteractiveGlow colors={["#2563eb", "#7C3AED", "#2563EB"]} />
            <div className="relative z-10 space-y-8">
              <div className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-blue-700 border border-blue-200 shadow-sm">
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
              {MAJOR_SHIFTS_2026.map((s, i) => {
                const color = CATEGORICAL[i % CATEGORICAL.length];
                return (
                  <motion.div
                    key={s.shift}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06, duration: 0.45, ease: "easeOut" }}
                    className="hover-glow-flat rounded-2xl border border-black/5 bg-white p-7 shadow-sm flex items-start gap-6"
                  >
                    <div
                      className="flex-shrink-0 rounded-xl px-3 py-1.5 text-xs font-semibold whitespace-nowrap"
                      style={{ backgroundColor: `${color}1A`, color }}
                    >
                      {s.impact}
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold text-foreground">{s.shift}</h3>
                      <p className="text-sm text-secondary leading-relaxed">{s.what}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.section>

          {/* Benchmarks */}
          <section className="space-y-8">
            <div className="space-y-2">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-secondary">Measured, not claimed</p>
              <h2 className="text-3xl md:text-4xl font-heading font-semibold text-foreground leading-tight">
                What frontier models can do now vs. 2023
              </h2>
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
              {MODELS_2026.map((org, orgIndex) => {
                const color = CATEGORICAL[orgIndex % CATEGORICAL.length];
                return (
                  <div key={org.org} className="space-y-3">
                    <h3 className="text-sm font-semibold uppercase tracking-[0.18em] pl-1 flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full" style={{ backgroundColor: color }} />
                      <span className="text-secondary">{org.org}</span>
                    </h3>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {org.models.map((m) => (
                        <div key={m.name} className="hover-glow rounded-xl border border-black/5 bg-white p-5 shadow-sm space-y-2">
                          <div className="flex items-center justify-between">
                            <h4 className="text-sm font-semibold text-foreground">{m.name}</h4>
                            <span
                              className="text-xs px-2.5 py-0.5 rounded-full font-medium"
                              style={{ backgroundColor: `${color}1A`, color }}
                            >
                              {m.tier}
                            </span>
                          </div>
                          <p className="text-sm text-secondary leading-relaxed">{m.strength}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="rounded-2xl border border-black/5 bg-slate-50 p-6 space-y-2">
              <p className="text-sm font-semibold text-foreground">The rule of thumb for 2026</p>
              <p className="text-secondary leading-relaxed">
                Use Haiku/Flash/mini for classification, routing, and summarization. Use Sonnet/GPT-4o for standard production tasks. Use Opus/GPT-5/Gemini Ultra for complex reasoning, analysis, and strategic decisions. Use o3/extended-thinking when depth matters more than speed. Match the model to the task — not to what&apos;s newest.
              </p>
            </div>
          </section>

          {/* Operations impact */}
          <section className="space-y-8">
            <div className="space-y-2">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-secondary">Operational impact — measured</p>
              <h2 className="text-3xl md:text-4xl font-heading font-semibold text-foreground leading-tight">
                What AI is delivering in operations today
              </h2>
              <p className="text-secondary leading-relaxed max-w-3xl">
                Not projections. Outcomes being reported by companies that went past pilot stage in 2024–2025 and are now running AI in production operations.
              </p>
            </div>
            <SlopeChart
              rows={OPERATIONS_IMPACT.map((row) => ({
                label: `${row.function} — ${row.roi}`,
                before: row.before,
                after: row.after,
                improved: true,
              }))}
            />
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
              {WATCH_LIST.map((w, i) => {
                const color = CATEGORICAL[i % CATEGORICAL.length];
                return (
                  <motion.div
                    key={w.name}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.07 }}
                    className="hover-glow rounded-2xl border border-black/5 bg-white shadow-sm overflow-hidden"
                  >
                    <div className="h-1 w-full" style={{ backgroundColor: color }} />
                    <div className="p-7 space-y-4">
                      <div className="flex items-start justify-between gap-3">
                        <h3 className="text-base font-semibold text-foreground leading-snug">{w.name}</h3>
                        <span className="flex-shrink-0 text-xs font-medium text-secondary bg-slate-100 px-2.5 py-1 rounded-full whitespace-nowrap">{w.horizon}</span>
                      </div>
                      <p className="text-sm text-secondary leading-relaxed">{w.desc}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </section>

          {/* The operational professional's position */}
          <section>
            <div className="rounded-3xl border border-black/5 bg-gradient-to-br from-slate-900 to-slate-800 p-10 lg:p-14 text-white space-y-8">
              <div className="space-y-2">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-400">The position to take in 2026</p>
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
                  <h3 className="font-semibold text-blue-400">AI operator</h3>
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
