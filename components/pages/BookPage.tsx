"use client";

// Office hours / booking — Meet 19 must-have (b): "un calendario público
// estilo Calendly para office hours una vez que esté en Bolivia."
// The page is real and deployable now. The actual scheduler is gated on a
// single constant: set CALENDLY_URL to Francisco's public scheduling link and
// the embed goes live — until then the page shows an honest "opens soon" state
// instead of a fake/broken booking flow. English-only per the site rule.

import { motion } from "framer-motion";
import Link from "next/link";
import { CalendarClock, Clock, MessageSquare, Target } from "lucide-react";
import Navigation from "../Navigation";
import InteractiveGlow from "../ui/interactive-glow";

// ▼ Francisco: paste your public Calendly (or Cal.com) link here to go live.
const CALENDLY_URL = "";

const how = [
  {
    icon: Target,
    t: "Bring a real problem",
    d: "Something you're actually building or stuck on with AI in operations — not a hypothetical.",
  },
  {
    icon: Clock,
    t: "30 focused minutes",
    d: "Enough to get to a direction. If it needs more, we'll find the next step.",
  },
  {
    icon: MessageSquare,
    t: "Leave with a direction",
    d: "A concrete next move, not a sales pitch. If I'm not the right person, I'll say so.",
  },
];

export default function BookPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          {/* Header */}
          <div className="relative isolate overflow-hidden rounded-3xl mb-14 py-12 px-2">
            <InteractiveGlow />
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-semibold uppercase tracking-[0.14em] mb-6">
                <CalendarClock size={14} />
                Office hours
              </div>
              <h1 className="text-5xl md:text-6xl font-heading font-bold text-foreground mb-6 leading-tight">
                Book a slot
              </h1>
              <p className="text-lg text-secondary max-w-2xl leading-relaxed">
                Open office hours for people building with AI in operations. Free,
                focused, and honest about what actually works.
              </p>
            </div>
          </div>

          {/* How it works */}
          <div className="grid sm:grid-cols-3 gap-4 mb-14">
            {how.map((h, i) => {
              const Icon = h.icon;
              return (
                <motion.div
                  key={h.t}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="rounded-2xl border border-black/5 bg-white shadow-sm p-6"
                >
                  <div className="h-10 w-10 rounded-xl bg-accent/10 text-accent flex items-center justify-center mb-4">
                    <Icon size={20} />
                  </div>
                  <h3 className="text-base font-heading font-semibold text-foreground mb-1.5">
                    {h.t}
                  </h3>
                  <p className="text-sm text-secondary leading-relaxed">{h.d}</p>
                </motion.div>
              );
            })}
          </div>

          {/* Scheduler */}
          {CALENDLY_URL ? (
            <div className="rounded-2xl border border-black/5 bg-white shadow-sm overflow-hidden">
              <iframe
                src={CALENDLY_URL}
                title="Book office hours"
                className="w-full"
                style={{ height: "70vh", minHeight: 640, border: 0 }}
              />
            </div>
          ) : (
            <div className="rounded-2xl border border-accent/20 bg-accent/[0.04] p-8 md:p-10 text-center">
              <div className="mx-auto h-12 w-12 rounded-full bg-accent/10 text-accent flex items-center justify-center mb-5">
                <CalendarClock size={24} />
              </div>
              <h2 className="text-2xl font-heading font-bold text-foreground mb-3">
                Booking opens soon
              </h2>
              <p className="text-secondary max-w-md mx-auto leading-relaxed mb-6">
                Office hours go live shortly. In the meantime, explore the work or come
                back here to grab a slot.
              </p>
              <Link
                href="/profile"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-black/10 bg-white text-sm font-semibold text-foreground hover:bg-black/[0.03] transition-colors focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
              >
                See the profile
              </Link>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
