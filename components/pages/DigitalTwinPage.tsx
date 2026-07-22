"use client";

/**
 * Digital Twin — promoted back to a real, dedicated page (Meet 16,
 * 2026-07-21). Previously this route just redirected into /ai-mindset as a
 * closing section (Meet 13 decision). Francisco: "esto tiene que volverse
 * ahora a una página de verdad... primero a una página de research, ahora
 * a una página de verdad."
 *
 * Written for someone with zero context ("alguien que no tiene ni puta
 * idea") — definition first, then what it takes to build one, then where
 * to store the data and what's best, with the real-time/continuously-synced
 * framing carried through the whole page. Most of the definition/stats/
 * examples/build-steps content below is moved as-is from the old closing
 * section in components/pages/AIMindsetPage.tsx, not rewritten from
 * scratch — see the teaser left in its old spot there.
 */

import Navigation from "../Navigation";
import SectionReveal from "../learning/SectionReveal";
import InteractiveGlow from "../ui/interactive-glow";
import { ShimmerButton } from "../ui/shimmer-button";
import StatTile from "../charts/StatTile";
import FlowSteps from "../charts/FlowSteps";
import MatrixGrid from "../charts/MatrixGrid";
import ChartSource from "../charts/ChartSource";
import { CATEGORICAL } from "../charts/tokens";
import RainbowLayers from "../rainbow/rainbow-layers";
import TwinChatWidget from "../digital-twin/twin-chat-widget";
import { motion } from "framer-motion";

const heroFade = {
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

// "Where should you store the data?" — Francisco's second ask ("cómo la
// gente puede almacenar datos y cuál es lo mejor"). New content, not moved
// from AIMindsetPage — that page never covered storage specifically.
const storageColumns = [
  { id: "is", label: "What it is" },
  { id: "tradeoff", label: "Trade-off" },
];

const storageRows = [
  {
    label: "Local plain-text vault",
    cells: {
      is: { primary: "Markdown notes on your own machine (e.g. Obsidian), synced via Git, iCloud, or Dropbox. No vendor, no API." },
      tradeoff: { primary: "Free, portable, human-readable, works with almost any AI tool via retrieval. You own backup and search yourself." },
    },
  },
  {
    label: "Cloud vector database",
    cells: {
      is: { primary: "Your notes embedded and stored in a hosted vector DB (Pinecone, Supabase pgvector, Weaviate) so any device or app can query it." },
      tradeoff: { primary: "Multi-device sync and programmatic access at scale — but a third party now holds your data, plus a monthly bill." },
    },
  },
  {
    label: "Managed twin platform",
    cells: {
      is: { primary: "A platform like Delphi or Personal.ai that handles storage, embeddings, and the chat interface for you end to end." },
      tradeoff: { primary: "Fastest to launch, zero infrastructure to run — but the least control over your own data, and the hardest to migrate away from." },
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

export default function DigitalTwinPage() {
  return (
    <div className="min-h-screen bg-white text-foreground">
      <Navigation />

      <main className="pt-32 lg:pt-36 pb-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="space-y-24">
            {/* Hero — plain-language definition for someone with zero context */}
            <section id="hero" className="scroll-mt-28 space-y-8">
              <SectionReveal>
                <div className="text-center max-w-3xl mx-auto space-y-4">
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-secondary">
                    The personal layer
                  </p>
                  <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground leading-tight">
                    Your Digital Twin
                  </h1>
                  <p className="text-lg text-secondary leading-relaxed">
                    In plain terms: imagine a version of you that never forgets anything you&apos;ve told
                    it, and can answer questions or draft things on your behalf — grounded in what
                    you actually know and how you actually talk, not a generic internet-trained
                    chatbot. That&apos;s the whole idea. Nothing more complicated than that.
                  </p>
                </div>
              </SectionReveal>

              <motion.div {...heroFade} className="relative isolate overflow-hidden rounded-3xl py-10 px-2 -mx-2 space-y-6">
                <InteractiveGlow colors={["#1BC4A6", "#7C3AED", "#2563EB"]} />
                <div className="relative z-10 space-y-5 max-w-4xl mx-auto text-center">
                  <div className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700 border border-emerald-200 shadow-sm">
                    Real-time, not a one-time export
                  </div>
                  <p className="text-lg text-secondary leading-relaxed max-w-3xl mx-auto text-left">
                    &ldquo;Digital twin&rdquo; started as an industrial idea: a live virtual replica of a
                    physical asset — a jet engine, a factory line — fed by real sensor data so engineers
                    could simulate and predict without touching the real thing. AI extends the same idea
                    from machines to knowledge: instead of twinning a turbine, you twin a person&apos;s
                    expertise, decisions, and voice. The point isn&apos;t a one-time snapshot of who you
                    were — it&apos;s meant to be, in the words of an earlier internal brief, &ldquo;a real
                    time thing, that&apos;s synced with you all the time&rdquo;: every voice note, transcript,
                    and decision keeps feeding it, so it never goes stale.
                  </p>
                </div>
              </motion.div>
            </section>

            {/* Stats */}
            <section id="stats" className="scroll-mt-28 space-y-4">
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
            </section>

            {/* Definition */}
            <section id="definition" className="scroll-mt-28">
              <SectionReveal>
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
              </SectionReveal>
            </section>

            {/* The rainbow — the LLM -> Assistants -> Agents -> Agentic stack
                a digital twin like this is built on top of. */}
            <section id="stack" className="scroll-mt-28">
              <SectionReveal>
                <RainbowLayers />
              </SectionReveal>
            </section>

            {/* Types comparison */}
            <section id="types" className="scroll-mt-28 space-y-6">
              <div className="space-y-2">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-secondary">Not all twins are the same</p>
                <h2 className="text-2xl md:text-3xl font-heading font-semibold text-foreground leading-tight">
                  Four kinds of &ldquo;digital twin&rdquo; in circulation today
                </h2>
                <p className="text-secondary leading-relaxed max-w-3xl">
                  The term gets used loosely. This page is about the first row — a reasoning twin
                  grounded in your own knowledge — but it helps to see where the others sit.
                </p>
              </div>
              <MatrixGrid columns={twinTypeColumns} rows={twinTypeRows} />
            </section>

            {/* How it works */}
            <section id="how-it-works" className="scroll-mt-28 space-y-6">
              <div className="space-y-2 text-center">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-secondary">How it&apos;s built</p>
                <h2 className="text-2xl md:text-3xl font-heading font-semibold text-foreground leading-tight">
                  Capture → Structure → Reason → Act
                </h2>
                <p className="text-secondary leading-relaxed max-w-2xl mx-auto">
                  This isn&apos;t a one-time training run. It&apos;s a loop that keeps running — new capture
                  keeps re-feeding structure, which keeps reasoning current, which is what makes it
                  &ldquo;real-time&rdquo; instead of a snapshot of who you were on the day you set it up.
                </p>
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
            </section>

            {/* Where to store the data */}
            <section id="storage" className="scroll-mt-28 space-y-6">
              <div className="space-y-2">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-secondary">The question everyone skips</p>
                <h2 className="text-2xl md:text-3xl font-heading font-semibold text-foreground leading-tight">
                  Where does your data actually live — and what&apos;s best?
                </h2>
                <p className="text-secondary leading-relaxed max-w-3xl">
                  A digital twin is only as good as what it&apos;s fed, and everything it&apos;s fed has to be
                  stored somewhere. Three real options, in roughly the order most people move through them:
                </p>
              </div>
              <MatrixGrid columns={storageColumns} rows={storageRows} />
              <div className="rounded-2xl border border-emerald-100 bg-emerald-50/60 p-6 shadow-sm">
                <p className="text-sm font-semibold text-emerald-800 uppercase tracking-wide mb-1">Best default for most people</p>
                <p className="text-base text-emerald-900/90 leading-relaxed">
                  Start with a local plain-text vault. It&apos;s free, it&apos;s yours, and it works with almost
                  any AI tool via retrieval-augmented generation. Only move to a cloud vector database once
                  you actually need multi-device sync or programmatic access at scale — don&apos;t pay for
                  infrastructure you don&apos;t need yet.
                </p>
              </div>
            </section>

            {/* How to build one from scratch */}
            <section id="build" className="scroll-mt-28 space-y-6">
              <div className="space-y-2">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-secondary">What it takes to build one</p>
                <h2 className="text-2xl md:text-3xl font-heading font-semibold text-foreground leading-tight">
                  From zero to a working twin
                </h2>
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
                          <h3 className="text-base font-semibold text-foreground leading-snug">{step.title}</h3>
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
            </section>

            {/* Examples */}
            <section id="examples" className="scroll-mt-28 space-y-6">
              <div className="space-y-2">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-secondary">Why it matters, concretely</p>
                <h2 className="text-2xl md:text-3xl font-heading font-semibold text-foreground leading-tight">
                  Four real uses — and what breaks without them
                </h2>
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
                    <h3 className="text-lg font-heading font-semibold text-foreground leading-snug">{ex.title}</h3>
                    <p className="text-sm text-secondary leading-relaxed">{ex.desc}</p>
                    <div className="rounded-lg bg-amber-50/70 border-l-4 border-amber-400 px-3 py-2">
                      <p className="text-xs font-semibold text-amber-800 uppercase tracking-wide mb-0.5">Why it matters</p>
                      <p className="text-sm text-foreground/90 leading-relaxed">{ex.why}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* Disclosure guardrail */}
            <section id="guardrail" className="scroll-mt-28">
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

            {/* New beginner-friendly product page — additive card only, does
                not touch this page's own content or its stub chat widget
                below. See components/pages/CreateYourDigitalTwinPage.tsx. */}
            <section id="build-your-own-cta" className="scroll-mt-28">
              <SectionReveal>
                <div className="rounded-3xl border border-indigo-100 bg-gradient-to-br from-indigo-50 via-sky-50 to-amber-50 p-8 lg:p-10 flex flex-col lg:flex-row items-center justify-between gap-6">
                  <div className="space-y-2 text-center lg:text-left">
                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-indigo-600">New — beginner friendly</p>
                    <h2 className="text-2xl font-heading font-semibold text-foreground leading-tight">
                      New to all this? Try the plain-language version — and talk to a real twin live.
                    </h2>
                    <p className="text-sm text-secondary leading-relaxed max-w-xl">
                      A separate, no-jargon walkthrough with a working chat you can actually talk to right now.
                    </p>
                  </div>
                  <ShimmerButton href="/create-your-digital-twin" background="#6366F1" className="shrink-0">
                    Build your own twin →
                  </ShimmerButton>
                </div>
              </SectionReveal>
            </section>

            {/* Bridge */}
            <section id="bridge" className="scroll-mt-28">
              <SectionReveal>
                <div className="rounded-3xl border border-black/5 bg-white p-10 shadow-sm space-y-4">
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-secondary">
                    Same system thinking, one level up
                  </p>
                  <h2 className="text-3xl font-heading font-semibold text-foreground leading-tight">
                    This is the AI Mindset&apos;s five-layer model, scoped to one person.
                  </h2>
                  <p className="text-base text-secondary leading-relaxed">
                    Everything above — inputs, reasoning, orchestration, tools, outcomes — is the same
                    system model the rest of this site applies to companies. Go back to see it applied
                    at that scale, or jump straight to the checklist for turning either into action.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <ShimmerButton href="/ai-mindset">
                      See the full AI Mindset model →
                    </ShimmerButton>
                    <ShimmerButton href="/execution-checklist" background="#0F172A">
                      Go to Execution Checklist →
                    </ShimmerButton>
                  </div>
                </div>
              </SectionReveal>
            </section>
          </div>
        </div>
      </main>

      {/* "La pelotita" — Nivel 2 chat bubble, stub-backed (see honesty note
          in components/digital-twin/twin-chat-widget.tsx). */}
      <TwinChatWidget />
    </div>
  );
}
