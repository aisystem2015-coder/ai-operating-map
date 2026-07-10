"use client";

import SectionReveal from "../learning/SectionReveal";

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
];

export default function DigitalTwinSection() {
  return (
    <section id="digital-twin" className="scroll-mt-24">
      <SectionReveal>
        <div className="space-y-4 mb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-secondary">
            The personal layer
          </p>
          <h2 className="text-3xl md:text-4xl font-heading font-semibold text-foreground leading-tight">
            Your digital twin
          </h2>
        </div>
      </SectionReveal>

      <SectionReveal delay={0.05}>
        <div className="rounded-3xl border border-black/5 bg-gradient-to-br from-slate-900 to-slate-800 p-10 lg:p-12 text-white space-y-5 mb-10">
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

      <SectionReveal delay={0.1}>
        <div className="grid md:grid-cols-3 gap-5">
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
