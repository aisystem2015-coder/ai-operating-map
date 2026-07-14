"use client";

import { useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useMotionValueEvent,
} from "framer-motion";
import { Cpu, MessageSquare, Bot, Network, ArrowUp } from "lucide-react";
import SectionReveal from "../learning/SectionReveal";
import LLMsSection from "./llms-section";
import AssistantsSection from "./assistants-section";
import AgentsSection from "./agents-section";
import AgentPatternsSection from "./agent-patterns-section";
import AgenticWorkforce from "./agentic-workforce";
import VerticalAIPitch from "../market-reality/vertical-ai-pitch";
import VerticalDeploymentsSection from "./vertical-deployments-section";

type StageId = "llm" | "assistant" | "agent" | "agentic";

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
    bg: "bg-emerald-700",
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
    bg: "bg-emerald-500",
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
    bg: "bg-emerald-200",
    text: "text-emerald-950",
    wash: "rgba(167, 243, 208, 0.35)",
    widthPct: 46,
  },
];

// Custom ease — a wash this large reads as sluggish with CSS's default
// ease-in, and instant with linear. This settles fast then eases out, so the
// color change feels immediate but not jarring (emil-design-eng: perceived
// performance over raw speed).
const washEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function WhatWorksExplorer() {
  const [active, setActive] = useState<StageId>("llm");
  const sectionRef = useRef<HTMLDivElement>(null);

  // Scroll-driven progression (Meet 12: "scroll animation version" of this
  // diagram) — scrolling through the section nudges the stage forward, but
  // only forward, so a deliberate click is never undone by continuing to
  // scroll past it.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.75", "end 0.25"],
  });
  const scrollStageIndex = useTransform(scrollYProgress, [0, 1], [0, stages.length - 1]);
  useMotionValueEvent(scrollStageIndex, "change", (latest) => {
    const idx = Math.min(stages.length - 1, Math.max(0, Math.round(latest)));
    setActive((prev) => {
      const prevIdx = stages.findIndex((s) => s.id === prev);
      return idx > prevIdx ? stages[idx].id : prev;
    });
  });

  const activeStage = stages.find((s) => s.id === active)!;
  const activeIdx = stages.findIndex((s) => s.id === active);

  return (
    <motion.div
      ref={sectionRef}
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
            Click a layer, or scroll, to see what each one adds.
          </p>
        </div>
      </SectionReveal>

      {/* The stack — LLMs as the widest foundation, each layer above narrower,
          so the "builds on top of" hierarchy reads visually, not just in prose. */}
      <div className="relative w-full max-w-3xl mx-auto px-4">
        <div className="flex flex-col items-center gap-3">
          {[...stages].reverse().map((stage, reversedI) => {
            const i = stages.length - 1 - reversedI;
            const Icon = stage.icon;
            const isActive = active === stage.id;
            return (
              <div key={stage.id} className="w-full flex flex-col items-center">
                {reversedI > 0 && (
                  <ArrowUp
                    size={16}
                    className="text-black/20 mb-2"
                    strokeWidth={2.5}
                    aria-hidden
                  />
                )}
                <button
                  onClick={() => setActive(stage.id)}
                  aria-selected={isActive}
                  role="tab"
                  style={{ width: `${stage.widthPct}%` }}
                  className="group relative flex items-center gap-4 rounded-2xl px-5 py-4 text-left focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
                >
                  <motion.div
                    layout
                    initial={false}
                    animate={{
                      scale: isActive ? 1.05 : 1,
                      boxShadow: isActive
                        ? "0 12px 30px -8px rgba(0,0,0,0.25)"
                        : "0 2px 8px -2px rgba(0,0,0,0.08)",
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 24 }}
                    className={`absolute inset-0 rounded-2xl ${stage.bg} ${
                      isActive ? "ring-2 ring-accent ring-offset-2" : "opacity-90 group-hover:opacity-100"
                    }`}
                  />
                  <div className="relative z-10 h-11 w-11 md:h-12 md:w-12 shrink-0 rounded-xl bg-white/15 flex items-center justify-center">
                    <Icon size={22} className={stage.text} strokeWidth={1.75} />
                    {stage.tag && (
                      <span className="absolute -bottom-2 -right-2 text-[10px] font-semibold uppercase tracking-wide bg-white text-emerald-700 border border-emerald-200 rounded-full px-1.5 py-0.5 shadow-sm">
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
              </div>
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
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
