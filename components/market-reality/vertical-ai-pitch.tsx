"use client";

import SectionReveal from "../learning/SectionReveal";
import RankedBarChart from "../charts/RankedBarChart";
import ChartSource from "../charts/ChartSource";
import { COMPARISON } from "../charts/tokens";

/**
 * The conceptual "why vertical AI matters" pitch — previously its own
 * standalone section on /market-reality (id="vertical-ai"), separate from
 * the technical stack table on /what-works. Francisco (Meet 13): the two
 * were the same topic split across two pages with no clear reason; this is
 * the merged version, now rendered inline inside What Works' "Agentic
 * Systems" stage, directly above the stack table it used to point readers
 * away to find. Heading levels are one step down from the old standalone
 * page (h3/h4, not h2) since it's now a subsection, not its own section.
 */
export default function VerticalAIPitch() {
  return (
    <div id="vertical-ai" className="max-w-4xl mx-auto space-y-10 scroll-mt-24">
      <SectionReveal>
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-secondary text-center mb-4">
          Horizontal vs Vertical AI
        </p>
        <h3 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-8 leading-tight text-center">
          Vertical AI is the real endgame
        </h3>
      </SectionReveal>

      <SectionReveal>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="hover-glow bg-white/70 p-7 rounded-3xl border border-black/5 shadow-sm">
            <h4 className="text-xl font-heading font-semibold text-foreground mb-3">
              Generic AI Assistant
            </h4>
            <ul className="space-y-2.5 text-secondary leading-relaxed">
              <li className="flex items-start">
                <span className="text-red-500 mr-3 font-bold">×</span>
                <span>General knowledge only / surface-level tasks and productivity aids</span>
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

          <div className="hover-glow bg-white/70 p-7 rounded-3xl border-2 border-accent shadow-sm">
            <h4 className="text-xl font-heading font-semibold text-foreground mb-3">
              Vertical AI System
            </h4>
            <ul className="space-y-2.5 text-secondary leading-relaxed">
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
                <span>Understands goals — a peer, not an assistant with empty knowledge</span>
              </li>
            </ul>
          </div>
        </div>
      </SectionReveal>

      <SectionReveal delay={0.1}>
        <div className="bg-white/80 p-7 rounded-3xl border border-black/5 shadow-md space-y-5">
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
              <span className="font-semibold text-foreground">Today — Horizontal focus.</span>{" "}
              Copilots and digital assistants: shallow, generic use.
            </div>
            <div>
              <span className="font-semibold text-foreground">Tomorrow — Vertical focus.</span>{" "}
              AI orchestrator: deep, function-specific integration.
            </div>
          </div>
          <div className="flex justify-center">
            <ChartSource label="Oracle" />
          </div>
        </div>
      </SectionReveal>

      <SectionReveal delay={0.2}>
        <p className="text-center text-lg text-foreground leading-relaxed">
          Vertical AI is not about building better chatbots. It is about identifying
          high-leverage processes, then embedding agents that operate autonomously within
          them. The narrower the scope, the deeper the integration, the higher the value.
          Here&apos;s the stack that makes it real:
        </p>
      </SectionReveal>
    </div>
  );
}
