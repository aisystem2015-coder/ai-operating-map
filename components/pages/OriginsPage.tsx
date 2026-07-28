"use client";

import React, { Fragment } from "react";
import Image from "next/image";
import Navigation from "../Navigation";
import SectionReveal from "../learning/SectionReveal";
import CpuGpuDotDemo from "../learning/CpuGpuDotDemo";
import AIOriginsHero from "../ai-origins/ai-origins-hero";
import HistoricalArc from "../ai-origins/historical-arc";

const BrainAmnesiaVisual = () => (
  <div className="hover-glow rounded-3xl border border-black/5 bg-white shadow-xl shadow-rose-100/50 p-4">
    <div className="rounded-2xl overflow-hidden bg-gradient-to-br from-white via-rose-50 to-white border border-rose-100">
      <Image
        src="/ai-origins/genius-amnesia.png"
        alt="LLM with low battery illustrating context limits"
        width={1200}
        height={760}
        className="w-full h-auto object-cover"
        priority
      />
    </div>
  </div>
);

const OpenBookVisual = () => (
  <div className="hover-glow rounded-3xl border border-black/5 bg-white shadow-lg shadow-emerald-100/60 p-4">
    <div className="rounded-2xl overflow-hidden border border-emerald-100 bg-gradient-to-br from-white via-emerald-50 to-white">
      <Image
        src="/ai-origins/open-book-rag.png"
        alt="RAG as an open book exam"
        width={1200}
        height={760}
        className="w-full h-auto object-cover"
      />
    </div>
  </div>
);

const VectorCubeVisual = () => (
  <div className="hover-glow rounded-2xl overflow-hidden border border-emerald-100 bg-emerald-50/40">
    <Image
      src="/ai-origins/vector-rag.png"
      alt="Vector RAG cube visual"
      width={1200}
      height={760}
      className="w-full h-auto object-cover"
    />
  </div>
);

const SqlCalcVisual = () => (
  <div className="hover-glow rounded-2xl overflow-hidden border border-sky-100 bg-sky-50/40">
    <Image
      src="/ai-origins/sql-rag.png"
      alt="SQL RAG database and calculator"
      width={1200}
      height={760}
      className="w-full h-auto object-cover"
    />
  </div>
);

const WhichOneTable = () => (
  <div className="hover-glow rounded-2xl overflow-hidden border border-emerald-100 bg-emerald-50/30">
    <Image
      src="/ai-origins/which-one.png"
      alt="Comparison of Vector, SQL, and Graph RAG"
      width={1200}
      height={760}
      className="w-full h-auto object-cover"
    />
  </div>
);

const AgenticRagFlowVisual = () => (
  <div className="hover-glow rounded-2xl overflow-hidden border border-emerald-100 bg-emerald-50/30">
    <Image
      src="/ai-origins/agentic-rag.png"
      alt="Agentic RAG flow routing user question to vector or SQL RAG"
      width={1200}
      height={760}
      className="w-full h-auto object-cover"
    />
  </div>
);

const GraphRagNetworkVisual = () => (
  <div className="hover-glow rounded-2xl overflow-hidden border border-emerald-100 bg-emerald-50/30">
    <Image
      src="/ai-origins/graph-rag.png"
      alt="Graph RAG network of connected entities"
      width={1200}
      height={760}
      className="w-full h-auto object-cover"
    />
  </div>
);

export default function OriginsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main>
        {/* Section 1: Opening — Framing the Shift (Hero Section) */}
        <AIOriginsHero />

        {/* Section 2: What We Mean by "Artificial Intelligence" */}
        <section className="py-16 px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <SectionReveal>
              <div className="bg-white/80 p-10 rounded-2xl border border-black/5 relative overflow-hidden">
                <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_1px_1px,rgba(16,185,129,0.05),transparent_0)] bg-[length:26px_26px]" />
                <div className="relative flex items-start gap-6">
                  <div className="flex items-baseline gap-2">
                    <div className="rounded-2xl overflow-hidden border border-emerald-100 bg-emerald-50/30 shadow-sm">
                      <Image
                        src="/ai-origins/ai-letters.png"
                        alt="AI letters sketch"
                        width={360}
                        height={360}
                        className="w-40 h-auto object-cover"
                        priority
                      />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <h2 className="text-3xl font-heading font-semibold text-foreground">
                      What We Mean by &quot;Artificial Intelligence&quot;
                    </h2>
                    <p className="text-lg text-secondary leading-relaxed">
                      Throughout this experience, we use AI to describe systems that learn behavior from data rather than execute fixed rules. In the 1950s, &quot;AI&quot; meant rule-based systems. Today, it means models trained on data. The shift from rules to training is the story this section tells.
                    </p>
                  </div>
                </div>
              </div>
            </SectionReveal>
          </div>
        </section>

        {/* Section 2.5: Conceptual Grounding - What Computers Do */}
        <section className="py-16 px-6 lg:px-8 bg-white/30">
          <div className="max-w-5xl mx-auto">
            <SectionReveal>
              <div className="bg-white/80 p-10 rounded-2xl border border-black/5">
                <div className="grid md:grid-cols-[1.05fr_0.95fr] gap-10 items-center">
                  <div className="space-y-4">
                    <h2 className="text-3xl font-heading font-semibold text-foreground">
                      What Computers Fundamentally Do
                    </h2>
                    <p className="text-lg text-secondary leading-relaxed">
                      Computers are fast math machines. They read bytes, run arithmetic and logic, and write bytes back—millions of times per second.
                    </p>
                    <p className="text-base text-secondary leading-relaxed">
                      AI just rides that loop with far more math and parallelism.
                    </p>
                  </div>
                  <div className="rounded-2xl overflow-hidden border border-emerald-100 bg-emerald-50/40">
                    <Image
                      src="/ai-origins/computer-loop.png"
                      alt="Input compute output loop sketch"
                      width={1400}
                      height={780}
                      className="w-full h-auto object-cover"
                    />
                  </div>
                </div>
              </div>
            </SectionReveal>
          </div>
        </section>

        {/* Section 3: Historical Arc — Horizontal Scroll Timeline */}
        <section className="relative py-32 px-6 lg:px-8 bg-white/40">
          <div className="max-w-7xl mx-auto">
            <HistoricalArc />
          </div>
        </section>

        {/* Section 4: 2012 — Hardware Changes Everything */}
        <section className="py-32 px-6 lg:px-8 bg-white/30">
          <div className="max-w-5xl mx-auto space-y-10">
            <SectionReveal>
              <h2 className="text-5xl md:text-6xl font-heading font-bold text-foreground leading-tight">
                Hardware Changes Everything
              </h2>
            </SectionReveal>

            <div className="space-y-6 text-lg md:text-xl text-foreground leading-[1.7] font-light">
              <SectionReveal>
                <p>
                  CPUs move like a single paintball gun—one shot after another. GPUs act like a confetti cannon—thousands of shots at once. Modern AI needs the cannon.
                </p>
              </SectionReveal>
            </div>

            <SectionReveal delay={0.1}>
              <CpuGpuDotDemo />
            </SectionReveal>
          </div>
        </section>

        {/* Section 5: Transformers — The Missing Link */}
        <section className="py-32 px-6 lg:px-8 bg-gradient-to-br from-emerald-50/60 via-white to-emerald-50/40">
          <div className="max-w-6xl mx-auto space-y-10">
            <SectionReveal>
              <div className="space-y-4">
                <p className="text-sm uppercase tracking-[0.2em] text-emerald-600">Context at once</p>
                <h2 className="text-5xl md:text-6xl font-heading font-bold text-foreground leading-tight">
                  Transformers: The bridge from ML to modern AI
                </h2>
                <p className="text-lg md:text-xl text-secondary leading-relaxed max-w-3xl">
                  Transformers let models read whole contexts simultaneously instead of step-by-step. That parallel attention is the leap that made language understanding, long-range reasoning, and LLMs possible.
                </p>
              </div>
            </SectionReveal>
            <SectionReveal delay={0.15}>
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  { title: "Parallel attention", body: "Processes every token against every other token in one pass." },
                  { title: "Meaning over order", body: "Captures relationships, not just sequence, unlocking richer reasoning." },
                  { title: "Foundation for LLMs", body: "The architecture that turned massive text corpora into usable cognition." },
                ].map((item, idx) => (
                  <div
                    key={item.title}
                    className="hover-glow rounded-2xl border border-emerald-100 bg-white/80 shadow-lg shadow-emerald-100/40 p-6"
                  >
                    <div className="text-sm font-semibold text-emerald-700 mb-3">0{idx + 1}</div>
                    <h3 className="text-xl font-heading font-semibold text-foreground mb-2">{item.title}</h3>
                    <p className="text-sm md:text-base text-secondary leading-relaxed">{item.body}</p>
                  </div>
                ))}
              </div>
            </SectionReveal>
            <SectionReveal delay={0.25}>
              <div className="rounded-3xl border border-black/5 bg-white shadow-xl shadow-emerald-100/50 p-4">
                <Image
                  src="/ai-origins/transformers-parallel.png"
                  alt="Old ML sequential vs transformers parallel attention"
                  width={1200}
                  height={680}
                  className="w-full h-auto object-contain"
                  priority
                />
              </div>
            </SectionReveal>
          </div>
        </section>

        {/* Section 5.5: What is a Large Language Model? */}
        <section className="py-24 px-6 lg:px-8 bg-white/50">
          <div className="max-w-6xl mx-auto">
            <SectionReveal>
              <div className="rounded-3xl border border-black/5 bg-white shadow-xl shadow-emerald-100/50 p-10 space-y-5">
                <p className="text-sm uppercase tracking-[0.2em] text-emerald-600">LLM defined</p>
                <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground leading-tight">
                  What is a Large Language Model (LLM)?
                </h2>
                <p className="text-lg text-secondary leading-relaxed">
                  An LLM is a massive probabilistic prediction engine. It doesn&apos;t store facts in rows and columns; it is trained on vast text to predict the most statistically probable next word. It optimizes for plausibility—sounding right—based on patterns, which is why it feels intelligent. This sets up why, without grounding, it can drift into confident guesses.
                </p>
              </div>
            </SectionReveal>
          </div>
        </section>

        {/* Section 6: The Problem — Geniuses with Amnesia */}
        <section className="py-28 px-6 lg:px-8">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-[1.05fr_0.95fr] gap-10 items-center">
            <SectionReveal>
              <div className="space-y-5">
                <p className="text-sm uppercase tracking-[0.2em] text-rose-600">The problem</p>
                <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground leading-tight">
                  Geniuses with Amnesia
                </h2>
                <p className="text-lg md:text-xl text-secondary leading-relaxed">
                  LLMs have strict context limits—like temporary memory loss. When they run out of context, they guess.
                </p>
                <div className="space-y-3">
                  <div className="rounded-xl border border-rose-100 bg-rose-50/70 p-4">
                    <p className="text-sm text-rose-900">
                      Hallucinations are not a bug—they&apos;re what happens when retrieval fails. Without a grounded knowledge base, semantic search drifts, data gets contaminated, and the model is forced to fill gaps.
                    </p>
                  </div>
                  <ul className="space-y-2 text-sm md:text-base text-secondary leading-relaxed">
                    <li>• Context window exhaustion behaves like memory loss.</li>
                    <li>• When unsure, the model optimizes for plausibility, not truth.</li>
                  </ul>
                </div>
              </div>
            </SectionReveal>
            <SectionReveal delay={0.12}>
              <BrainAmnesiaVisual />
            </SectionReveal>
          </div>
        </section>

        {/* Section 7: The Solution — RAG as an Open Book Exam */}
        <section className="py-24 px-6 lg:px-8 bg-white/40">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-[1.05fr_0.95fr] gap-10 items-center">
            <SectionReveal>
              <div className="space-y-4">
                <p className="text-sm uppercase tracking-[0.2em] text-emerald-600">The solution</p>
                <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground leading-tight">
                  RAG: The Open Book Exam
                </h2>
                <p className="text-lg text-secondary leading-relaxed">
                  Instead of forcing the AI to memorize everything, Retrieval-Augmented Generation looks up the exact answer before speaking.
                </p>
              </div>
            </SectionReveal>
            <SectionReveal delay={0.12}>
              <OpenBookVisual />
            </SectionReveal>
          </div>
        </section>

        {/* Section 8: Vector vs SQL RAG */}
        <section className="py-28 px-6 lg:px-8">
          <div className="max-w-6xl mx-auto space-y-10">
            <SectionReveal>
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                  <p className="text-sm uppercase tracking-[0.2em] text-emerald-600">Databases that make RAG work</p>
                  <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground leading-tight">
                    Two retrieval engines, one orchestration
                  </h2>
                </div>
                <span className="text-sm px-4 py-2 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100">
                  Text? Use vectors. Numbers? Use SQL.
                </span>
              </div>
            </SectionReveal>

            <div className="grid lg:grid-cols-2 gap-8">
              <SectionReveal>
                <div className="rounded-3xl border border-black/5 bg-white shadow-xl shadow-emerald-100/50 p-6 space-y-4 h-full flex flex-col">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-semibold px-3 py-1 rounded-full bg-emerald-100 text-emerald-800">
                      Vector RAG
                    </span>
                    <p className="text-sm text-secondary">GPS for meaning</p>
                  </div>
                  <h3 className="text-2xl font-heading font-semibold text-foreground">Chunks text → turns to numbers (vectors)</h3>
                  <p className="text-base text-secondary leading-relaxed">
                    Best for unstructured text like PDFs; semantic search retrieves by meaning, not keywords.
                  </p>
                  <div className="mt-auto">
                    <VectorCubeVisual />
                  </div>
                </div>
              </SectionReveal>

              <SectionReveal delay={0.1}>
                <div className="rounded-3xl border border-black/5 bg-white shadow-xl shadow-sky-100/60 p-6 space-y-4 h-full flex flex-col">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-semibold px-3 py-1 rounded-full bg-sky-100 text-sky-800">
                      SQL RAG
                    </span>
                    <p className="text-sm text-secondary">Facts & math</p>
                  </div>
                  <h3 className="text-2xl font-heading font-semibold text-foreground">Returns exact numbers</h3>
                  <p className="text-base text-secondary leading-relaxed">
                    Structured data stays in tables. Use SQL to fetch precise facts—no embeddings needed.
                  </p>
                  <div className="rounded-xl border border-rose-200 bg-rose-50/70 px-4 py-3 text-sm font-semibold text-rose-700 inline-flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-rose-500" />
                    Note: No Embeddings needed!
                  </div>
                  <div className="mt-auto">
                    <SqlCalcVisual />
                  </div>
                </div>
              </SectionReveal>
            </div>
          </div>
        </section>

        {/* Section 9: How Embeddings Work */}
        <section className="py-28 px-6 lg:px-8 bg-white/30">
          <div className="max-w-6xl mx-auto space-y-10">
            <SectionReveal>
              <div className="space-y-3">
                <p className="text-sm uppercase tracking-[0.2em] text-emerald-600">Mechanism</p>
                <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground leading-tight">
                  Embeddings: From text to 3D meaning
                </h2>
                <p className="text-lg text-secondary leading-relaxed max-w-3xl">
                  Sentences are chopped into semantic chunks, converted to numbers, and placed in a vector space where proximity encodes meaning. Retrieval then finds the closest neighbors to ground generation.
                </p>
              </div>
            </SectionReveal>

            <SectionReveal delay={0.1}>
              <div className="rounded-3xl border border-black/5 bg-white shadow-xl shadow-emerald-100/50 p-8 space-y-6">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="rounded-2xl overflow-hidden border border-emerald-100 bg-emerald-50/30">
                    <Image
                      src="/ai-origins/chunking-sketch.png"
                      alt="Text chunking sketch"
                      width={1200}
                      height={900}
                      className="w-full h-auto object-cover"
                    />
                  </div>
                  <div className="rounded-2xl overflow-hidden border border-emerald-100 bg-emerald-50/30">
                    <Image
                      src="/ai-origins/vector-space-sketch.png"
                      alt="Vector space embedding sketch"
                      width={1200}
                      height={900}
                      className="w-full h-auto object-cover"
                    />
                  </div>
                </div>
                <div className="rounded-2xl border border-emerald-100 bg-emerald-50/70 p-5 text-sm text-emerald-900 leading-relaxed">
                  Semantic search finds the nearest neighbors in the vector space, so generation is grounded by retrieved meaning—not brittle keyword matches.
                </div>
              </div>
            </SectionReveal>
          </div>
        </section>

        {/* Section 10: Choosing the Right RAG & Agentic Routing */}
        <section className="py-24 px-6 lg:px-8">
          <div className="max-w-6xl mx-auto space-y-12">
            <SectionReveal>
              <div className="space-y-3">
                <p className="text-sm uppercase tracking-[0.2em] text-emerald-600">Selection + Orchestration</p>
                <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground leading-tight">
                  Which one to use? Route by question.
                </h2>
              </div>
            </SectionReveal>

            <div className="grid md:grid-cols-2 gap-8">
              <SectionReveal>
                <div className="rounded-3xl border border-black/5 bg-white shadow-xl shadow-emerald-100/50 p-4 space-y-4">
                <WhichOneTable />
                  <p className="text-sm text-secondary leading-relaxed">
                    Vector = meaning (low cost). SQL = math/facts (low cost). Graph = connections (high cost). Pick by data type.
                  </p>
                </div>
              </SectionReveal>

              <SectionReveal delay={0.1}>
                <div className="rounded-3xl border border-black/5 bg-white shadow-xl shadow-emerald-100/50 p-4 space-y-4">
                <AgenticRagFlowVisual />
                  <p className="text-sm text-secondary leading-relaxed">
                    Router asks: is this text or numbers? Vector RAG handles meaning; SQL RAG handles facts. Both converge into one final answer—the best of both worlds.
                  </p>
                </div>
              </SectionReveal>
            </div>
          </div>
        </section>

        {/* Section 11: Graph RAG */}
        <section className="py-24 px-6 lg:px-8 bg-white/40">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-[1.05fr_0.95fr] gap-10 items-center">
            <SectionReveal>
              <div className="space-y-4">
                <p className="text-sm uppercase tracking-[0.2em] text-emerald-600">Connections</p>
                <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground leading-tight">
                  Graph RAG: Mapping Relationships
                </h2>
                <p className="text-lg text-secondary leading-relaxed">
                  Finds hidden links across entities—great for fraud, investigations, and complex networks. Uses probabilities to trace relationships that aren&apos;t obvious in rows or vectors alone.
                </p>
                <ul className="space-y-2 text-sm md:text-base text-secondary leading-relaxed">
                  <li>• Connects people, places, accounts, and events.</li>
                  <li>• Surfaces indirect ties and suspicious patterns.</li>
                  <li>• Complements vector and SQL for multi-hop reasoning.</li>
                </ul>
              </div>
            </SectionReveal>
            <SectionReveal delay={0.12}>
              <GraphRagNetworkVisual />
            </SectionReveal>
          </div>
        </section>

        {/* Section 11.5: Semantic Synthesis */}
        <section className="py-24 px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <SectionReveal>
              <div className="rounded-3xl border border-black/5 bg-white shadow-xl shadow-emerald-100/50 p-10 space-y-5">
                <p className="text-sm uppercase tracking-[0.2em] text-emerald-600">Semantic synthesis</p>
                <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground leading-tight">
                  Semantic Synthesis: Crafting the Answer
                </h2>
                <p className="text-lg text-secondary leading-relaxed">
                  After semantic search retrieves the closest data points from the vector space, the LLM doesn&apos;t copy and paste. It synthesizes the retrieved context using its language capability to craft a coherent, human-style response—for example, &ldquo;Based on the data, I recommend...&rdquo;. This bridges cold retrieval and natural interaction.
                </p>
              </div>
            </SectionReveal>
          </div>
        </section>

        {/* Section 12: The Ultimate Translator */}
        <section className="py-28 px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <SectionReveal>
              <div className="rounded-3xl border border-black/5 bg-white shadow-xl shadow-emerald-100/50 p-10 space-y-6">
                <div className="space-y-3">
                  <p className="text-sm uppercase tracking-[0.2em] text-emerald-600">Prompt engineering</p>
                  <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground leading-tight">
                    The Ultimate Translator: Natural Language as Code
                  </h2>
                </div>
                <div className="space-y-4 text-lg text-secondary leading-relaxed">
                  <p>
                    A prompt feels like conversation, but it&apos;s the new interface for infrastructure. Behind the scenes, the LLM turns your natural language into a JSON payload that hits databases, triggers APIs, and runs heavy compute—then translates the results back into human language.
                  </p>
                  <p className="text-base text-secondary">
                    We don&apos;t need bloated plugins or pre-packaged skills. A highly engineered prompt with strict thresholds, schema, and logic becomes the command layer—replacing thousands of lines of traditional code with one orchestrated instruction set.
                  </p>
                  <div className="rounded-2xl overflow-hidden border border-emerald-100 bg-emerald-50/30">
                    <Image
                      src="/ai-origins/prompt-translation.png"
                      alt="Natural language translated to infrastructure action"
                      width={1400}
                      height={780}
                      className="w-full h-auto object-cover"
                    />
                  </div>
                </div>
              </div>
            </SectionReveal>
          </div>
        </section>
      </main>
    </div>
  );
}
