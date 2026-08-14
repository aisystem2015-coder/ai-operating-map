"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import Navigation from "../Navigation";
import SectionReveal from "../learning/SectionReveal";
import RainbowLayers, { type LayerId } from "../rainbow/rainbow-layers";
import LLMsSection from "../what-works/llms-section";
import AssistantsSection from "../what-works/assistants-section";
import AgentsSection from "../what-works/agents-section";
import AgentPatternsSection from "../what-works/agent-patterns-section";
import AgenticWorkforce from "../what-works/agentic-workforce";
import VerticalAIPitch from "../market-reality/vertical-ai-pitch";
import VerticalDeploymentsSection from "../what-works/vertical-deployments-section";
import DigitalTwinTeaser from "../digital-twin/digital-twin-teaser";

export default function WhatWorksPage() {
  // Which layer the rainbow currently has selected — drives the detail panel.
  const [layer, setLayer] = useState<LayerId>("llm");

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main>
        {/* Section 1: the rainbow stack (Meet 22 — replaces the old
            concentric-rings explorer). Click-driven half-arc, never a full
            circle. Clicking a layer reveals its full breakdown below. */}
        <section id="top" className="py-32 px-6 lg:px-8 bg-white/40 scroll-mt-8">
          <div className="max-w-5xl mx-auto space-y-10">
            <SectionReveal>
              <div className="max-w-3xl space-y-3">
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-secondary">
                  What works today
                </p>
                <h1 className="text-4xl md:text-5xl font-heading font-bold tracking-tight text-foreground leading-tight">
                  The patterns that actually scale
                </h1>
                <p className="text-lg text-secondary leading-relaxed">
                  Everything real sits on one reasoning core and builds outward — from a
                  model you talk to, to agents that act, to a private twin of you.
                  Click a layer to see the full breakdown below.
                </p>
              </div>
            </SectionReveal>

            <RainbowLayers onLayerChange={setLayer} />
          </div>
        </section>

        {/* Per-layer deep dive — restored Meet 22: each rainbow layer opens its
            full section (diagrams + explanation) here, exactly like the old
            explorer did. The content components were never deleted, just
            unmounted when the diagram was swapped. */}
        <AnimatePresence mode="wait">
          <motion.div
            key={layer}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
          >
            {layer === "llm" && <LLMsSection />}
            {layer === "assistant" && <AssistantsSection />}
            {layer === "agent" && (
              <>
                <AgentsSection />
                <section className="py-20 px-6 lg:px-8 bg-white/30">
                  <div className="max-w-6xl mx-auto">
                    <AgentPatternsSection />
                  </div>
                </section>
              </>
            )}
            {layer === "agentic" && (
              <section className="py-20 px-6 lg:px-8">
                <div className="max-w-7xl mx-auto space-y-16">
                  <AgenticWorkforce />
                  <VerticalAIPitch />
                  <VerticalDeploymentsSection />
                </div>
              </section>
            )}
            {layer === "digital-twin" && (
              <section className="py-20 px-6 lg:px-8">
                <div className="max-w-5xl mx-auto">
                  <DigitalTwinTeaser />
                </div>
              </section>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Vertical AI teaser */}
        <section className="py-12 px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <SectionReveal>
              <div className="rounded-3xl border border-black/5 bg-gradient-to-r from-purple-50/70 via-white to-white/60 p-12 lg:p-14 shadow-sm space-y-8">
                <div className="flex flex-col gap-7 lg:flex-row lg:items-start lg:justify-between">
                  <div className="space-y-3 lg:max-w-3xl">
                    <p className="text-sm font-semibold uppercase tracking-[0.22em] text-secondary">
                      What actually makes AI land
                    </p>
                    <h3 className="text-3xl md:text-4xl font-heading font-semibold text-foreground leading-tight">
                      Vertical AI systems that understand your company become true teammates.
                    </h3>
                    <p className="text-lg text-secondary leading-relaxed">
                      The real step-change happens when AI is built around your data, tools,
                      and workflows—so it can think and act with you, not just beside you.
                    </p>
                  </div>

                  <Link
                    href="#top"
                    className="inline-flex items-center gap-2 text-accent font-semibold text-lg underline decoration-2 underline-offset-8 transition-colors duration-200 hover:text-emerald-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 rounded"
                  >
                    See the Agentic Systems layer in the stack above ↑
                  </Link>
                </div>

                <div className="flex items-start gap-4 rounded-2xl border border-amber-200 bg-amber-50/80 p-6 shadow-inner">
                  <div className="text-3xl leading-none pt-1" aria-hidden>
                    ⚠️
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-amber-800">
                      Warning: surface-level AI stalls compounding
                    </p>
                    <p className="text-base md:text-lg text-amber-900/90 leading-relaxed">
                      This cascades down to personal use. If you don&apos;t connect AI
                      to your knowledge bases and orchestrate it across your tools,
                      you&apos;re still using AI at the surface—whether you touch it or
                      not. Compounding only happens when your data, workflows, and
                      execution are embedded; there&apos;s no in-between.
                    </p>
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
