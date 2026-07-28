"use client";

/**
 * "Examples & Types" — content ported from digital_twin_site's
 * /ejemplos page (2026-07-27 merge), re-skinned to emerald. The
 * "who's actually using them" diagram (previously a Spanish-labeled
 * PNG, dt_diagram_3_ejemplos.png) is rebuilt as a real 3-card component
 * instead of an image.
 */
import { motion, useReducedMotion } from "framer-motion";
import { HeartPulse, Factory, UserCircle2, Wrench, Box, Network, Workflow, Gauge, PenTool, MapPin } from "lucide-react";
import SectionReveal from "@/components/learning/SectionReveal";
import { SEQUENTIAL_EMERALD, CATEGORICAL } from "@/components/charts/tokens";

const scopeLevels = [
  { icon: Wrench, title: "Component / Part twin", detail: "The smallest unit — a digital model of one machine part." },
  { icon: Box, title: "Asset / Product twin", detail: "A whole product, modeled end to end." },
  { icon: Network, title: "System twin", detail: "Multiple assets working together as one system." },
  { icon: Workflow, title: "Process twin", detail: "An entire workflow, from start to finish." },
];

const categoryTwins = [
  {
    icon: Gauge,
    title: "Performance twins",
    desc: "Maintenance & operations — predictive maintenance, energy management. Built to keep something running well.",
  },
  {
    icon: PenTool,
    title: "Project twins",
    desc: "Engineering & design data, collaboration during a product's creation. Built for the build phase, not the run phase.",
  },
];

const domainTwins = [
  {
    icon: MapPin,
    title: "Spatial / urban / mobility twins",
    desc: "Smart cities, traffic systems — modeling physical places and how things move through them.",
  },
  {
    icon: UserCircle2,
    title: "Human / personal digital twins",
    desc: "Health twins, and personal-AI twins like the one this section is built around — a model of a person, not a place or a machine.",
  },
];

const industries = [
  {
    icon: HeartPulse,
    title: "Healthcare",
    color: CATEGORICAL[1],
    points: [
      "NVIDIA + Eli Lilly: first pharma-owned DGX SuperPOD AI factory for drug discovery and manufacturing digital twins on Omniverse.",
      "NVIDIA + Mayo Clinic: pathology foundation models toward human digital twins, drawing on imaging, pathology, health records, and wearables.",
      "Proprio's \"Paradigm\" platform: real-time intraoperative digital twins for radiation-free spine surgery — FDA clearance Jan 2026, its 4th to date.",
    ],
    source: "Automate.org / A3 and Treeview, 2026 healthcare digital twin coverage",
  },
  {
    icon: Factory,
    title: "Manufacturing",
    color: CATEGORICAL[2],
    points: [
      "The largest adopter today — factories mirror production lines in real time from machine, sensor, and quality-control data.",
      "Used to simulate scenarios, find bottlenecks, and predict equipment failures before they happen.",
    ],
    source: "2026 industry coverage — Dassault Systèmes / aimultiple",
  },
  {
    icon: UserCircle2,
    title: "Personal / individual",
    color: CATEGORICAL[0],
    points: [
      "AI clones of real people from their own text, audio, and video — Delphi AI, Personal.ai, Personify, MyClone, Coachvox AI.",
      "Wellness author Deepak Chopra uses a Delphi-built digital twin of himself to appear in Zoom calls without being physically present.",
      "Francisco's own digital twin — the one you can talk to on this page — is this same category, built on his own notes and voice.",
    ],
    source: "2026 personal digital twin coverage",
  },
];

export default function ExamplesSection() {
  const reduceMotion = useReducedMotion();
  return (
    <section className="scroll-mt-32 space-y-14">
      <SectionReveal>
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-700">Real cases, today</p>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground leading-tight">
            Digital twins that already exist
          </h2>
          <p className="text-secondary leading-relaxed">
            Not a futuristic concept — digital twins already run in production across very different
            industries. Here&apos;s how they get categorized, and who&apos;s actually using them.
          </p>
        </div>
      </SectionReveal>

      {/* Categorization */}
      <SectionReveal>
        <div className="space-y-8">
          <div className="space-y-4">
            <p className="text-sm font-semibold text-foreground">By scope / complexity — smallest unit to the whole workflow</p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {scopeLevels.map((level, i) => (
                <div key={level.title} className="rounded-2xl border border-black/5 bg-white shadow-sm overflow-hidden">
                  <div className="h-1.5" style={{ backgroundColor: SEQUENTIAL_EMERALD[i + 1] }} />
                  <div className="p-4 space-y-2">
                    <div
                      className="h-9 w-9 rounded-xl flex items-center justify-center text-white"
                      style={{ backgroundColor: SEQUENTIAL_EMERALD[i + 1] }}
                    >
                      <level.icon className="h-4.5 w-4.5" />
                    </div>
                    <h4 className="text-sm font-semibold text-foreground">{level.title}</h4>
                    <p className="text-xs leading-relaxed text-secondary">{level.detail}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-xs text-secondary/70">Source: ARC Advisory / Vidyatec, &ldquo;4 levels of digital twin technology,&rdquo; 2026 coverage</p>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            {categoryTwins.map((c) => (
              <div key={c.title} className="rounded-2xl bg-white p-6 space-y-3 border border-black/5 shadow-sm">
                <div className="h-10 w-10 rounded-xl bg-emerald-50 flex items-center justify-center">
                  <c.icon className="h-5 w-5 text-emerald-700" />
                </div>
                <h4 className="text-base font-semibold text-foreground">{c.title}</h4>
                <p className="text-sm leading-relaxed text-secondary">{c.desc}</p>
              </div>
            ))}
            <p className="sm:col-span-2 text-xs text-secondary/70">Source: ARC Advisory, 2026</p>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            {domainTwins.map((d) => (
              <div key={d.title} className="rounded-2xl bg-white p-6 space-y-3 border border-black/5 shadow-sm">
                <div className="h-10 w-10 rounded-xl bg-emerald-50 flex items-center justify-center">
                  <d.icon className="h-5 w-5 text-emerald-700" />
                </div>
                <h4 className="text-base font-semibold text-foreground">{d.title}</h4>
                <p className="text-sm leading-relaxed text-secondary">{d.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </SectionReveal>

      {/* Who's using them — component-based, replaces the former Spanish PNG */}
      <SectionReveal>
        <div className="space-y-6">
          <h3 className="text-2xl md:text-3xl font-heading font-bold text-foreground text-center">Who&apos;s actually using them</h3>
          <div className="grid md:grid-cols-3 gap-5">
            {industries.map((ind) => (
              <motion.div
                key={ind.title}
                className="rounded-2xl bg-white p-6 space-y-4 border shadow-sm"
                style={{ borderTop: `3px solid ${ind.color}`, borderLeft: "1px solid rgba(15,23,42,0.06)", borderRight: "1px solid rgba(15,23,42,0.06)", borderBottom: "1px solid rgba(15,23,42,0.06)" }}
                whileHover={reduceMotion ? undefined : { y: -4, boxShadow: "0 14px 28px -10px rgba(15,23,42,0.16)" }}
              >
                <div
                  className="h-11 w-11 rounded-full flex items-center justify-center text-white"
                  style={{ backgroundColor: ind.color }}
                >
                  <ind.icon className="h-5 w-5" />
                </div>
                <h4 className="text-lg font-heading font-semibold text-foreground">{ind.title}</h4>
                <ul className="space-y-2">
                  {ind.points.map((p) => (
                    <li key={p} className="text-sm leading-relaxed text-secondary flex gap-2">
                      <span className="mt-1.5 h-1 w-1 rounded-full shrink-0" style={{ backgroundColor: ind.color }} />
                      {p}
                    </li>
                  ))}
                </ul>
                <p className="text-xs text-secondary/70 pt-1">Source: {ind.source}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </SectionReveal>
    </section>
  );
}
