"use client";

import SectionReveal from "../learning/SectionReveal";
import StatTile from "../charts/StatTile";
import FlowSteps from "../charts/FlowSteps";
import ChartSource from "../charts/ChartSource";
import { CATEGORICAL } from "../charts/tokens";

const stats = [
  { label: "Global digital twin market, 2026", value: "$34B", detail: "Growing at ~35% CAGR toward $385B by 2034." },
  { label: "Large enterprises investing in digital twins", value: "75%", detail: "To scale AI solutions across operations." },
  { label: "Faster decision cycles reported", value: "90%", detail: "Where digital twins are in production, not pilot." },
  { label: "Pilots that reached core workflows", value: "15%", detail: "The same production gap seen everywhere else in AI." },
];

const howItWorks = [
  {
    id: "capture",
    title: "Capture",
    subtitle: "Voice notes, docs, transcripts",
    detail: "Everything you'd otherwise forget — a voice memo in the car, a meeting transcript, a decision made in passing — gets recorded instead of lost.",
    examples: ["Voice journal", "Meeting transcripts", "Notes & documents"],
  },
  {
    id: "structure",
    title: "Structure",
    subtitle: "Vault + vector database",
    detail: "Raw capture gets organized by topic and embedded into a vector store, so it's retrievable by meaning, not just keyword.",
    examples: ["Obsidian vault", "Topic tagging", "Vector embeddings"],
  },
  {
    id: "reason",
    title: "Reason",
    subtitle: "An AI grounded in your context",
    detail: "A model reasons over your actual history and stated goals — not generic training data — to answer, draft, or flag drift.",
    examples: ["Claude + MCP", "Retrieval-augmented answers", "Pattern detection"],
  },
  {
    id: "act",
    title: "Act",
    subtitle: "Drafts, answers, coaching",
    detail: "The twin produces something useful in your voice or against your goals — a draft, an answer, a nudge — for you to review and approve.",
    examples: ["Content drafts", "Grounded Q&A", "Accountability nudges"],
  },
];

const examples = [
  {
    title: "A second brain that actually reasons",
    context: "Personal knowledge system",
    desc: "Every note, transcript, and decision you've made lives in one connected vault. An AI wired into it doesn't answer from generic training data — it answers from your actual context, your history, your open questions. Ask it something and you get a response grounded in what you really think and know, not a plausible-sounding guess.",
  },
  {
    title: "A coach that watches the pattern, not the moment",
    context: "Personal accountability",
    desc: "Fed a stream of what you actually do — calendar, messages, habits — against the goals you've stated, a digital twin can flag drift before you notice it yourself: the week that quietly went sideways, the goal that's been postponed three times in a row.",
  },
  {
    title: "A voice that scales without losing you",
    context: "Content & brand voice",
    desc: "Trained on what you've actually written and how you actually talk, it drafts posts, replies, and updates in your voice — not a generic corporate tone — and reports back on what landed. You review and approve; it does the repetitive first draft.",
  },
  {
    title: "A briefing you can hand to anyone in minutes",
    context: "Crisis & handoff",
    desc: "Instead of re-explaining your situation from scratch to a new doctor, lawyer, or advisor, you brief your twin once and it prepares the context — history, constraints, what's already been tried — so the human expert starts at minute ten, not minute zero.",
  },
];

export default function DigitalTwinSection() {
  return (
    <section id="digital-twin" className="scroll-mt-24 space-y-10">
      <SectionReveal>
        <div className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-secondary">
            The personal layer
          </p>
          <h2 className="text-3xl md:text-4xl font-heading font-semibold text-foreground leading-tight">
            Your digital twin
          </h2>
          <p className="text-secondary leading-relaxed max-w-3xl">
            &ldquo;Digital twin&rdquo; started as an industrial idea: a live virtual replica of a
            physical asset — a jet engine, a factory line — fed by real sensor data so engineers
            could simulate and predict without touching the real thing. AI extends the same idea
            from machines to knowledge: instead of twinning a turbine, you twin a person&apos;s
            expertise, decisions, and voice.
          </p>
        </div>
      </SectionReveal>

      <SectionReveal delay={0.03}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {stats.map((s, i) => (
            <StatTile
              key={s.label}
              label={s.label}
              value={s.value}
              detail={s.detail}
              accentColor={CATEGORICAL[i % CATEGORICAL.length]}
            />
          ))}
        </div>
        <div className="mt-2">
          <ChartSource
            label="Digital Twin Market Report; MindInventory Digital Twin Statistics 2026"
            href="https://www.mindinventory.com/blog/digital-twin-statistics/"
          />
        </div>
      </SectionReveal>

      <SectionReveal delay={0.05}>
        <div className="rounded-3xl border border-black/5 bg-gradient-to-br from-slate-900 to-slate-800 p-10 lg:p-12 text-white space-y-5">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-400">
            Definition
          </p>
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

      <SectionReveal delay={0.07}>
        <div className="space-y-4">
          <h3 className="text-xl font-heading font-semibold text-foreground text-center">
            How it&apos;s built
          </h3>
          <FlowSteps steps={howItWorks} colorByIndex />
        </div>
      </SectionReveal>

      <SectionReveal delay={0.1}>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {examples.map((ex) => (
            <div key={ex.title} className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm space-y-3">
              <span className="text-xs font-semibold uppercase tracking-[0.16em] text-secondary bg-slate-100 px-3 py-1 rounded-full">
                {ex.context}
              </span>
              <h3 className="text-lg font-heading font-semibold text-foreground leading-snug">
                {ex.title}
              </h3>
              <p className="text-sm text-secondary leading-relaxed">{ex.desc}</p>
            </div>
          ))}
        </div>
      </SectionReveal>
    </section>
  );
}
