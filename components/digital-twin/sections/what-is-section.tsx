"use client";

/**
 * "What is a Digital Twin" — content ported from digital_twin_site's
 * /que-es page (2026-07-27 merge), re-skinned from indigo/sky/amber/rose
 * to this site's emerald-only system, and with the 4-maturity-levels
 * diagram (previously a Spanish-labeled PNG, dt_diagram_2_niveles.png)
 * rebuilt as a real component instead of an image.
 */
import { motion, useReducedMotion } from "framer-motion";
import {
  Quote,
  ShieldCheck,
  RefreshCw,
  Users,
  Brain,
  XCircle,
  CheckCircle2,
  Eye,
  TrendingUp,
  Lightbulb,
  Zap,
} from "lucide-react";
import SectionReveal from "@/components/learning/SectionReveal";
import { SEQUENTIAL_EMERALD, CATEGORICAL } from "@/components/charts/tokens";

const benefits = [
  {
    icon: RefreshCw,
    title: "Never re-explain your own history",
    desc: "You've already told an AI chatbot who you are, what you're working on, and what you decided last time — and it forgot the second the conversation ended. A digital twin remembers, permanently, so you stop repeating yourself.",
  },
  {
    icon: Users,
    title: '"What did I tell my team last month?"',
    desc: "Ask it. If you wrote it down or said it out loud and it got captured, your twin can find it and answer — instead of you scrolling through old messages trying to remember.",
  },
  {
    icon: Brain,
    title: "A second brain that actually reasons",
    desc: "Not just a search box. It can connect a decision made in March to a question asked in July, because it has both in its notes — the same way a person who's known you for years connects dots you've forgotten about.",
  },
  {
    icon: ShieldCheck,
    title: "Built to be honest, not impressive",
    desc: "If the answer isn't in the notes, it says so — it doesn't make something up to sound smart. That's the whole design, not an accident.",
  },
];

const chatbotVsTwin = [
  {
    label: "A regular AI chatbot",
    icon: XCircle,
    color: CATEGORICAL[4], // rose
    points: [
      "Answers from general internet knowledge about people like you, not you specifically.",
      "If it doesn't know something about you, it often guesses anyway — smoothly, confidently.",
      "Forgets everything the moment the conversation ends.",
    ],
  },
  {
    label: "A digital twin",
    icon: CheckCircle2,
    color: CATEGORICAL[0], // emerald
    points: [
      "Answers only from your own notes, voice memos, and history — nothing invented.",
      'If your notes don\'t have the answer, it says "I don\'t know" instead of guessing.',
      "Remembers permanently and keeps building context over time.",
    ],
  },
];

const maturityLevels = [
  {
    icon: Eye,
    title: "Descriptive",
    detail: "Shows your present as it is. An up-to-date snapshot, no analysis.",
  },
  {
    icon: TrendingUp,
    title: "Predictive",
    detail: "Anticipates what might happen next, based on patterns in your own information.",
  },
  {
    icon: Lightbulb,
    title: "Prescriptive",
    detail: "Recommends what to do, not just what's likely to happen.",
  },
  {
    icon: Zap,
    title: "Autonomous",
    detail: "Acts on its own, within limits you define.",
  },
];

export default function WhatIsSection() {
  const reduceMotion = useReducedMotion();
  return (
    <section id="dt-explore" className="scroll-mt-32 space-y-16">
      <SectionReveal>
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-700">In plain English</p>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground leading-tight">
            What is a digital twin, really?
          </h2>
        </div>
      </SectionReveal>

      {/* Core definition */}
      <SectionReveal>
        <div className="rounded-3xl bg-emerald-50 border border-emerald-100 p-8 lg:p-12 space-y-5">
          <Quote className="h-8 w-8 text-emerald-700" />
          <p className="text-lg leading-relaxed text-foreground">
            Imagine buying a new fridge. It comes with an instruction manual — how the temperature settings
            work, how to fix the ice maker, what that one blinking light means. Now imagine two repair
            technicians. One has read the fridge&apos;s manual. The other has never seen it and is just
            guessing from general fridge knowledge. Both sound confident. Only one is actually right.
          </p>
          <p className="text-lg leading-relaxed text-foreground">
            A <strong>digital twin</strong> is that instruction manual, but for a person — built from their
            own notes, voice memos, and history — handed to an AI so it stops guessing and starts actually
            knowing the situation. Not a robot copy of a person, not science fiction. Just an AI that&apos;s
            done its homework on someone&apos;s life instead of a stranger&apos;s.
          </p>
        </div>
      </SectionReveal>

      {/* Not a chatbot */}
      <SectionReveal>
        <div className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-700">
              The one thing that actually matters
            </p>
            <h3 className="text-2xl md:text-3xl font-heading font-bold text-foreground">
              It&apos;s not just another chatbot
            </h3>
            <p className="text-secondary leading-relaxed">
              The difference isn&apos;t the interface — it&apos;s what the AI is allowed to answer from.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            {chatbotVsTwin.map((col) => (
              <motion.div
                key={col.label}
                className="rounded-2xl bg-white p-6 space-y-4"
                style={{ border: `1px solid ${col.color}33` }}
                whileHover={
                  reduceMotion
                    ? undefined
                    : { y: -4, borderColor: col.color, boxShadow: "0 14px 28px -10px rgba(15,23,42,0.16)" }
                }
              >
                <div className="flex items-center gap-2.5">
                  <col.icon className="h-5 w-5" style={{ color: col.color }} />
                  <h4 className="text-base font-semibold text-foreground">{col.label}</h4>
                </div>
                <ul className="space-y-2.5">
                  {col.points.map((p) => (
                    <li key={p} className="text-sm leading-relaxed flex gap-2 text-secondary">
                      <span className="mt-2 h-1 w-1 rounded-full shrink-0" style={{ backgroundColor: col.color }} />
                      {p}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </SectionReveal>

      {/* Benefits */}
      <SectionReveal>
        <div className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-700">Real, not abstract</p>
            <h3 className="text-2xl md:text-3xl font-heading font-bold text-foreground">What it&apos;s actually good for</h3>
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            {benefits.map((b) => (
              <motion.div
                key={b.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4 }}
                className="rounded-2xl border border-black/5 bg-white p-6 space-y-3 shadow-sm"
                whileHover={reduceMotion ? undefined : { y: -4, boxShadow: "0 14px 28px -10px rgba(15,23,42,0.16)" }}
              >
                <div className="h-10 w-10 rounded-xl bg-emerald-50 flex items-center justify-center">
                  <b.icon className="h-5 w-5 text-emerald-700" />
                </div>
                <h4 className="text-base font-semibold text-foreground">{b.title}</h4>
                <p className="text-sm leading-relaxed text-secondary">{b.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </SectionReveal>

      {/* 4 maturity levels — component-based, replaces the former Spanish PNG */}
      <SectionReveal>
        <div className="space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-700">
              The maturity framework
            </p>
            <h3 className="text-2xl md:text-3xl font-heading font-bold text-foreground">
              Not every digital twin does the same job
            </h3>
            <p className="text-secondary leading-relaxed">
              Digital twins grow in capability across 4 levels — from simply describing what&apos;s true
              today, to eventually acting on their own within defined limits.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {maturityLevels.map((lvl, i) => (
              <div key={lvl.title} className="hover-glow rounded-2xl border border-black/5 bg-white shadow-sm overflow-hidden">
                <div className="h-1.5" style={{ backgroundColor: SEQUENTIAL_EMERALD[i + 1] }} />
                <div className="p-5 space-y-3">
                  <div
                    className="h-10 w-10 rounded-full flex items-center justify-center text-white font-semibold"
                    style={{ backgroundColor: SEQUENTIAL_EMERALD[i + 1] }}
                  >
                    <lvl.icon className="h-5 w-5" strokeWidth={1.75} />
                  </div>
                  <h4 className="text-base font-heading font-semibold text-foreground">{lvl.title}</h4>
                  <p className="text-sm text-secondary leading-relaxed">{lvl.detail}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-5 py-4 text-center text-sm text-emerald-900">
            This project&apos;s own twin sits today between <strong>Descriptive</strong> and{" "}
            <strong>Predictive</strong>. The long-term goal is reaching Prescriptive.
          </div>
        </div>
      </SectionReveal>
    </section>
  );
}
