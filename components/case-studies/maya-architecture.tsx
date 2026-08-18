"use client";

import { motion } from "framer-motion";
import { Compass, PenLine, Sparkles, GraduationCap } from "lucide-react";
import SectionReveal from "../learning/SectionReveal";
import { BorderBeam } from "@/components/ui/border-beam";
import { Comparison } from "../ui/data-blocks";

// Case study #1 — Maya (Meet 24 action item: "add an architecture use-case to the
// site: the maps she generated with AI, clear story, few images"). Everything here
// is grounded in her own words. Fields marked TODO(maya) get her exact numbers /
// thesis topic / quote / images once she confirms.

// The analyses she produced by talking to Claude Code — no application opened.
const OUTPUTS = [
  "Road network & mobility hierarchy",
  "Cadastral base — lots & buildings",
  "Urban base — blocks + land use",
  "Real solar exposure (asoleamiento)",
  "Facility influence radius",
  "Risk map",
  "Basic-services map",
  "Settlement-pattern map",
  "Sensory map",
  "Contour lines & site sections",
  "Program bubble diagrams",
];

const rise = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
};

export default function MayaArchitecture() {
  return (
    <section id="case-study" className="scroll-mt-24">
      <div className="relative overflow-hidden rounded-3xl border border-black/5 bg-white shadow-sm">
        <BorderBeam size={260} duration={13} borderWidth={1.5} colorFrom="#2563eb" colorTo="#d4956a" />

        <div className="px-8 py-12 lg:px-14 lg:py-14 space-y-10">
          {/* Header */}
          <SectionReveal>
            <div className="max-w-3xl space-y-3">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">Case study · In practice</p>
              <h2 className="title-hover text-3xl md:text-5xl font-heading font-bold tracking-tight text-foreground leading-[1.08]">
                From hand-drawn to AI-native, in ten weeks.
              </h2>
              <p className="text-lg text-secondary leading-relaxed">
                Two and a half months ago, Maya had never touched any of this. She&apos;s an architect
                finishing her degree — trained old-school, everything by hand. Then she started talking
                to the system instead of fighting the software.
              </p>
            </div>
          </SectionReveal>

          {/* Subject strip */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 rounded-2xl bg-[#fafaf7] border border-black/5 px-5 py-4">
            <span className="flex items-center gap-2 text-sm font-semibold text-foreground">
              <GraduationCap className="h-4 w-4 text-accent" strokeWidth={2} />
              Maya Avila — Architect · thesis candidate
            </span>
            <span className="flex items-center gap-2 text-sm text-secondary">
              <Compass className="h-4 w-4 text-warm" strokeWidth={2} /> La Paz, Bolivia
            </span>
            <span className="flex items-center gap-2 text-sm text-secondary">
              <Sparkles className="h-4 w-4 text-accent" strokeWidth={2} /> Tools: Claude Code · Google Earth · Obsidian
            </span>
          </div>

          {/* Before / after */}
          <motion.div {...rise} transition={{ duration: 0.45 }}>
            <Comparison
              versus="→"
              left={{
                title: "The old way",
                tone: "muted",
                rows: [
                  "Tracing every building contour by hand",
                  "One analysis map = days of work",
                  "A different app for every step",
                  "Redraw everything when the site changed",
                ],
              }}
              right={{
                title: "Now, with AI",
                tone: "brand",
                rows: [
                  "Describes the site and the goal in plain words",
                  "A full analysis set in ~2–3 hours, in one day",
                  "Not a single application opened",
                  "Regenerate on demand as the project evolves",
                ],
              }}
            />
          </motion.div>

          {/* What she generated */}
          <div className="space-y-4">
            <motion.p {...rise} transition={{ duration: 0.4 }} className="text-sm font-semibold uppercase tracking-[0.18em] text-secondary">
              What she produced — just by talking to the system
            </motion.p>
            <div className="flex flex-wrap gap-2.5">
              {OUTPUTS.map((o, i) => (
                <motion.span
                  key={o}
                  {...rise}
                  transition={{ duration: 0.35, delay: (i % 6) * 0.04 }}
                  className="hover-glow rounded-full border border-accent/20 bg-accent/[0.06] px-4 py-2 text-sm font-medium text-foreground"
                >
                  {o}
                </motion.span>
              ))}
            </div>
          </div>

          {/* Pull quote — her own words */}
          <motion.blockquote
            {...rise}
            transition={{ duration: 0.5 }}
            className="relative rounded-2xl px-6 py-6 text-white overflow-hidden"
            style={{ background: "linear-gradient(135deg,#0a1838,#16224a 60%,#1e3a8a)" }}
          >
            <PenLine className="absolute right-5 top-5 h-6 w-6 text-white/20" />
            <p className="text-xl md:text-2xl font-heading font-semibold leading-snug max-w-3xl">
              &ldquo;Every one of these maps — I made without opening a single application. Just
              talking, giving it my data, my steps. If I hadn&apos;t learned this, I wouldn&apos;t
              have any of it.&rdquo;
            </p>
            <footer className="mt-3 text-sm text-white/70">Maya — thesis defense Dec 12</footer>
          </motion.blockquote>

          <p className="text-xs text-secondary/70">
            The point isn&apos;t the maps. It&apos;s that a domain expert with zero coding background
            put AI to work inside her real craft in weeks — the same shift this whole map is about.
          </p>
        </div>
      </div>
    </section>
  );
}
