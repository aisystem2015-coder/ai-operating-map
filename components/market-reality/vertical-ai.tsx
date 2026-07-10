"use client";

import SectionReveal from "../learning/SectionReveal";
import RankedBarChart from "../charts/RankedBarChart";
import ChartSource from "../charts/ChartSource";
import { COMPARISON } from "../charts/tokens";

export default function VerticalAISection() {
  return (
    <section
      id="vertical-ai"
      className="py-32 px-6 lg:px-8 scroll-mt-24 bg-gradient-to-b from-purple-50/40 to-transparent"
    >
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <SectionReveal>
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-secondary text-center mb-6">
            Horizontal vs Vertical AI
          </p>
          <h2 className="text-5xl md:text-6xl font-heading font-bold text-foreground mb-10 leading-tight text-center">
            Vertical AI is the Real Endgame
          </h2>
        </SectionReveal>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Generic vs Vertical summary cards */}
          <SectionReveal>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white/70 p-8 rounded-3xl border border-black/5 shadow-sm">
                <h3 className="text-2xl font-heading font-semibold text-foreground mb-4">
                  Generic AI Assistant
                </h3>
                <ul className="space-y-3 text-secondary leading-relaxed text-lg">
                  <li className="flex items-start">
                    <span className="text-red-500 mr-3 font-bold">×</span>
                    <span>General knowledge only / focus on surface-level tasks and productivity aids</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-3 font-bold">×</span>
                    <span>Separate interface</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-3 font-bold">×</span>
                    <span>Provides suggestions, not execution</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-3 font-bold">×</span>
                    <span>Easy to deploy, but hard to measure ROI</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-3 font-bold">×</span>
                    <span>Minimal integration with core processes or KPIs</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/70 p-8 rounded-3xl border-2 border-accent shadow-sm">
                <h3 className="text-2xl font-heading font-semibold text-foreground mb-4">
                  Vertical AI System
                </h3>
                <ul className="space-y-3 text-secondary leading-relaxed text-lg">
                  <li className="flex items-start">
                    <span className="text-green-600 mr-3 font-bold">✓</span>
                    <span>Domain-specific knowledge</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-3 font-bold">✓</span>
                    <span>Embedded in workflows</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-3 font-bold">✓</span>
                    <span>Executes actions autonomously</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-3 font-bold">✓</span>
                    <span>Drives measurable efficiency, cost, and decision-making impact</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-3 font-bold">✓</span>
                    <span>Understands goals—becomes a peer, not an assistant with empty knowledge</span>
                  </li>
                </ul>
              </div>
            </div>
          </SectionReveal>

          {/* Depth of integration comparison */}
          <SectionReveal delay={0.1}>
            <div className="bg-white/80 p-8 rounded-3xl border border-black/5 shadow-md space-y-6">
              <p className="text-sm font-semibold uppercase tracking-wide text-foreground/60 text-center">
                Depth of integration
              </p>
              <RankedBarChart
                series={[
                  { label: "Today", value: 30, valueLabel: "Shallow", color: COMPARISON.baseline },
                  { label: "Tomorrow", value: 90, valueLabel: "Deep", color: COMPARISON.actual },
                ]}
                max={100}
              />
              <div className="grid sm:grid-cols-2 gap-6 text-sm text-foreground/70 text-center">
                <div>
                  <span className="font-semibold text-foreground">Today — Horizontal focus.</span> Copilots and digital assistants: shallow, generic use.
                </div>
                <div>
                  <span className="font-semibold text-foreground">Tomorrow — Vertical focus.</span> AI orchestrator: deep, function-specific integration.
                </div>
              </div>
              <div className="flex justify-center">
                <ChartSource label="Oracle" />
              </div>
            </div>
          </SectionReveal>

          {/* Operational reality callout styled like the cards */}
          <SectionReveal delay={0.25}>
            <div className="bg-white/90 rounded-3xl border border-black/5 shadow-md p-10 space-y-4">
              <h3 className="text-2xl font-heading font-semibold text-foreground">
                The Operational Reality
              </h3>
              <p className="text-lg text-secondary leading-relaxed">
                Vertical AI is not about building better chatbots. It is about
                identifying high-leverage processes, workflows, and decision points
                within your organization, then embedding AI agents that can operate
                autonomously within those contexts. The narrower the scope, the
                deeper the integration, the higher the value.
              </p>
            </div>
          </SectionReveal>

          <SectionReveal delay={0.35}>
            <div className="text-center pt-4">
              <p className="text-xl text-foreground leading-relaxed max-w-2xl mx-auto">
                Understanding this shift is the crux of market reality: real
                value shows up when AI is vertical, operational, and trusted by
                the teams it serves.
              </p>
            </div>
          </SectionReveal>
        </div>
      </div>
    </section>
  );
}

