"use client";

import { motion } from "framer-motion";
import { Compass, PenLine, Sparkles, GraduationCap, MapPin } from "lucide-react";
import SectionReveal from "../learning/SectionReveal";
import { BorderBeam } from "@/components/ui/border-beam";
import { Comparison } from "../ui/data-blocks";

// Case study #1 — Maya (Meet 24 action item). All content grounded in her own
// words: thesis = a day center for older adults in Obrajes, La Paz; ~10 analysis
// boards that each took 3–4h by hand, now the whole set in 3–4h; tools she named.

const OUTPUTS = [
  "Cadastral base — lots & buildings",
  "Road network & mobility hierarchy",
  "Site conditions & topography",
  "Solar exposure (asoleamiento)",
  "Facility influence radius",
  "Risk map",
  "Basic-services map",
  "Settlement patterns",
  "Sensory map",
  "Contour lines & sections",
  "Program bubble diagrams",
];

const FIGURES = [
  { src: "/case-studies/maya-fig-510-catastro.png", fig: "Fig. 5.10", caption: "Cadastral base — lots & buildings" },
  { src: "/case-studies/maya-fig-512-vial.png", fig: "Fig. 5.12", caption: "Road & mobility analysis" },
  { src: "/case-studies/maya-fig-516-sitio.png", fig: "Fig. 5.16", caption: "Site conditions" },
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

        <div className="px-6 py-12 sm:px-8 lg:px-14 lg:py-14 space-y-10">
          {/* Header */}
          <SectionReveal>
            <div className="max-w-3xl space-y-3">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">Case study · In practice</p>
              <h2 className="title-hover text-3xl md:text-5xl font-heading font-bold tracking-tight text-foreground leading-[1.08]">
                Ten hand-drawn boards, now done in one afternoon.
              </h2>
              <p className="text-lg text-secondary leading-relaxed">
                Two and a half months ago, Maya had never touched any of this. She&apos;s an architecture
                graduate finishing her degree in La Paz — trained the old way, every board by hand. Her
                thesis is a day center for older adults in Obrajes. Then she stopped fighting the software
                and started talking to the system.
              </p>
            </div>
          </SectionReveal>

          {/* Subject strip */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 rounded-2xl bg-[#fafaf7] border border-black/5 px-5 py-4">
            <span className="flex items-center gap-2 text-sm font-semibold text-foreground">
              <GraduationCap className="h-4 w-4 text-accent" strokeWidth={2} />
              Maya Avila — Architecture graduate, thesis in progress
            </span>
            <span className="flex items-center gap-2 text-sm text-secondary">
              <MapPin className="h-4 w-4 text-warm" strokeWidth={2} /> Obrajes, La Paz — Bolivia
            </span>
            <span className="flex items-center gap-2 text-sm text-secondary">
              <Sparkles className="h-4 w-4 text-accent" strokeWidth={2} /> Claude Code · Google Earth · Google Maps · Obsidian
            </span>
          </div>

          {/* Stat row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { v: "3–4 h", l: "per board, by hand", s: "one analysis board = a whole afternoon" },
              { v: "~10 boards", l: "now in a single 3–4 h session", s: "the full site analysis, in one day" },
              { v: "0", l: "applications opened", s: "just describing the site in plain words" },
            ].map((s, i) => (
              <motion.div key={s.l} {...rise} transition={{ duration: 0.4, delay: i * 0.06 }} className="hover-glow rounded-2xl border border-black/8 bg-white p-5">
                <div className="text-3xl font-heading font-bold text-accent tabular-nums">{s.v}</div>
                <div className="mt-1 text-sm font-semibold text-foreground">{s.l}</div>
                <div className="mt-0.5 text-xs text-secondary leading-snug">{s.s}</div>
              </motion.div>
            ))}
          </div>

          {/* Before / after */}
          <motion.div {...rise} transition={{ duration: 0.45 }}>
            <Comparison
              versus="→"
              left={{
                title: "The old way",
                tone: "muted",
                rows: [
                  "Tracing every lot and building contour by hand",
                  "One analysis board = 3–4 hours",
                  "A different app for every step",
                  "Redraw from scratch when the site changed",
                ],
              }}
              right={{
                title: "Now, with AI",
                tone: "brand",
                rows: [
                  "Describes the site, the data, the steps in plain words",
                  "All ~10 boards in a single 3–4 h session",
                  "Not one application opened",
                  "Pulls open cadastral data, satellite, vector & PDF sources together",
                ],
              }}
            />
          </motion.div>

          {/* The figures — her real thesis output */}
          <div className="space-y-4">
            <motion.p {...rise} transition={{ duration: 0.4 }} className="text-sm font-semibold uppercase tracking-[0.18em] text-secondary">
              From her thesis — site analysis, generated by talking to the system
            </motion.p>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {FIGURES.map((f, i) => (
                <motion.figure
                  key={f.src}
                  {...rise}
                  transition={{ duration: 0.45, delay: i * 0.07 }}
                  className="hover-glow group overflow-hidden rounded-2xl border border-black/10 bg-[#fafaf7]"
                >
                  <div className="overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={f.src}
                      alt={`${f.fig} — ${f.caption}`}
                      loading="lazy"
                      className="w-full h-52 object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                    />
                  </div>
                  <figcaption className="flex items-baseline gap-2 px-4 py-3">
                    <span className="text-xs font-semibold text-accent">{f.fig}</span>
                    <span className="text-sm text-foreground">{f.caption}</span>
                  </figcaption>
                </motion.figure>
              ))}
            </div>
          </div>

          {/* What she produced */}
          <div className="space-y-4">
            <motion.p {...rise} transition={{ duration: 0.4 }} className="text-sm font-semibold uppercase tracking-[0.18em] text-secondary">
              The full set she produced
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

          {/* Pull quote — deeper, first person */}
          <motion.blockquote
            {...rise}
            transition={{ duration: 0.5 }}
            className="relative rounded-2xl px-6 py-7 text-white overflow-hidden"
            style={{ background: "linear-gradient(135deg,#0a1838,#16224a 60%,#1e3a8a)" }}
          >
            <PenLine className="absolute right-5 top-5 h-6 w-6 text-white/20" />
            <p className="text-xl md:text-2xl font-heading font-semibold leading-snug max-w-3xl">
              &ldquo;For me, architecture was always my hands and the hours — a single board of analysis
              meant a whole afternoon at the drafting table. Three months ago, I couldn&apos;t have told you
              what any of this was. Now I sit down, describe my site the way I&apos;d explain it to a friend,
              and the maps take shape while we talk. It never replaced the architect in me. It just gave me
              back the hours — and the room to finally think like one.&rdquo;
            </p>
            <footer className="mt-3 text-sm text-white/70">Maya Avila — thesis defense, December 12</footer>
          </motion.blockquote>

          <p className="text-xs text-secondary/70">
            The point isn&apos;t the software. A domain expert with zero coding background put AI to work
            inside her real craft in weeks — the exact shift this whole map is about.
          </p>
        </div>
      </div>
    </section>
  );
}
