"use client";

import Navigation from "../Navigation";
import SectionReveal from "../learning/SectionReveal";
import MayaArchitecture from "../case-studies/maya-architecture";

// Case Studies — lives under the AI Operating Map umbrella (its own route +
// sidebar entry), not on the Francisco tab. Living proof of the map's thesis:
// domain experts putting AI to work inside real craft. First entry: Maya.
export default function CaseStudiesPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="pt-28 pb-28 px-5 sm:px-8 lg:px-12">
        <div className="max-w-6xl mx-auto space-y-10">
          <SectionReveal>
            <div className="max-w-3xl space-y-3">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-secondary">In practice</p>
              <h1 className="title-hover text-4xl md:text-5xl font-heading font-bold tracking-tight text-foreground leading-tight">
                Real people, real work, AI inside it.
              </h1>
              <p className="text-lg text-secondary leading-relaxed">
                The map argues that AI is a reasoning layer inside your system. These are the people
                proving it — not engineers, but experts who put AI to work inside their own craft in weeks.
              </p>
            </div>
          </SectionReveal>

          <MayaArchitecture />

          <p className="text-sm text-secondary/70">More case studies coming as the work ships.</p>
        </div>
      </main>
    </div>
  );
}
