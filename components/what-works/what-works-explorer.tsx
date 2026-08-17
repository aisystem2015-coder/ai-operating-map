"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cpu, MessageSquare, Bot, Network, Fingerprint } from "lucide-react";
import SectionReveal from "../learning/SectionReveal";
import LLMsSection from "./llms-section";
import AssistantsSection from "./assistants-section";
import AgentsSection from "./agents-section";
import AgentPatternsSection from "./agent-patterns-section";
import AgenticWorkforce from "./agentic-workforce";
import VerticalAIPitch from "../market-reality/vertical-ai-pitch";
import VerticalDeploymentsSection from "./vertical-deployments-section";
import DigitalTwinTeaser from "../digital-twin/digital-twin-teaser";

type StageId = "llm" | "assistant" | "agent" | "agentic" | "digital-twin";

const stages: Array<{
  id: StageId;
  year: string;
  name: string;
  tagline: string;
  icon: typeof Cpu;
  bg: string;
  text: string;
  tag?: string;
  /** Full-section background wash when this stage is active — a light tint,
   * not the raw chip color, so body text everywhere below stays readable. */
  wash: string;
  /** Relative width of this stage's layer in the "builds on top of" stack —
   * LLMs is the widest foundation; each layer above narrows. */
  widthPct: number;
}> = [
  {
    id: "llm",
    year: "2022",
    name: "LLMs",
    tagline: "Predicts the next token.",
    icon: Cpu,
    bg: "bg-foreground",
    text: "text-white",
    tag: "+ SLM",
    wash: "rgba(17, 17, 17, 0.05)",
    widthPct: 100,
  },
  {
    id: "assistant",
    year: "2022",
    name: "Assistants",
    tagline: "A model you can talk to.",
    icon: MessageSquare,
    bg: "bg-blue-700",
    text: "text-white",
    wash: "rgba(4, 120, 87, 0.08)",
    widthPct: 82,
  },
  {
    id: "agent",
    year: "2023",
    name: "AI Agents",
    tagline: "Reasons, then acts.",
    icon: Bot,
    bg: "bg-blue-500",
    text: "text-white",
    wash: "rgba(16, 185, 129, 0.10)",
    widthPct: 64,
  },
  {
    id: "agentic",
    year: "2024",
    name: "Agentic Systems",
    tagline: "A coordinated team of agents.",
    icon: Network,
    bg: "bg-blue-200",
    text: "text-blue-950",
    wash: "rgba(167, 243, 208, 0.35)",
    widthPct: 46,
  },
  {
    id: "digital-twin",
    year: "2026",
    name: "Digital Twins",
    tagline: "A private model of one person.",
    icon: Fingerprint,
    bg: "bg-blue-900",
    text: "text-white",
    tag: "New",
    wash: "rgba(6, 78, 59, 0.10)",
    widthPct: 30,
  },
];

// Custom ease — a wash this large reads as sluggish with CSS's default
// ease-in, and instant with linear. This settles fast then eases out, so the
// color change feels immediate but not jarring (emil-design-eng: perceived
// performance over raw speed).
const washEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

// Literal Tailwind class strings (not computed via .replace() on stage.bg) —
// Tailwind's JIT scanner needs the exact class text present in source to
// generate it; a dynamically-built "text-blue-700" from string
// replacement never gets into the CSS bundle and silently falls back to
// inherited/default color. Keep this in sync with each stage's `bg` above.
const RING_TEXT_CLASS: Record<StageId, string> = {
  llm: "text-foreground",
  assistant: "text-blue-700",
  agent: "text-blue-500",
  agentic: "text-blue-200",
  "digital-twin": "text-blue-900",
};

const VALID_STAGE_IDS: StageId[] = ["llm", "assistant", "agent", "agentic", "digital-twin"];

export default function WhatWorksExplorer() {
  const [active, setActive] = useState<StageId>("llm");

  // The "What Works Today" mega-menu (Navigation.tsx) links each of its 4
  // items straight to a hash on this page (e.g. /what-works#agent) so a
  // menu click lands on the right ring already selected, instead of
  // always resetting to LLMs.
  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (VALID_STAGE_IDS.includes(hash as StageId)) {
      setActive(hash as StageId);
    }
  }, []);

  // Click-only, on purpose (Meet 16 fix — see components/digital-twin/
  // and the project history in components/rainbow/rainbow-layers.tsx):
  // this diagram used to also advance on scroll, which Francisco flagged
  // as a bug ("cuando hago un scroll, le cambia... es un problema de
  // goteo" — scrolling silently changed the active layer without a
  // deliberate click). The scroll-linked useScroll/useMotionValueEvent
  // wiring that caused that has been removed entirely — state now only
  // ever changes from an explicit click or keyboard activation below.
  const activeStage = stages.find((s) => s.id === active)!;
  const activeIdx = stages.findIndex((s) => s.id === active);

  return (
    <motion.div
      animate={{ backgroundColor: activeStage.wash }}
      transition={{ duration: 0.6, ease: washEase }}
      className="w-full rounded-[2.5rem]"
    >
      <SectionReveal>
        <div className="mb-10 md:mb-14 text-center max-w-4xl mx-auto px-6 pt-10">
          <h2 className="mb-4 text-4xl md:text-5xl font-heading font-bold tracking-tight text-foreground">
            What Works Today
          </h2>
          <p className="text-base md:text-lg text-secondary leading-relaxed max-w-3xl mx-auto">
            LLMs are the engine. Everything else is built on top of it — a model you can talk
            to, given the ability to act on its own, then coordinated into a team of agents.
            Click a layer to see what each one adds.
          </p>
        </div>
      </SectionReveal>

      {/* The "rainbow": LLM as the core, each layer an outer ring built on top
          of it — restores the rainbow diagram Francisco asked for (Meet
          14/15), not a pyramid. A ring's clickable area is just its own
          stroke annulus (fill="none" + SVG's default pointer-events), so
          clicking inside a ring correctly falls through to the layer
          beneath it. */}
      <div className="flex flex-col md:flex-row items-center gap-10 md:gap-14 max-w-4xl mx-auto px-4">
        <div className="relative w-full max-w-[22rem] mx-auto md:mx-0 aspect-square shrink-0">
          <svg
            viewBox="0 0 480 480"
            className="w-full h-full"
            role="tablist"
            aria-label="LLMs at the center, each layer building around it"
          >
            {[...stages].reverse().map((stage) => {
              const isActive = active === stage.id;
              const isLLM = stage.id === "llm";
              const radius = { llm: 60, assistant: 100, agent: 148, agentic: 190, "digital-twin": 226 }[stage.id]!;
              const strokeWidth = { llm: 0, assistant: 64, agent: 52, agentic: 42, "digital-twin": 24 }[stage.id]!;
              return (
                <motion.circle
                  key={stage.id}
                  cx={240}
                  cy={240}
                  r={radius}
                  fill={isLLM ? "currentColor" : "none"}
                  stroke={isLLM ? "none" : "currentColor"}
                  strokeWidth={strokeWidth}
                  className={`${RING_TEXT_CLASS[stage.id]} cursor-pointer focus:outline-none`}
                  initial={false}
                  animate={{ opacity: isActive ? 1 : 0.72, scale: isActive ? 1.02 : 1 }}
                  transition={{ type: "spring", stiffness: 260, damping: 22 }}
                  style={{ transformOrigin: "240px 240px" }}
                  onClick={() => setActive(stage.id)}
                  role="tab"
                  aria-selected={isActive}
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") setActive(stage.id);
                  }}
                />
              );
            })}
            {/* Center icon for the innermost (LLM) layer, always visible */}
            <foreignObject x={240 - 26} y={240 - 26} width={52} height={52}>
              <div className="w-full h-full flex items-center justify-center">
                <Cpu size={24} className="text-white" strokeWidth={1.75} aria-hidden />
              </div>
            </foreignObject>
          </svg>
        </div>

        {/* Legend — also clickable, stays in sync with the diagram */}
        <div className="flex flex-col gap-2 w-full md:w-auto">
          {stages.map((stage) => {
            const Icon = stage.icon;
            const isActive = active === stage.id;
            return (
              <button
                key={stage.id}
                onClick={() => setActive(stage.id)}
                aria-selected={isActive}
                role="tab"
                className="group relative flex items-center gap-4 rounded-2xl px-5 py-3.5 text-left focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
              >
                <motion.div
                  layout
                  initial={false}
                  animate={{
                    scale: isActive ? 1.03 : 1,
                    boxShadow: isActive
                      ? "0 12px 30px -8px rgba(0,0,0,0.25)"
                      : "0 2px 8px -2px rgba(0,0,0,0.08)",
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 24 }}
                  className={`absolute inset-0 rounded-2xl ${stage.bg} ${
                    isActive ? "ring-2 ring-accent ring-offset-2" : "opacity-90 group-hover:opacity-100"
                  }`}
                />
                <div className="relative z-10 h-10 w-10 shrink-0 rounded-xl bg-white/15 flex items-center justify-center">
                  <Icon size={20} className={stage.text} strokeWidth={1.75} />
                  {stage.tag && (
                    <span className="absolute -bottom-2 -right-2 text-[10px] font-semibold uppercase tracking-wide bg-white text-blue-700 border border-blue-200 rounded-full px-1.5 py-0.5 shadow-sm">
                      {stage.tag}
                    </span>
                  )}
                </div>
                <div className="relative z-10 space-y-0.5">
                  <div className={`text-[11px] font-semibold uppercase tracking-wide ${stage.text} opacity-70`}>
                    {stage.year}
                  </div>
                  <div className={`text-base md:text-lg font-heading font-semibold ${stage.text}`}>
                    {stage.name}
                  </div>
                  <div className={`hidden md:block text-xs ${stage.text} opacity-80`}>
                    {stage.tagline}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active panel */}
      <div className="mt-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            {active === "llm" && <LLMsSection />}
            {active === "assistant" && <AssistantsSection />}
            {active === "agent" && (
              <>
                <AgentsSection />
                <section className="py-20 px-6 lg:px-8 bg-white/30">
                  <div className="max-w-6xl mx-auto">
                    <AgentPatternsSection />
                  </div>
                </section>
              </>
            )}
            {active === "agentic" && (
              <section className="py-20 px-6 lg:px-8">
                <div className="max-w-7xl mx-auto space-y-16">
                  <AgenticWorkforce />
                  <VerticalAIPitch />
                  <VerticalDeploymentsSection />
                </div>
              </section>
            )}
            {active === "digital-twin" && (
              <section className="py-20 px-6 lg:px-8">
                <div className="max-w-5xl mx-auto">
                  <DigitalTwinTeaser />
                </div>
              </section>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
