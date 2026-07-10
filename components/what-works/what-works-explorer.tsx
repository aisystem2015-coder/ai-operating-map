"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cpu, MessageSquare, Bot, Network } from "lucide-react";
import SectionReveal from "../learning/SectionReveal";
import LLMsSection from "./llms-section";
import AssistantsSection from "./assistants-section";
import AgentsSection from "./agents-section";
import AgentPatternsSection from "./agent-patterns-section";
import AgenticWorkforce from "./agentic-workforce";

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
  },
  {
    id: "assistant",
    year: "2022",
    name: "Assistants",
    tagline: "A model you can talk to.",
    icon: MessageSquare,
    bg: "bg-emerald-700",
    text: "text-white",
  },
  {
    id: "agent",
    year: "2023",
    name: "AI Agents",
    tagline: "Reasons, then acts.",
    icon: Bot,
    bg: "bg-emerald-500",
    text: "text-white",
  },
  {
    id: "agentic",
    year: "2024",
    name: "Agentic Systems",
    tagline: "A coordinated team of agents.",
    icon: Network,
    bg: "bg-emerald-200",
    text: "text-emerald-950",
  },
];

export default function WhatWorksExplorer() {
  const [active, setActive] = useState<StageId>("llm");

  return (
    <div className="w-full">
      <SectionReveal>
        <div className="mb-10 md:mb-14 text-center max-w-4xl mx-auto px-6">
          <h2 className="mb-4 text-4xl md:text-5xl font-heading font-bold tracking-tight text-foreground">
            What Works Today
          </h2>
          <p className="text-base md:text-lg text-secondary leading-relaxed max-w-3xl mx-auto">
            Four stages, one progression: a model that predicts text, wrapped into a model you can
            talk to, given the ability to act on its own, then coordinated into a team of agents.
            Click a stage to break it down.
          </p>
        </div>
      </SectionReveal>

      {/* Stepper */}
      <div className="relative w-full max-w-5xl mx-auto px-4">
        <div className="relative rounded-3xl border border-black/5 bg-white shadow-xl shadow-slate-200/50 p-4 md:p-6">
          <div className="relative grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {/* connecting line */}
            <div className="hidden md:block absolute top-[34px] left-[12.5%] right-[12.5%] h-0.5 bg-black/10" aria-hidden />

            {stages.map((stage, i) => {
              const Icon = stage.icon;
              const isActive = active === stage.id;
              return (
                <button
                  key={stage.id}
                  onClick={() => setActive(stage.id)}
                  aria-selected={isActive}
                  role="tab"
                  className="relative flex flex-col items-center text-center gap-2 rounded-2xl px-2 py-3 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 group"
                >
                  <motion.div
                    initial={false}
                    animate={{ scale: isActive ? 1.08 : 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className={`relative z-10 h-14 w-14 md:h-16 md:w-16 rounded-2xl flex items-center justify-center shadow-sm transition-shadow ${stage.bg} ${
                      isActive ? "shadow-lg ring-2 ring-accent ring-offset-2" : "group-hover:shadow-md"
                    }`}
                  >
                    <Icon size={26} className={stage.text} strokeWidth={1.75} />
                    {stage.tag && (
                      <span className="absolute -bottom-2 -right-2 text-[10px] font-semibold uppercase tracking-wide bg-white text-emerald-700 border border-emerald-200 rounded-full px-1.5 py-0.5 shadow-sm">
                        {stage.tag}
                      </span>
                    )}
                  </motion.div>
                  <div className="space-y-0.5">
                    <div className="text-[11px] font-semibold uppercase tracking-wide text-secondary">
                      {stage.year}
                    </div>
                    <div className={`text-sm md:text-base font-heading font-semibold ${isActive ? "text-foreground" : "text-secondary"}`}>
                      {stage.name}
                    </div>
                    <div className="hidden md:block text-xs text-secondary">{stage.tagline}</div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Active panel */}
      <div className="mt-4">
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
                <div className="max-w-7xl mx-auto">
                  <AgenticWorkforce />
                </div>
              </section>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
