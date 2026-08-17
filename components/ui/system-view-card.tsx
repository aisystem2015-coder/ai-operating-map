"use client";

import { Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

const diagramItems = [
  {
    id: "inputs",
    title: "Inputs",
    subtitle: "Events, prompts, triggers",
    tooltip: "Events, prompts, and triggers that start work.",
  },
  {
    id: "reasoning",
    title: "Reasoning Layer (AI)",
    subtitle: "LLMs translate intent",
    tooltip: "LLMs translate intent into structured steps.",
  },
  {
    id: "orchestration",
    title: "Orchestration",
    subtitle: "Routes tasks reliably",
    tooltip: "Routes tasks, rules, and handoffs reliably.",
  },
  {
    id: "tools",
    title: "Tools & Data",
    subtitle: "Where work happens",
    tooltip: "Where the real work and facts live.",
  },
  {
    id: "interface",
    title: "Interface & Outcomes",
    subtitle: "Where users act",
    tooltip: "Where users see results and take action.",
  },
];

const systemBlockDetails = [
  {
    id: "inputs",
    title: "Inputs",
    subtitle: "Prompts, uploads, signals",
    detail:
      "Collect and normalize prompts, uploads, system events, or third-party triggers so the system can act on clean intent.",
    examples: ["Prompt from analyst", "CSV/file upload", "Webhook from CRM"],
  },
  {
    id: "reasoning",
    title: "Reasoning Layer (AI)",
    subtitle: "Intent shaping",
    detail:
      "Interpret intent, apply policy and context, and frame decisions. No model minutiae—just the layer that shapes what should happen.",
    examples: ["Intent classification", "Policy/context application", "Decision framing"],
  },
  {
    id: "orchestration",
    title: "Orchestration",
    subtitle: "Automation + handoffs",
    detail:
      "Coordinate steps without humans clicking through tools: multi-step automations, agent handoffs, scheduled or conditional runs.",
    examples: ["Multi-step workflow", "Agent handoff", "Scheduled/conditional run"],
  },
  {
    id: "tools",
    title: "Tools & Data",
    subtitle: "Utilities + facts",
    detail:
      "Where work and truth live: data normalization utilities, transformation scripts, calculation tools. A single tool fits cleanly here.",
    examples: ["Normalization utility", "Transformation script", "Calculation tool"],
  },
  {
    id: "interface",
    title: "Interface & Outcomes",
    subtitle: "Surface results fast",
    detail:
      "Simple interfaces, dashboards, exports, or self-service actions that sit on top of the system to surface outcomes quickly.",
    examples: ["Dashboard view", "Export/generation", "Self-service action"],
  },
];

export default function SystemViewCard({
  variant = "compact",
  className = "",
  showDetailPanel = true,
  showCaption = true,
  showSubtitles = true,
  layoutId,
}: {
  variant?: "compact" | "expanded";
  className?: string;
  showDetailPanel?: boolean;
  showCaption?: boolean;
  showSubtitles?: boolean;
  layoutId?: string;
}) {
  const [activeBlock, setActiveBlock] = useState<string>(diagramItems[0].id);
  const activeDetail =
    systemBlockDetails.find((item) => item.id === activeBlock) ?? systemBlockDetails[0];
  const isExpanded = variant === "expanded";

  return (
    <motion.div
      layoutId={layoutId}
      className={`rounded-3xl border border-black/5 bg-white shadow-lg ${isExpanded ? "p-8" : "p-6"} ${className}`}
    >
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <span
            className={`text-sm font-semibold uppercase tracking-[0.18em] ${
              isExpanded ? "text-foreground" : "text-secondary"
            }`}
          >
            System View
          </span>
          <Sparkles className={`h-5 w-5 ${isExpanded ? "text-blue-600" : "text-blue-500"}`} />
        </div>
        <div className={`grid grid-cols-1 sm:grid-cols-5 gap-3 ${isExpanded ? "sm:gap-5" : ""}`}>
          {diagramItems.map((item) => (
            <div
              key={item.id}
              className={`hover-glow group relative flex h-full flex-col justify-between rounded-2xl border bg-gradient-to-b from-slate-50 to-white shadow-sm transition-all duration-200 cursor-pointer ${
                isExpanded ? "p-5 border-black/8" : "p-4 border-black/5"
              }`}
              tabIndex={0}
              onMouseEnter={() => setActiveBlock(item.id)}
              onFocus={() => setActiveBlock(item.id)}
              onClick={() => setActiveBlock(item.id)}
            >
              <div className="flex-1 space-y-1">
                <div className="text-xs font-semibold uppercase tracking-[0.12em] text-secondary">
                  {item.title}
                </div>
                {showSubtitles && (
                  <div className="text-sm text-foreground leading-snug min-h-[42px]">{item.subtitle}</div>
                )}
              </div>
              <div className="absolute inset-y-0 -right-2 hidden sm:flex items-center justify-center">
                {item.id !== "interface" && (
                  <div className="h-10 w-px bg-gradient-to-b from-transparent via-black/10 to-transparent" />
                )}
              </div>
              {showSubtitles && (
                <div className="pointer-events-none absolute left-1/2 top-full z-10 mt-2 hidden w-56 -translate-x-1/2 rounded-xl border border-black/5 bg-white p-3 text-sm text-foreground shadow-lg transition-opacity duration-200 group-hover:block">
                  {item.tooltip}
                </div>
              )}
              <div
                className={`mt-3 h-1 rounded-full transition-colors duration-200 ${
                  activeBlock === item.id ? "bg-blue-500" : "bg-blue-100"
                }`}
              />
            </div>
          ))}
        </div>
        <div
          className={`rounded-xl bg-slate-50 px-4 py-3 text-sm text-secondary ${
            isExpanded ? "text-base leading-relaxed bg-slate-50/80" : ""
          } ${showCaption ? "" : "hidden"}`}
        >
          AI sits inside the system. Map it before you buy it.
        </div>
        {showDetailPanel && (
          <div className="rounded-2xl border border-black/5 bg-white/90 px-5 py-4 shadow-sm">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div className="space-y-2">
                <div className="text-xs font-semibold uppercase tracking-[0.14em] text-secondary">
                  {activeDetail.title}
                </div>
                <div className="text-sm text-foreground leading-relaxed max-w-3xl">{activeDetail.detail}</div>
              </div>
              <div className="flex flex-wrap gap-2 sm:max-w-xs">
                {activeDetail.examples.map((ex) => (
                  <span
                    key={ex}
                    className="rounded-full border border-black/5 bg-slate-50 px-3 py-1 text-xs font-medium text-secondary"
                  >
                    {ex}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
