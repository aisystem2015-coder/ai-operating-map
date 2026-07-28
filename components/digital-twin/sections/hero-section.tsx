"use client";

import { useCallback } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Sparkles, MessageCircle, ArrowDown, Fingerprint } from "lucide-react";
import InteractiveGlow from "@/components/ui/interactive-glow";

export default function DigitalTwinHeroSection() {
  const reduceMotion = useReducedMotion();

  const scrollToChat = useCallback(() => {
    document.getElementById("talk-to-a-real-one")?.scrollIntoView({
      behavior: reduceMotion ? "auto" : "smooth",
      block: "start",
    });
  }, [reduceMotion]);

  const scrollToMap = useCallback(() => {
    document.getElementById("dt-explore")?.scrollIntoView({
      behavior: reduceMotion ? "auto" : "smooth",
      block: "start",
    });
  }, [reduceMotion]);

  return (
    <section className="relative isolate overflow-hidden pt-16 pb-20 rounded-b-[2.5rem]">
      <div
        className="absolute inset-0 -z-10"
        style={{ background: "linear-gradient(160deg, #052e27 0%, #064e3b 45%, #022c22 100%)" }}
        aria-hidden
      />
      <div className="relative isolate z-0">
        <InteractiveGlow />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8 text-center space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-6"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-white/80">
            <Fingerprint className="h-3.5 w-3.5 text-emerald-300" />
            A real, working proof of concept
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold leading-[1.05] text-white">
            An AI that actually knows{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-300 to-emerald-100">
              one person
            </span>
            — not a stranger guessing.
          </h1>
          <p className="text-lg text-white/75 leading-relaxed max-w-2xl mx-auto">
            A digital twin is a private AI fed one person&apos;s own notes and voice over time, so it can
            answer questions grounded only in what was actually written down — never making things up.
            Don&apos;t just read about it. Talk to a real one, right now.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-3 justify-center pt-2">
            <motion.button
              type="button"
              onClick={scrollToChat}
              whileHover={reduceMotion ? undefined : { scale: 1.03 }}
              whileTap={reduceMotion ? undefined : { scale: 0.97 }}
              className="min-h-[44px] cursor-pointer inline-flex items-center gap-2 rounded-xl bg-emerald-400 px-6 py-3 text-sm font-semibold text-emerald-950 shadow-lg hover:brightness-105 transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#052e27]"
            >
              <MessageCircle className="h-4 w-4" />
              Talk to a real digital twin
            </motion.button>
            <button
              type="button"
              onClick={scrollToMap}
              className="min-h-[44px] cursor-pointer inline-flex items-center gap-2 rounded-xl border border-white/20 px-6 py-3 text-sm font-semibold text-white/90 hover:bg-white/5 transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#052e27]"
            >
              <Sparkles className="h-4 w-4" />
              Explore the section
              <ArrowDown className="h-4 w-4" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
