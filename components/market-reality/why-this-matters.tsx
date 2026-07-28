"use client";

import { motion } from "framer-motion";
import SectionReveal from "../learning/SectionReveal";

export default function WhyThisMatters() {
  return (
    <section className="py-32 px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <SectionReveal>
          <div className="space-y-24">
            {/* Magazine-style WHY layout */}
            <div className="grid md:grid-cols-[auto_1fr] gap-8 md:gap-12 items-start">
              {/* Left: WHY */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="flex-shrink-0"
              >
                <h3 className="text-6xl md:text-7xl lg:text-8xl font-heading font-bold text-foreground leading-none tracking-tight">
                  WHY?
                </h3>
              </motion.div>

              {/* Right: Explanation */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="pt-2"
              >
                <p className="text-xl md:text-2xl text-secondary leading-relaxed font-light max-w-3xl">
                  Most pilots succeed in demos, then fail in production. The gap between &quot;can&quot; and &quot;does&quot; is structural, not technical. Three fundamental issues drive this failure.
                </p>
              </motion.div>
            </div>

            {/* Three Pillars */}
            <div className="grid md:grid-cols-3 gap-8 md:gap-12">
              {/* Expectations */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="hover-glow-flat text-center rounded-2xl border border-transparent -mx-4 -my-2 px-4 py-2"
              >
                <div className="mb-6">
                  <div className="w-16 h-16 mx-auto rounded-full border border-emerald-200 bg-emerald-100 flex items-center justify-center">
                    <span className="text-xl font-heading font-semibold text-emerald-800">1</span>
                  </div>
                </div>
                <h4 className="text-2xl md:text-3xl font-heading font-semibold text-foreground mb-4">
                  Expectations
                </h4>
                <p className="text-lg text-secondary leading-relaxed font-light">
                  Unrealistic assumptions about what AI can deliver without proper data foundations and integration.
                </p>
              </motion.div>

              {/* Data */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="hover-glow-flat text-center rounded-2xl border border-transparent -mx-4 -my-2 px-4 py-2"
              >
                <div className="mb-6">
                  <div className="w-16 h-16 mx-auto rounded-full border border-emerald-200 bg-emerald-100 flex items-center justify-center">
                    <span className="text-xl font-heading font-semibold text-emerald-800">2</span>
                  </div>
                </div>
                <h4 className="text-2xl md:text-3xl font-heading font-semibold text-foreground mb-4">
                  Data
                </h4>
                <p className="text-lg text-secondary leading-relaxed font-light">
                  Weak data foundations: messy, siloed, or incomplete data that cannot support reliable AI systems.
                </p>
              </motion.div>

              {/* Wrong Mindset */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="hover-glow-flat text-center rounded-2xl border border-transparent -mx-4 -my-2 px-4 py-2"
              >
                <div className="mb-6">
                  <div className="w-16 h-16 mx-auto rounded-full border border-emerald-200 bg-emerald-100 flex items-center justify-center">
                    <span className="text-xl font-heading font-semibold text-emerald-800">3</span>
                  </div>
                </div>
                <h4 className="text-2xl md:text-3xl font-heading font-semibold text-foreground mb-4">
                  Wrong Mindset
                </h4>
                <p className="text-lg text-secondary leading-relaxed font-light">
                  Horizontal thinking: building generic AI that tries to do everything instead of vertical, domain-specific solutions.
                </p>
              </motion.div>
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}

