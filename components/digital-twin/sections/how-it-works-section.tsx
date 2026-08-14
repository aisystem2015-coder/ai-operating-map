"use client";

/**
 * "How It Works" — content ported from digital_twin_site's
 * /como-funciona page (2026-07-27 merge), re-skinned to emerald. The
 * pipeline diagram (previously a Spanish-labeled PNG,
 * dt_diagram_4_flujo.png) is rebuilt using this project's own FlowSteps
 * chart component (components/charts/FlowSteps.tsx) instead of an image.
 */
import { motion, useReducedMotion } from "framer-motion";
import { NotebookPen, Mic, Eye, Users2, Lock, ShieldCheck, GitCompare, Smartphone, Headphones } from "lucide-react";
import SectionReveal from "@/components/learning/SectionReveal";
import FlowSteps, { type FlowStep } from "@/components/charts/FlowSteps";
import { SEQUENTIAL_EMERALD } from "@/components/charts/tokens";

const pipelineSteps: FlowStep[] = [
  {
    id: "capture",
    title: "1 · Capture",
    subtitle: "Real information gets recorded",
    detail: "Voice, text, documents, or sensors depending on the case — whatever the source, it starts as raw capture.",
  },
  {
    id: "structure",
    title: "2 · Structure",
    subtitle: "Organized, with a privacy tier",
    detail: "Sorted by topic and tagged with an access level — never an unsorted data dump.",
  },
  {
    id: "reason",
    title: "3 · Reason",
    subtitle: "An AI answers from it",
    detail: "A model answers questions based only on that information — never inventing what isn't there.",
  },
  {
    id: "act",
    title: "4 · Act",
    subtitle: "Recommends, then eventually acts",
    detail: "Over time, it can recommend or take actions on its own, within limits defined in advance.",
  },
];

const ingredients = [
  {
    icon: NotebookPen,
    title: "A place to keep notes",
    subtitle: '"The vault"',
    desc: 'Think of it like a personal notebook — except every page is searchable instantly, and it never gets lost. In tech terms this is called a "vault," but it\'s really just a folder of notes on one computer.',
  },
  {
    icon: Mic,
    title: "A way to feed it, over time",
    subtitle: "Voice or text, little and often",
    desc: "A quick voice memo in the car, a few typed lines after a meeting, a thought not worth losing. The habit matters more than the tool — five minutes a day beats one huge dump once a year.",
  },
];

const accessLevels = [
  { icon: Eye, label: "Public", detail: "Safe for anyone — a stranger visiting this site, for example." },
  { icon: Users2, label: "Shareable", detail: "Fine for a trusted collaborator, not the general public." },
  { icon: Lock, label: "Private", detail: "Default for most notes — day-to-day thoughts, unfiltered." },
  { icon: ShieldCheck, label: "Sensitive / intimate", detail: "The most guarded tier — never surfaced automatically." },
];

const buildSteps = [
  { title: "Start a note-taking habit", detail: "Pick one place to keep notes — a notebook app, a document, anything that actually gets reopened. The tool matters less than doing it at all." },
  { title: "Capture consistently — voice or text", detail: "A minute of talking or typing after something happens beats a perfect essay never written. Little and often is what makes a twin useful later." },
  { title: "Connect an AI that only answers from those notes", detail: "This is the \"grounding\" idea, made real — wire an AI assistant to search the notes before answering anything, instead of guessing from the internet." },
  { title: "Set access levels so some things stay private", detail: "Not everything written should be visible to everyone who talks to the twin. Mark what's shareable, what's personal, and what should never come up." },
  { title: "Grow it over time", detail: "A twin gets better the more real context it has. Keep capturing, keep reviewing what it gets wrong, and it keeps compounding." },
];

const roadmap = [
  { icon: GitCompare, title: "Compare AI models side by side", desc: "A future version lets the same question go to a few different AI models at once, to compare how the answers differ." },
  { icon: Smartphone, title: "A mobile-friendly, always-available version", desc: "Right now this lives on one computer. The idea is a version that works from a phone, anywhere, so capturing a thought never has to wait." },
  { icon: Lock, title: "Encrypted, password-protected private entries", desc: "Some things deserve a lock, not just a setting. A future version adds real encryption for the most private entries, on top of the access-level system." },
  { icon: Headphones, title: "A voice-journal habit-building companion", desc: "A gentle daily nudge to capture a thought out loud — designed to make the habit actually stick." },
];

export default function HowItWorksSection() {
  const reduceMotion = useReducedMotion();
  return (
    <section className="scroll-mt-32 space-y-16">
      <SectionReveal>
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-rose-700">Under the hood</p>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground leading-tight">How it works, step by step</h2>
          <p className="text-secondary leading-relaxed">
            The same 4 steps power a digital twin whether it&apos;s personal, a factory&apos;s, or a
            hospital&apos;s.
          </p>
        </div>
      </SectionReveal>

      <SectionReveal>
        <FlowSteps steps={pipelineSteps} colorByIndex={false} caption="Every digital twin, no matter how simple or advanced, runs on these same 4 stages." />
      </SectionReveal>

      {/* Data sources */}
      <SectionReveal>
        <div className="space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-rose-700">What feeds it</p>
            <h3 className="text-2xl md:text-3xl font-heading font-bold text-foreground">What data sources actually feed a digital twin</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            {ingredients.map((ing) => (
              <motion.div
                key={ing.title}
                className="rounded-2xl bg-white p-6 space-y-3 border border-black/5 shadow-sm"
                whileHover={reduceMotion ? undefined : { y: -4, boxShadow: "0 14px 28px -10px rgba(15,23,42,0.16)" }}
              >
                <div className="h-10 w-10 rounded-xl bg-rose-50 flex items-center justify-center">
                  <ing.icon className="h-5 w-5 text-rose-700" />
                </div>
                <p className="text-xs font-semibold uppercase tracking-wide text-secondary">{ing.subtitle}</p>
                <h4 className="text-base font-semibold text-foreground">{ing.title}</h4>
                <p className="text-sm leading-relaxed text-secondary">{ing.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </SectionReveal>

      {/* Access levels */}
      <SectionReveal>
        <div className="space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-rose-700">Grounding, applied to privacy</p>
            <h3 className="text-2xl md:text-3xl font-heading font-bold text-foreground">How privacy and access levels work</h3>
            <p className="text-secondary leading-relaxed">
              The live chat below only answers from notes tagged public or shareable — private and
              sensitive tiers never surface to a stranger, no matter how the question is phrased. Use the
              QA selector in the chat to see how each tier actually gates.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {accessLevels.map((lvl, i) => (
              <div key={lvl.label} className="rounded-2xl bg-white p-5 space-y-2.5 border border-black/5 shadow-sm" style={{ borderTop: `3px solid ${SEQUENTIAL_EMERALD[i + 1]}` }}>
                <lvl.icon className="h-5 w-5" style={{ color: SEQUENTIAL_EMERALD[i + 1] }} />
                <h4 className="text-sm font-semibold text-foreground">{lvl.label}</h4>
                <p className="text-xs leading-relaxed text-secondary">{lvl.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </SectionReveal>

      {/* Build your own */}
      <SectionReveal>
        <div className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-rose-700">The actual product pitch</p>
            <h3 className="text-2xl md:text-3xl font-heading font-bold text-foreground">How to build your own — step by step</h3>
            <p className="text-secondary leading-relaxed">No code, no engineering degree. Just a habit, a tool, and some patience — in that order.</p>
          </div>
          <div className="grid lg:grid-cols-5 gap-4">
            {buildSteps.map((step, i) => (
              <div key={step.title} className="space-y-3">
                <div
                  className="h-12 w-12 mx-auto lg:mx-0 rounded-2xl flex items-center justify-center text-base font-bold text-white shadow-sm"
                  style={{ backgroundColor: SEQUENTIAL_EMERALD[Math.min(4, i)] }}
                >
                  {i + 1}
                </div>
                <div className="rounded-2xl bg-white p-4 space-y-1.5 border border-black/5 shadow-sm h-full">
                  <h4 className="text-sm font-semibold text-foreground leading-snug">{step.title}</h4>
                  <p className="text-xs leading-relaxed text-secondary">{step.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </SectionReveal>

      {/* Roadmap */}
      <SectionReveal>
        <div className="space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-rose-700">Where this is going</p>
            <h3 className="text-2xl md:text-3xl font-heading font-bold text-foreground">Future extensions — ideas, not commitments</h3>
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            {roadmap.map((item) => (
              <div key={item.title} className="rounded-2xl bg-white p-6 flex gap-4 border border-black/5 shadow-sm">
                <div className="h-10 w-10 shrink-0 rounded-xl bg-rose-50 flex items-center justify-center">
                  <item.icon className="h-5 w-5 text-rose-700" />
                </div>
                <div className="space-y-1.5">
                  <h4 className="text-base font-semibold text-foreground">{item.title}</h4>
                  <p className="text-sm leading-relaxed text-secondary">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </SectionReveal>
    </section>
  );
}
