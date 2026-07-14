"use client";

import Navigation from "../Navigation";
import SectionReveal from "../learning/SectionReveal";
import InteractiveGlow from "../ui/interactive-glow";
import { BentoGrid, BentoCard } from "../ui/bento-grid";
import { ShimmerButton } from "../ui/shimmer-button";
import StatTile from "../charts/StatTile";
import FlowSteps from "../charts/FlowSteps";
import MatrixGrid from "../charts/MatrixGrid";
import ChartSource from "../charts/ChartSource";
import { CATEGORICAL } from "../charts/tokens";
import {
  Layers,
  Lightbulb,
  ShieldCheck,
  Sparkles,
  Timer,
  Workflow,
} from "lucide-react";
import { LayoutGroup, motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef, useState } from "react";

const twinFade = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: "easeOut" },
};

const twinStats = [
  { label: "Global digital twin market, 2026", value: "$34B", detail: "Growing at ~35% CAGR toward $385B by 2034." },
  { label: "Creators now using AI in their workflow", value: "87%", detail: "91% of those specifically for content production." },
  { label: "Virtual & AI-influencer market growth", value: "7.6×", detail: "$6.06B (2024) → $45.88B projected by 2030." },
  { label: "Time to a working first version", value: "1–2 wks", detail: "~5–10 hours of hands-on effort, per practitioner guides." },
];

const twinTypeColumns = [
  { id: "does", label: "What it does" },
  { id: "tools", label: "Example tools" },
];

const twinTypeRows = [
  {
    label: "Personal knowledge twin",
    cells: {
      does: { primary: "Reasons over your own notes, decisions, and history — answers grounded in your actual context, not generic training data." },
      tools: { primary: "Obsidian + Claude + MCP, Personal.ai" },
    },
  },
  {
    label: "Conversational AI clone",
    cells: {
      does: { primary: "A chatbot trained on your writing and voice that drafts or answers as \"you\" in text." },
      tools: { primary: "Custom GPT, Delphi, Coachvox AI, BuddyPro" },
    },
  },
  {
    label: "Video / avatar twin",
    cells: {
      does: { primary: "A photorealistic video or voice avatar of you for calls, courses, or content at scale." },
      tools: { primary: "Tavus, HeyGen, Synthesia, D-ID" },
    },
  },
  {
    label: "Enterprise / industrial twin",
    cells: {
      does: { primary: "A live virtual replica of a physical asset — an engine, a factory line — fed by real sensor data." },
      tools: { primary: "Siemens Xcelerator, NVIDIA Omniverse, GE Digital" },
    },
  },
];

const twinBuildSteps = [
  {
    id: "scope",
    title: "Define scope & voice",
    subtitle: "What will it do — and not do?",
    detail: "Name the job in one sentence: draft my LinkedIn posts, answer questions about my work, coach me against my stated goals. Set the tone explicitly (\"warm and direct\", not \"corporate\") and draw the line on what it should never decide alone.",
    examples: ["One-sentence job", "Tone & identity", "Explicit no-go zone"],
  },
  {
    id: "gather",
    title: "Gather your source material",
    subtitle: "Past writing, transcripts, voice notes",
    detail: "Collect what already exists — documents, meeting transcripts, voice memos, decisions you've made — before creating anything new. This is the raw material the twin reasons from.",
    examples: ["Past writing", "Meeting transcripts", "Voice journal"],
  },
  {
    id: "choose",
    title: "Choose your build",
    subtitle: "Lightweight vs. owned vs. managed",
    detail: "Lightweight: a Custom GPT with files uploaded to its knowledge base. Owned: your own vault + vector database + a model wired in via MCP — slower to set up, fully yours. Managed: a platform like Delphi or Personal.ai that hosts it for you.",
    examples: ["Custom GPT", "Obsidian + MCP", "Delphi / Personal.ai"],
  },
  {
    id: "structure",
    title: "Structure & upload",
    subtitle: "Organize before you embed",
    detail: "Group by topic, tag consistently, and embed into a vector store so it's retrievable by meaning, not just keyword. Unstructured raw dumps are the single most common reason twins give shallow answers.",
    examples: ["Topic tagging", "Vector embeddings", "One question, one answer"],
  },
  {
    id: "voice",
    title: "Add voice or video (optional)",
    subtitle: "Only if you need a spoken presence",
    detail: "Most personal and professional use cases never need this layer — a reasoning twin that drafts and answers in text covers most of the value. Add voice/video only for coaching calls, courses, or content at scale.",
    examples: ["Voice cloning", "Video avatar", "Not required for most twins"],
  },
  {
    id: "disclose",
    title: "Test, disclose, iterate",
    subtitle: "Trust compounds — or breaks — here",
    detail: "Make it unambiguous to anyone interacting with it that they're talking to an AI, not you directly. Review its first outputs closely, correct the misses, and re-test every few weeks as you feed it more of your work.",
    examples: ["Clear AI disclosure", "Weekly review", "Iterate on drift"],
  },
];

const twinExamples = [
  {
    title: "A second brain that actually reasons",
    context: "Personal knowledge system",
    desc: "Every note, transcript, and decision you've made lives in one connected vault. An AI wired into it doesn't answer from generic training data — it answers from your actual context, your history, your open questions.",
    why: "Without this, every AI conversation restarts from zero — you re-explain the same background every time, and nothing you've already figured out ever compounds.",
  },
  {
    title: "A coach that watches the pattern, not the moment",
    context: "Personal accountability",
    desc: "Fed a stream of what you actually do — calendar, messages, habits — against the goals you've stated, a digital twin can flag drift before you notice it yourself.",
    why: "Humans are bad at noticing slow drift in their own behavior. A twin with a memory longer than a week catches the pattern a person living day-to-day can't see.",
  },
  {
    title: "A voice that scales without losing you",
    context: "Content & brand voice",
    desc: "Trained on what you've actually written and how you actually talk, it drafts posts, replies, and updates in your voice — not a generic corporate tone — and reports back on what landed.",
    why: "Creators using AI tools this way report roughly a 60% engagement boost on average — the ceiling isn't the writing, it's how much of your real voice the draft carries.",
  },
  {
    title: "A briefing you can hand to anyone in minutes",
    context: "Crisis & handoff",
    desc: "Instead of re-explaining your situation from scratch to a new doctor, lawyer, or advisor, you brief your twin once and it prepares the context — history, constraints, what's already been tried.",
    why: "The value shows up exactly when you have the least bandwidth to explain yourself — under stress, under time pressure, or when memory itself is the bottleneck.",
  },
];

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

const heroChips = [
  {
    label: "Stop getting sold AI",
    detail:
      "Guardrail: if a product can’t be placed on the system diagram, treat it as packaging and don’t trust it at face value.",
  },
  {
    label: "See the system",
    detail:
      "Look for how AI sits inside data, orchestration, tools, and interfaces—not as a standalone product.",
  },
  {
    label: "Act with confidence",
    detail:
      "Decide based on system fit and leverage, not on demos alone or vendor promises.",
  },
];

const doesNotReplace = [
  {
    title: "Data",
    text: "Still the constraint and differentiator; AI depends on its quality and freshness.",
  },
  {
    title: "Software systems",
    text: "The backbone that routes work, enforces rules, and connects outcomes.",
  },
  {
    title: "Operations",
    text: "Human judgment, governance, and monitoring stay essential for reliability.",
  },
];

const reduces = [
  {
    title: "Cost of ideation",
    text: "Natural language to working software shrinks the gap from idea to first build.",
  },
  {
    title: "Cost of development",
    text: "Reusable prompts, patterns, and AI-generated scaffolding cut build time.",
  },
  {
    title: "Cost of iteration",
    text: "Faster change cycles mean you can adapt to reality without heavy rewrites.",
  },
];

const comparisonRows = [
  { label: "Scope", left: "Single workflow", right: "Reusable platform" },
  { label: "Reuse", left: "One-off", right: "Compounds" },
  { label: "Scaling", left: "Hard to extend", right: "Extends by adding modules" },
  {
    label: "Failure mode",
    left: "Breaks when inputs change",
    right: "Degrades gracefully with monitoring",
  },
];

const unlockCards = [
  {
    title: "Build Entire Systems",
    icon: Layers,
    body:
      "Design and ship end-to-end workflows faster. Natural language now produces working software, so small teams can prototype in days. Time-to-value collapses when you see the whole system, not just a feature.",
    examples: ["Internal web apps", "Dashboards", "Simple SaaS prototypes"],
  },
  {
    title: "Build Custom Tools",
    icon: Lightbulb,
    body:
      "Create specific utilities that plug into your system: cleaners, calculators, transformers. AI lowers the effort to craft the exact tools your workflows need, and to evolve them as data or rules change.",
    examples: ["Data cleaners", "Calculators", "File transformers"],
  },
  {
    title: "Wrap Existing Systems",
    icon: ShieldCheck,
    body:
      "Put better interfaces on messy or legacy systems. Use AI to translate intent, guide users, and handle edge cases while the underlying data and services stay intact. Reduce friction without replacing core systems.",
    examples: [
      "Better UI on messy data",
      "Self-service portals",
      "Front ends for existing databases",
    ],
  },
];

const strategyItems = [
  {
    title: "Fewer tools, more coherence",
    text: "Design around a system map so each tool has a clear slot and shared data backbone.",
  },
  {
    title: "Less coordination overhead",
    text: "Orchestration plus clear interfaces reduce meetings-to-align and handoff errors.",
  },
  {
    title: "Faster insight to action",
    text: "Natural language into software shortens the loop from idea to shipped workflow.",
  },
  {
    title: "Better user experience",
    text: "Consistent interfaces and reliable orchestration make AI feel dependable, not novel.",
  },
];

function SystemViewCard({
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
      className={`rounded-3xl border border-black/5 bg-white shadow-lg ${
        isExpanded ? "p-8" : "p-6"
      } ${className}`}
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
          <Sparkles className={`h-5 w-5 ${isExpanded ? "text-emerald-600" : "text-emerald-500"}`} />
        </div>
        <div className={`grid grid-cols-1 sm:grid-cols-5 gap-3 ${isExpanded ? "sm:gap-5" : ""}`}>
          {diagramItems.map((item) => (
            <div
              key={item.id}
              className={`group relative flex h-full flex-col justify-between rounded-2xl border bg-gradient-to-b from-slate-50 to-white shadow-sm transition-all duration-200 ${
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
                  <div className="text-sm text-foreground leading-snug min-h-[42px]">
                    {item.subtitle}
                  </div>
                )}
              </div>
              <div className="absolute inset-y-0 -right-2 flex items-center justify-center">
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
                  activeBlock === item.id ? "bg-emerald-500" : "bg-emerald-100"
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

function SystemDiagram() {
  // Reuse of System View with full detail inside the System Model section.
  return <SystemViewCard variant="expanded" showDetailPanel={true} showCaption={true} />;
}

function SystemViewSection({
  sectionRef,
  sectionStyle,
}: {
  sectionRef: React.RefObject<HTMLElement>;
  sectionStyle: any;
}) {
  return (
    <section id="system-view" ref={sectionRef} className="scroll-mt-24">
      <SectionReveal>
        <motion.div
          style={sectionStyle}
          className="rounded-3xl border border-black/5 bg-gradient-to-r from-white to-slate-50 p-10 shadow-sm space-y-6 will-change-transform"
        >
          <div className="space-y-3 max-w-4xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-secondary">
              System View
            </p>
            <h2 className="text-3xl font-heading font-semibold text-foreground leading-tight">
              Where the technology actually lives.
            </h2>
            <p className="text-base text-secondary leading-relaxed">
              The same system map from the hero expands here into the operating view—a single
              architecture map to place any AI product. Hover a block to see the underlying work,
              ownership, and examples. This anchors the page before the Reality Check so leaders
              see how capability actually lives in the system.
            </p>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <SystemViewCard
              layoutId="system-view-card"
              variant="expanded"
              showDetailPanel={true}
              showCaption={true}
            />
          </motion.div>
        </motion.div>
      </SectionReveal>
    </section>
  );
}

export default function AIMindsetPage() {
  const systemSectionRef = useRef<HTMLElement | null>(null);

  // Scroll progress from hero toward the system section
  const { scrollYProgress: heroToSystemProgress } = useScroll({
    target: systemSectionRef,
    offset: ["start 85%", "start 20%"],
  });
  const springProgress = useSpring(heroToSystemProgress, {
    stiffness: 140,
    damping: 22,
    mass: 0.6,
  });

  // Hero card responds to scroll; stops when scroll stops
  const heroY = useTransform(springProgress, [0, 1], [0, 160]);
  const heroScale = useTransform(springProgress, [0, 1], [1, 0.9]);
  const heroOpacity = useTransform(springProgress, [0, 1], [1, 0.2]);

  // Section lift-in to connect visually
  const sectionY = useTransform(springProgress, [0, 1], [40, 0]);
  const sectionScale = useTransform(springProgress, [0, 1], [0.96, 1]);
  const sectionOpacity = useTransform(springProgress, [0, 1], [0, 1]);

  return (
    <div className="min-h-screen bg-white text-foreground">
      <Navigation />

      <main className="pt-32 lg:pt-36 pb-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <LayoutGroup>
            <div className="space-y-24">
              {/* Hero */}
              <section id="hero" className="scroll-mt-28 lg:scroll-mt-32">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                  <div className="space-y-4 max-w-xl">
                    <h1 className="text-4xl md:text-5xl font-heading font-semibold leading-tight text-foreground">
                      AI Mindset: From Products to Systems
                    </h1>
                    <p className="text-lg text-secondary leading-relaxed">
                      AI is not a product you buy. It is an enabler that lets you design,
                      build, and operate systems in new ways.
                    </p>
                    <p className="text-base text-secondary leading-relaxed">
                      Most people experience AI through finished products, but winning
                      comes from understanding the system behind them.
                    </p>
                  </div>
                  <div className="relative lg:ml-auto max-w-[520px]">
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-tr from-emerald-100 via-white to-emerald-50 rounded-3xl blur-3xl opacity-60"
                      style={{ y: heroY, scale: heroScale, opacity: heroOpacity }}
                    />
                    <motion.div
                      style={{ y: heroY, scale: heroScale, opacity: heroOpacity }}
                      transition={{ type: "spring", stiffness: 200, damping: 28, mass: 0.6 }}
                    >
                      <SystemViewCard
                        layoutId="system-view-card"
                        variant="compact"
                        showDetailPanel={false}
                        showCaption={false}
                        showSubtitles={false}
                      />
                    </motion.div>
                  </div>
                </div>

                <div className="mt-10">
                  <div className="rounded-2xl border border-black/5 bg-white shadow-sm">
                    <div className="flex flex-col sm:flex-row divide-y sm:divide-y-0 sm:divide-x divide-black/5">
                      {heroChips.map((chip) => (
                        <div key={chip.label} className="group relative flex-1 p-4">
                          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-800">
                            <ShieldCheck className="h-4 w-4" />
                            {chip.label}
                          </div>
                          <div className="mt-2 text-sm text-secondary leading-relaxed">
                            {chip.detail}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="mt-8">
                  <div className="rounded-2xl border border-black/5 bg-emerald-50/60 px-5 py-4 shadow-sm">
                    <p className="text-sm font-semibold text-emerald-900">
                      LT directive: system map first or stop. Without it, every AI
                      initiative stays fragile regardless of model or tooling. Everything
                      that follows is evidence for that decision, not parallel ideas.
                    </p>
                  </div>
                </div>
              </section>

              <SystemViewSection
                sectionRef={systemSectionRef}
                sectionStyle={{ y: sectionY, scale: sectionScale, opacity: sectionOpacity }}
              />

              {/* Reality Check */}
              <section id="reality-check" className="scroll-mt-24">
                <SectionReveal>
                  <div className="rounded-3xl border border-black/5 bg-gradient-to-r from-white to-slate-50 p-10 shadow-sm">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      <div className="space-y-3">
                        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-secondary">
                          Reality Check
                        </p>
                        <h2 className="text-3xl font-heading font-semibold text-foreground leading-tight">
                          Copilots and chatbots are the visible tip. The leverage lives in
                          the system beneath them.
                        </h2>
                        <p className="text-base text-secondary leading-relaxed">
                          People see copilots and chatbots and assume that is “AI.” That
                          hides where leverage is created. The winners build systems that
                          connect data, orchestration, tools, and interfaces. Pilots fail
                          when demos are mistaken for operating reality; production breaks
                          where data, orchestration, and ownership are weak—and leaders let
                          fragmentation persist.
                        </p>
                        <div className="rounded-xl bg-emerald-50 border border-emerald-100 px-4 py-3 text-sm text-emerald-900">
                          Guardrail: many AI products mainly differ in packaging. If a
                          product cannot be placed inside the system diagram with a clear
                          owner, treat it as packaging and halt the pilot.
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div className="rounded-2xl border border-black/5 bg-white p-5 shadow-sm">
                          <div className="text-sm font-semibold uppercase tracking-[0.14em] text-secondary">
                            Misconception vs Reality
                          </div>
                          <div className="mt-4 grid grid-cols-1 gap-4">
                            <div className="rounded-xl bg-slate-50 p-4">
                              <div className="text-xs font-semibold uppercase tracking-[0.18em] text-secondary">
                                Misconception
                              </div>
                              <p className="mt-2 text-sm text-foreground">
                                “AI is a chatbot or copilot I can buy off the shelf.”
                              </p>
                            </div>
                            <div className="rounded-xl bg-emerald-50/80 p-4">
                              <div className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
                                Reality
                              </div>
                              <p className="mt-2 text-sm text-foreground">
                                AI is a reasoning layer inside systems. Value comes from how
                                it connects to data, orchestration, tools, and interfaces.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </SectionReveal>
              </section>

              {/* AI as Enabler */}
              <section id="ai-enabler" className="scroll-mt-24">
                <SectionReveal>
                  <div className="space-y-6">
                    <div className="space-y-3">
                      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-secondary">
                        AI is an enabler, not the thing
                      </p>
                      <h2 className="text-3xl font-heading font-semibold text-foreground leading-tight">
                        AI does not replace systems; it changes the economics of building
                        and connecting them.
                      </h2>
                      <p className="text-base text-secondary leading-relaxed">
                        The real breakthrough is not AI features. It is that natural
                        language now produces working software, collapsing time-to-value.
                        What used to take months and teams can now be prototyped in days by
                        smaller groups—if the system is understood and owned. Product-first
                        efforts that skip system ownership become brittle and stall after
                        the demo.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm space-y-4">
                        <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.14em] text-secondary">
                          <ShieldCheck className="h-4 w-4" />
                          What AI does not replace
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          {doesNotReplace.map((item) => (
                            <div
                              key={item.title}
                              className="rounded-xl border border-black/5 bg-slate-50 p-4"
                            >
                              <div className="text-sm font-semibold text-foreground">
                                {item.title}
                              </div>
                              <p className="mt-2 text-sm text-secondary">{item.text}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm space-y-4">
                        <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.14em] text-secondary">
                          <Timer className="h-4 w-4" />
                          What AI reduces
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          {reduces.map((item) => (
                            <div
                              key={item.title}
                              className="rounded-xl border border-black/5 bg-emerald-50/70 p-4"
                            >
                              <div className="text-sm font-semibold text-foreground">
                                {item.title}
                              </div>
                              <p className="mt-2 text-sm text-secondary">{item.text}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="rounded-xl bg-slate-50 border border-black/5 px-4 py-3 text-sm text-secondary">
                      Compressed time-to-value: natural language to software means you
                      can move from intent to working prototypes in days—if you map the
                      system first.
                    </div>
                  </div>
                </SectionReveal>
              </section>

              {/* System Model */}
              <section id="system-model" className="scroll-mt-24">
                <SectionReveal>
                  <div className="space-y-6">
                    <div className="space-y-3">
                      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-secondary">
                        Software is a system
                      </p>
                      <h2 className="text-3xl font-heading font-semibold text-foreground leading-tight">
                        Place every component on the same system map.
                      </h2>
                      <p className="text-base text-secondary leading-relaxed">
                        If it does not fit here, it is packaging—not a system element. This is the
                        pattern scaled organizations converge on.
                      </p>
                    </div>
                    <SystemDiagram />
                    <div className="rounded-xl bg-emerald-50/60 border border-emerald-100 px-4 py-3 text-sm text-emerald-900">
                      Mindset rule for leaders: start with a broad system map, delay
                      specialization into use cases, and lock leverage first.
                    </div>
                    <div className="rounded-xl bg-slate-50 border border-black/5 px-4 py-3 text-sm text-secondary">
                      This structure is not optional or stylistic. Scalable organizations
                      converge on it because it is how durable systems actually work; every
                      successful AI product is a variation of this shape.
                    </div>
                  </div>
                </SectionReveal>
              </section>

              {/* Systems over Use Cases */}
              <section id="systems-vs-use-cases" className="scroll-mt-24">
                <SectionReveal>
                  <div className="rounded-3xl border border-black/5 bg-white p-10 shadow-sm space-y-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                      <div className="space-y-4">
                        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-secondary">
                          Systems over use cases
                        </p>
                        <h2 className="text-3xl font-heading font-semibold text-foreground leading-tight">
                          Use cases are narrow and brittle. Systems are reusable and
                          compounding.
                        </h2>
                        <p className="text-base text-secondary leading-relaxed">
                          Use cases die when conditions change. Systems get stronger as
                          they are reused and extended. Start broad, then specialize. Leaders
                          who stay at use-case level choose fragility.
                        </p>
                        <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-800">
                          <Workflow className="h-4 w-4" />
                          Practical takeaway: Start with a system map, then specialize into
                          use cases—lock leverage first.
                        </div>
                      </div>
                      <div className="rounded-2xl border border-black/5 bg-slate-50 p-6 shadow-inner">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="text-sm font-semibold uppercase tracking-[0.14em] text-secondary">
                            Use Case
                          </div>
                          <div className="text-sm font-semibold uppercase tracking-[0.14em] text-secondary">
                            System
                          </div>
                        </div>
                        <div className="mt-4 divide-y divide-black/5">
                          {comparisonRows.map((row) => (
                            <div key={row.label} className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-3">
                              <div>
                                <div className="text-xs font-semibold uppercase tracking-[0.14em] text-secondary">
                                  {row.label}
                                </div>
                                <div className="mt-1 text-sm text-foreground">{row.left}</div>
                              </div>
                              <div className="rounded-xl bg-white border border-emerald-100 p-3 shadow-sm">
                                <div className="text-xs font-semibold uppercase tracking-[0.14em] text-emerald-700">
                                  {row.label}
                                </div>
                                <div className="mt-1 text-sm text-foreground">{row.right}</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </SectionReveal>
              </section>

              {/* What AI Unlocks */}
              <section id="ai-unlocks" className="scroll-mt-24">
                <SectionReveal>
                  <div className="space-y-4">
                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-secondary">
                      What AI unlocks inside the system
                    </p>
                    <h2 className="text-3xl font-heading font-semibold text-foreground leading-tight">
                      Build faster, iterate faster, wrap smarter.
                    </h2>
                    <p className="text-base text-secondary leading-relaxed">
                      These are the leverage points once you see the full architecture.
                      Natural language to software keeps shrinking the cycle time across
                      them all—if leadership enforces the system map.
                    </p>
                    <BentoGrid>
                      {unlockCards.map((card, i) => (
                        <BentoCard
                          key={card.title}
                          title={card.title}
                          description={card.body}
                          icon={card.icon}
                          examples={card.examples}
                          span={i === 0 ? 2 : 1}
                        />
                      ))}
                    </BentoGrid>
                  </div>
                </SectionReveal>
              </section>

              {/* Architecture Wrappers */}
              <section id="wrappers" className="scroll-mt-24">
                <SectionReveal>
                  <div className="rounded-3xl border border-black/5 bg-gradient-to-r from-white to-slate-50 p-10 shadow-sm space-y-6">
                    <div className="space-y-3">
                      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-secondary">
                        AI products are wrappers of the same architecture
                      </p>
                      <h2 className="text-3xl font-heading font-semibold text-foreground leading-tight">
                        Interface · Logic · Data · LLM · Integrations
                      </h2>
                      <p className="text-base text-secondary leading-relaxed">
                        Most AI products differ mainly in packaging, not architecture. Some
                        emphasize interface (NotebookLM), some building (Cursor), some
                        orchestration (n8n), but the blueprint is the same. If it cannot be
                        placed cleanly on the system map and these layers, it is packaging—
                        not durable leverage. Kill test: if a pitch cannot be mapped to a
                        block and owner on the diagram, stop the pilot.
                      </p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
                      {["Interface", "Logic", "Data", "LLM", "Integrations"].map((layer, idx) => (
                        <div
                          key={layer}
                          className="rounded-xl border border-black/5 bg-white p-4 text-center shadow-sm"
                        >
                          <div className="text-xs font-semibold uppercase tracking-[0.14em] text-secondary">
                            Layer {idx + 1}
                          </div>
                          <div className="mt-2 text-sm font-semibold text-foreground">{layer}</div>
                        </div>
                      ))}
                    </div>
                    <div className="rounded-xl bg-slate-50 border border-black/5 px-4 py-3 text-sm text-secondary">
                      Guardrail: if a vendor pitch cannot be mapped to a specific block on
                      the system diagram and one of these layers, assume it is packaging.
                      Without a mapped owner, decline.
                    </div>
                  </div>
                </SectionReveal>
              </section>

              {/* Strategic Importance */}
              <section id="strategic" className="scroll-mt-24">
                <SectionReveal>
                  <div className="space-y-4">
                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-secondary">
                      Why this matters strategically
                    </p>
                    <h2 className="text-3xl font-heading font-semibold text-foreground leading-tight">
                      Systems thinking turns AI from novelty into operating leverage.
                    </h2>
                    <div className="rounded-xl bg-slate-50 border border-black/5 px-4 py-3 text-sm text-secondary">
                      Moving from fragmented tools to a coherent system cuts coordination
                      overhead and cycle time at scale—it rewrites operating tempo, not just
                      individual features.
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {strategyItems.map((item) => (
                        <div
                          key={item.title}
                          className="rounded-2xl border border-black/5 bg-white p-5 shadow-sm"
                        >
                          <div className="text-sm font-semibold text-foreground">
                            {item.title}
                          </div>
                          <p className="mt-2 text-sm text-secondary leading-relaxed">
                            {item.text}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </SectionReveal>
              </section>

              {/* Digital Twin — integrated here (Meet 13: relocated out of its
                  own nav item; this is the system-map mindset applied to one
                  person, so it belongs as the closing application of this
                  page's 5-layer model, not a separate destination). */}
              <section id="digital-twin" className="scroll-mt-28 space-y-16">
                <SectionReveal>
                  <div className="text-center max-w-3xl mx-auto space-y-3">
                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-secondary">
                      The personal layer
                    </p>
                    <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground leading-tight">
                      Digital Twin: this system thinking, applied to one person
                    </h2>
                    <p className="text-secondary leading-relaxed">
                      Same 5-layer logic as above — inputs, reasoning, orchestration, tools, outcomes —
                      scoped down to a single person&apos;s knowledge and voice instead of a company.
                    </p>
                  </div>
                </SectionReveal>

                {/* Hero */}
                <motion.div {...twinFade} className="relative isolate overflow-hidden rounded-3xl py-10 px-2 -mx-2 space-y-6">
                  <InteractiveGlow colors={["#1BC4A6", "#7C3AED", "#2563EB"]} />
                  <div className="relative z-10 space-y-5 max-w-4xl mx-auto text-center">
                    <div className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700 border border-emerald-200 shadow-sm">
                      Your digital twin
                    </div>
                    <p className="text-lg text-secondary leading-relaxed max-w-3xl mx-auto text-left">
                      &ldquo;Digital twin&rdquo; started as an industrial idea: a live virtual replica of a
                      physical asset — a jet engine, a factory line — fed by real sensor data so engineers
                      could simulate and predict without touching the real thing. AI extends the same idea
                      from machines to knowledge: instead of twinning a turbine, you twin a person&apos;s
                      expertise, decisions, and voice.
                    </p>
                  </div>
                </motion.div>

                {/* Stats */}
                <div className="space-y-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {twinStats.map((s, i) => (
                      <StatTile
                        key={s.label}
                        label={s.label}
                        value={s.value}
                        detail={s.detail}
                        accentColor={CATEGORICAL[i % CATEGORICAL.length]}
                      />
                    ))}
                  </div>
                  <ChartSource
                    label="MindInventory Digital Twin Statistics 2026; creator-economy surveys via Clapper &amp; Digiday; Metricool / Marketing Week virtual-influencer market data"
                    href="https://www.mindinventory.com/blog/digital-twin-statistics/"
                  />
                </div>

                {/* Definition */}
                <div className="rounded-3xl border border-black/5 bg-gradient-to-br from-slate-900 to-slate-800 p-10 lg:p-12 text-white space-y-5">
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-400">Definition</p>
                  <p className="text-xl md:text-2xl font-heading font-semibold leading-snug">
                    A digital twin is not a chatbot with your name on it. It&apos;s a persistent AI system
                    trained on your actual knowledge, decisions, and voice — that reasons and drafts as an
                    extension of you, not as a generic assistant answering from the public internet.
                  </p>
                  <p className="text-slate-300 leading-relaxed text-lg">
                    A generic assistant knows everything about the world and nothing about you. A digital
                    twin inverts that: narrower in scope, but it knows your context, remembers what you&apos;ve
                    already decided, and gets more useful every time you feed it more of your work — the
                    same compounding logic as vertical AI, applied to one person instead of one company.
                  </p>
                </div>

                {/* Types comparison */}
                <div className="space-y-6">
                  <div className="space-y-2">
                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-secondary">Not all twins are the same</p>
                    <h3 className="text-2xl md:text-3xl font-heading font-semibold text-foreground leading-tight">
                      Four kinds of &ldquo;digital twin&rdquo; in circulation today
                    </h3>
                    <p className="text-secondary leading-relaxed max-w-3xl">
                      The term gets used loosely. This site is about the first row — a reasoning twin
                      grounded in your own knowledge — but it helps to see where the others sit.
                    </p>
                  </div>
                  <MatrixGrid columns={twinTypeColumns} rows={twinTypeRows} />
                </div>

                {/* How it works */}
                <div className="space-y-6">
                  <div className="space-y-2 text-center">
                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-secondary">How it&apos;s built</p>
                    <h3 className="text-2xl md:text-3xl font-heading font-semibold text-foreground leading-tight">
                      Capture → Structure → Reason → Act
                    </h3>
                  </div>
                  <FlowSteps
                    steps={[
                      { id: "capture", title: "Capture", subtitle: "Voice notes, docs, transcripts", detail: "Everything you'd otherwise forget — a voice memo in the car, a meeting transcript, a decision made in passing — gets recorded instead of lost.", examples: ["Voice journal", "Meeting transcripts", "Notes & documents"] },
                      { id: "structure", title: "Structure", subtitle: "Vault + vector database", detail: "Raw capture gets organized by topic and embedded into a vector store, so it's retrievable by meaning, not just keyword.", examples: ["Obsidian vault", "Topic tagging", "Vector embeddings"] },
                      { id: "reason", title: "Reason", subtitle: "An AI grounded in your context", detail: "A model reasons over your actual history and stated goals — not generic training data — to answer, draft, or flag drift.", examples: ["Claude + MCP", "Retrieval-augmented answers", "Pattern detection"] },
                      { id: "act", title: "Act", subtitle: "Drafts, answers, coaching", detail: "The twin produces something useful in your voice or against your goals — a draft, an answer, a nudge — for you to review and approve.", examples: ["Content drafts", "Grounded Q&A", "Accountability nudges"] },
                    ]}
                    colorByIndex
                  />
                </div>

                {/* How to build one from scratch */}
                <div className="space-y-6">
                  <div className="space-y-2">
                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-secondary">From zero to a working twin</p>
                    <h3 className="text-2xl md:text-3xl font-heading font-semibold text-foreground leading-tight">
                      How to build your own digital twin
                    </h3>
                    <p className="text-secondary leading-relaxed max-w-3xl">
                      Most people start with one or two layers and add more as needed — you don&apos;t need
                      voice, video, and a custom vector database on day one. A first working version
                      typically takes 1–2 weeks and 5–10 hours of hands-on effort.
                    </p>
                  </div>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {twinBuildSteps.map((step, i) => {
                      const color = CATEGORICAL[i % CATEGORICAL.length];
                      return (
                        <div key={step.id} className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm space-y-3">
                          <div className="flex items-center gap-3">
                            <div
                              className="h-8 w-8 rounded-full flex items-center justify-center text-sm font-bold text-white flex-shrink-0"
                              style={{ backgroundColor: color }}
                            >
                              {i + 1}
                            </div>
                            <div>
                              <h4 className="text-base font-semibold text-foreground leading-snug">{step.title}</h4>
                              <p className="text-xs text-secondary">{step.subtitle}</p>
                            </div>
                          </div>
                          <p className="text-sm text-secondary leading-relaxed">{step.detail}</p>
                          <div className="flex flex-wrap gap-1.5">
                            {step.examples.map((ex) => (
                              <span key={ex} className="text-xs bg-slate-100 text-slate-600 px-2.5 py-1 rounded-full font-medium">
                                {ex}
                              </span>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Examples */}
                <div className="space-y-6">
                  <div className="space-y-2">
                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-secondary">Why it matters, concretely</p>
                    <h3 className="text-2xl md:text-3xl font-heading font-semibold text-foreground leading-tight">
                      Four real uses — and what breaks without them
                    </h3>
                  </div>
                  <div className="grid md:grid-cols-2 gap-5">
                    {twinExamples.map((ex, i) => (
                      <motion.div
                        key={ex.title}
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-60px" }}
                        transition={{ duration: 0.4, delay: i * 0.05 }}
                        className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm space-y-3"
                      >
                        <span className="text-xs font-semibold uppercase tracking-[0.16em] text-secondary bg-slate-100 px-3 py-1 rounded-full">
                          {ex.context}
                        </span>
                        <h4 className="text-lg font-heading font-semibold text-foreground leading-snug">{ex.title}</h4>
                        <p className="text-sm text-secondary leading-relaxed">{ex.desc}</p>
                        <div className="rounded-lg bg-amber-50/70 border-l-4 border-amber-400 px-3 py-2">
                          <p className="text-xs font-semibold text-amber-800 uppercase tracking-wide mb-0.5">Why it matters</p>
                          <p className="text-sm text-foreground/90 leading-relaxed">{ex.why}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Disclosure guardrail */}
                <div className="rounded-2xl border border-red-100 bg-red-50/60 p-6 flex items-start gap-4 shadow-sm">
                  <div className="text-2xl" aria-hidden>⚠️</div>
                  <div className="space-y-1">
                    <p className="text-sm font-semibold text-red-800 uppercase tracking-wide">The one non-negotiable guardrail</p>
                    <p className="text-base text-red-900/90 leading-relaxed">
                      It should always be clear to anyone interacting with your twin that they&apos;re talking
                      to an AI, not you directly. Undisclosed AI clones erode exactly the trust a digital
                      twin is supposed to compound — disclosure isn&apos;t a legal footnote, it&apos;s the whole
                      deal.
                    </p>
                  </div>
                </div>
              </section>

              {/* Bridge */}
              <section id="bridge" className="scroll-mt-24">
                <SectionReveal>
                  <div className="rounded-3xl border border-black/5 bg-white p-10 shadow-sm space-y-4">
                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-secondary">
                      Bridge to execution checklist
                    </p>
                    <h2 className="text-3xl font-heading font-semibold text-foreground leading-tight">
                      Understanding the system is the prerequisite. Execution comes next.
                    </h2>
                    <p className="text-base text-secondary leading-relaxed">
                      The checklist is how to turn this mindset into action. Once the
                      system is mapped, execution is the only responsible next step.
                      Systems thinking creates accountability, ownership, and operational
                      clarity; stopping at understanding leaves value on the table and
                      keeps hidden drag in place.
                    </p>
                    <div>
                      <ShimmerButton href="/execution-checklist">
                        Go to Execution Checklist →
                      </ShimmerButton>
                    </div>
                  </div>
                </SectionReveal>
              </section>
            </div>
          </LayoutGroup>
        </div>
      </main>
    </div>
  );
}
