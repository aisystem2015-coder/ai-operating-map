"use client";

/**
 * Compact preview shown inside the "What Works Today" explorer when the
 * Digital Twins ring is active (components/what-works/what-works-explorer.tsx).
 * The full Digital Twin content — merged in from the former standalone
 * digital_twin_site project on 2026-07-27 — carries too much (5 pages
 * worth: definition, examples, pipeline, hardware, a live chat) to fit
 * inline in the explorer panel alongside LLMs/Agents/Agentic Systems, so
 * this card summarizes it and links out to the dedicated sub-page instead
 * of duplicating that content here.
 */
import Link from "next/link";
import { motion } from "framer-motion";
import { Fingerprint, MessageCircle, ArrowRight } from "lucide-react";

export default function DigitalTwinTeaser() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4 }}
      className="rounded-3xl border border-black/5 bg-white shadow-sm p-8 md:p-10 text-center space-y-5"
    >
      <div className="mx-auto h-12 w-12 rounded-2xl bg-indigo-900 flex items-center justify-center">
        <Fingerprint className="h-6 w-6 text-white" strokeWidth={1.75} />
      </div>
      <h3 className="text-2xl md:text-3xl font-heading font-bold text-foreground">
        A digital twin is a private model of one person
      </h3>
      <p className="text-base text-secondary leading-relaxed max-w-2xl mx-auto">
        Same reasoning core as everything else on this page — an LLM, wired to act — pointed at one
        person&apos;s own notes and voice instead of a company&apos;s operating data. Grounded only in what
        was actually written down, never guessing. Explore the concept, real-world examples, the pipeline
        underneath it, the hardware it runs on — or just talk to a real, working one.
      </p>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
        <Link
          href="/what-works/digital-twins"
          className="min-h-[44px] cursor-pointer inline-flex items-center gap-2 rounded-xl bg-indigo-900 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:brightness-110 transition focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
        >
          Explore Digital Twins
          <ArrowRight className="h-4 w-4" />
        </Link>
        <Link
          href="/what-works/digital-twins#talk-to-a-real-one"
          className="min-h-[44px] cursor-pointer inline-flex items-center gap-2 rounded-xl border border-black/10 px-6 py-3 text-sm font-semibold text-foreground hover:bg-black/5 transition focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
        >
          <MessageCircle className="h-4 w-4" />
          Talk to a real one
        </Link>
      </div>
    </motion.div>
  );
}
