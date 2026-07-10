"use client";

import { useEffect, useRef, useState } from "react";
import SectionReveal from "../learning/SectionReveal";
import Callout from "../learning/Callout";

export default function LLMsSection() {
  const [isTokenFocus, setIsTokenFocus] = useState(false);
  const economicsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const node = economicsRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsTokenFocus(entry.isIntersecting);
      },
      { threshold: 0.25 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const economicsSteps = [
    {
      title: "User Input",
      description: "Raw text or code entering the system.",
    },
    {
      title: "Tokens",
      description: "Measurement of data fragments the model counts.",
    },
    {
      title: "Compute",
      description: "GPU-bound math to transform and predict tokens.",
    },
    {
      title: "AI Data Centers",
      description: "Specialized facilities executing that compute.",
    },
    {
      title: "Energy",
      description: "Massive power draw proportional to token volume.",
    },
    {
      title: "Financial Cost",
      description: "Spend tied directly to tokens × compute × energy.",
    },
  ];

  return (
    <section id="llms-section" className="py-32 px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div id="llms" className="h-0" aria-hidden />
        {/* Header */}
        <SectionReveal>
          <h2 className="text-5xl md:text-6xl font-heading font-bold text-foreground mb-12 leading-tight">
            Large Language Models
          </h2>
        </SectionReveal>

        {/* Main Content */}
        <div className="space-y-12 text-lg text-foreground leading-[1.8] font-light">
          {/* Definition Card */}
          <SectionReveal>
            <div className="rounded-3xl border border-black/5 bg-white shadow-xl shadow-emerald-100/50 p-10 space-y-5">
              <p className="text-sm uppercase tracking-[0.2em] text-emerald-600">
                LLM defined
              </p>
              <h3 className="text-4xl md:text-5xl font-heading font-bold text-foreground leading-tight">
                What is an LLM?
              </h3>
              <p className="text-lg text-secondary leading-relaxed">
                An LLM is a massive probabilistic prediction engine. It doesn&apos;t store
                facts in rows and columns; it is trained on vast text to predict the most
                statistically probable next word. It optimizes for plausibility—sounding
                right—based on patterns, which is why it feels intelligent. This sets up why,
                without grounding, it can drift into confident guesses.
              </p>
            </div>
          </SectionReveal>

          {/* Mirror of the human brain */}
          <SectionReveal delay={0.04}>
            <div className="rounded-3xl border border-black/5 bg-gradient-to-br from-slate-900 to-slate-800 p-10 text-white space-y-5">
              <p className="text-sm uppercase tracking-[0.2em] text-emerald-400">
                Why it feels intelligent
              </p>
              <h3 className="text-2xl md:text-3xl font-heading font-semibold leading-tight">
                An LLM is a rough mirror of the human brain — not a metaphor, an engineering choice.
              </h3>
              <p className="text-slate-300 leading-relaxed text-lg">
                Biological neurons fire, produce small signals, and share them with other neurons.
                No single neuron &ldquo;knows&rdquo; anything — intelligence emerges from billions
                of them connected together, and we still don&apos;t fully understand how. A
                parameter in an LLM is the same idea at a different substrate: a small trained
                value that means nothing alone, but combined with billions of others, produces
                reasoning-like behavior. That&apos;s not fluff — it&apos;s the actual design
                target, which is why the output feels organic instead of mechanical.
              </p>
              <p className="text-slate-300 leading-relaxed text-lg">
                Keep both of the model&apos;s identities in view at once: it is a{" "}
                <span className="text-white font-semibold">predictive engine</span> — a probability
                machine choosing the statistically likely next token — and, at the same time, the
                closest working approximation we have to how a brain turns signal into language.
                That is exactly why it is powerful and exactly why it drifts into confident,
                fluent nonsense without grounding.
              </p>
            </div>
          </SectionReveal>

          {/* SLM placeholder */}
          <SectionReveal delay={0.06}>
            <div className="rounded-2xl border border-dashed border-emerald-300 bg-emerald-50/60 p-6 flex items-start gap-4">
              <span className="text-2xl leading-none pt-0.5" aria-hidden>🧩</span>
              <div className="space-y-1">
                <p className="text-sm font-semibold uppercase tracking-wide text-emerald-800">
                  Placeholder — SLMs (Small Language Models)
                </p>
                <p className="text-sm text-emerald-900/80 leading-relaxed">
                  Smaller, distilled models that trade some general capability for speed, lower
                  cost, and the ability to run on-device or privately. Sit next to LLMs, not
                  instead of them — pick the size for the task. Full section coming.
                </p>
              </div>
            </div>
          </SectionReveal>

          {/* Strengths & Limitations */}
          <SectionReveal delay={0.08}>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white/70 p-10 rounded-2xl border border-black/5 shadow-sm">
                <div className="mb-3">
                  <h3 className="text-2xl font-heading font-semibold text-foreground">
                    What LLMs Excel At
                  </h3>
                  <span className="block text-xs uppercase tracking-[0.2em] text-secondary font-semibold mt-1">
                    Strengths: Language &amp; Reasoning Tasks
                  </span>
                </div>
                <ul className="space-y-3 text-lg text-secondary leading-relaxed">
                  <li className="flex items-start">
                    <span className="text-emerald-600 mr-3 font-bold">✓</span>
                    <span>Summarization and synthesis of text</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-emerald-600 mr-3 font-bold">✓</span>
                    <span>Translation between languages</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-emerald-600 mr-3 font-bold">✓</span>
                    <span>Classification and categorization</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-emerald-600 mr-3 font-bold">✓</span>
                    <span>Semantic search and retrieval</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-emerald-600 mr-3 font-bold">✓</span>
                    <span>Conversational interfaces</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-emerald-600 mr-3 font-bold">✓</span>
                    <span>Code generation and explanation</span>
                  </li>
                </ul>
              </div>
              <div className="bg-white/70 p-10 rounded-2xl border border-black/5 shadow-sm">
                <div className="mb-3">
                  <h3 className="text-2xl font-heading font-semibold text-foreground">
                    What LLMs Fail At
                  </h3>
                  <span className="block text-xs uppercase tracking-[0.2em] text-secondary font-semibold mt-1">
                    Limitations: Control &amp; Determinism
                  </span>
                </div>
                <ul className="space-y-3 text-lg text-secondary leading-relaxed">
                  <li className="flex items-start">
                    <span className="text-rose-500 mr-3 font-bold">✕</span>
                    <span>Executing real-world actions without tools</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-rose-500 mr-3 font-bold">✕</span>
                    <span>Maintaining system state</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-rose-500 mr-3 font-bold">✕</span>
                    <span>Performing deterministic math</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-rose-500 mr-3 font-bold">✕</span>
                    <span>Knowing when they are hallucinating</span>
                  </li>
                </ul>
              </div>
            </div>
          </SectionReveal>

          {/* Visual Anchor */}
          <SectionReveal delay={0.15}>
            <div className="bg-white/70 border border-black/5 rounded-2xl p-8 shadow-sm">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="uppercase text-xs tracking-[0.2em] text-secondary font-semibold">
                  LLM as a reasoning engine
                </div>
                <div className="flex items-center gap-3 flex-wrap text-sm md:text-base font-medium text-foreground">
                  <span className="px-3 py-2 rounded-xl bg-foreground/5 border border-black/5">
                    Input Text
                  </span>
                  <span className="text-secondary">→</span>
                  <span
                    className={`px-3 py-2 rounded-xl border text-sm md:text-base ${
                      isTokenFocus
                        ? "bg-emerald-50 border-emerald-200 text-emerald-800 shadow-emerald-100/70 shadow-sm transition-colors"
                        : "bg-foreground/5 border-black/5"
                    }`}
                  >
                    Tokenization
                  </span>
                  <span className="text-secondary">→</span>
                  <span className="px-3 py-2 rounded-xl bg-foreground/5 border border-black/5">
                    Embeddings / Vectors
                  </span>
                  <span className="text-secondary">→</span>
                  <span className="px-3 py-2 rounded-xl bg-foreground/5 border border-black/5">
                    Probability Engine
                  </span>
                  <span className="text-secondary">→</span>
                  <span className="px-3 py-2 rounded-xl bg-foreground/5 border border-black/5">
                    Generated Output
                  </span>
                </div>
              </div>
              <p className="mt-4 text-sm text-secondary">
                LLMs optimize for plausibility, not truth.
              </p>
            </div>
          </SectionReveal>

          {/* Tokenization & Economics */}
          <SectionReveal delay={0.22}>
            <div
              ref={economicsRef}
              className={`rounded-2xl p-8 shadow-sm space-y-5 border transition-colors ${
                isTokenFocus
                  ? "bg-emerald-50/90 border-emerald-200 shadow-emerald-100/70"
                  : "bg-white/80 border-black/5"
              }`}
            >
              <div className="flex items-center justify-between flex-wrap gap-3">
                <div className="uppercase text-xs tracking-[0.2em] text-secondary font-semibold">
                  Tokenization &amp; economics
                </div>
                <p className="text-sm text-secondary">
                  Processing tokens directly drives compute, energy, and cost.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                {economicsSteps.map((step, idx) => (
                  <div key={step.title} className="flex items-center gap-3">
                    <div className="min-w-[180px] max-w-[220px] rounded-xl border border-black/5 bg-foreground/5 p-4 shadow-sm">
                      <div className="text-sm font-semibold text-foreground">
                        {step.title}
                      </div>
                      <p className="text-xs text-secondary leading-relaxed mt-1">
                        {step.description}
                      </p>
                    </div>
                    {idx < economicsSteps.length - 1 && (
                      <span className="text-secondary text-lg">→</span>
                    )}
                  </div>
                ))}
              </div>
              <p className="text-sm text-secondary">
                More tokens mean more GPU cycles, more data center energy, and a higher bill.
              </p>
            </div>
          </SectionReveal>

          {/* Operational Reality Bridge */}
          <SectionReveal delay={0.4}>
            <Callout variant="warning" title="The Operational Reality">
              An LLM can explain how to process a purchase order, but it cannot execute that purchase order. It can suggest which supplier to use, but it cannot interact with your ERP system to place the order. It can answer questions about your company policies, but it cannot enforce approval workflows or maintain audit trails. Reasoning alone does not create operational value.
            </Callout>
          </SectionReveal>
        </div>
      </div>
    </section>
  );
}



