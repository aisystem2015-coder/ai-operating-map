"use client";

import Link from "next/link";
import Navigation from "../Navigation";
import SectionReveal from "../learning/SectionReveal";
import WhatWorksExplorer from "../what-works/what-works-explorer";

export default function WhatWorksPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main>
        {/* Section 1: What Works Today — interactive 4-stage explorer */}
        <section id="top" className="py-32 px-6 lg:px-8 bg-white/40 scroll-mt-8">
          <div className="max-w-7xl mx-auto">
            <WhatWorksExplorer />
          </div>
        </section>

        {/* Section 1.5: Vertical AI teaser */}
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
                    See it in the Agentic Systems stage above ↑
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

