"use client"

import { ParticleTextEffect } from "@/components/ui/particle-text-effect"
import { motion } from "framer-motion"
import Image from "next/image"

// Site blue accent: #2563eb
// ORIGINS teal-green: #00FDCF
const hexToRgb = (hex: string): { r: number; g: number; b: number } => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : { r: 255, g: 255, b: 255 }
}

export default function AIOriginsHero() {
  const wordColors = {
    "THE": hexToRgb("#2563eb"), // Site blue
    "TECH": hexToRgb("#00FDCF"), // Teal-green
    "AI": hexToRgb("#2563eb"), // Site blue
    "ORIGINS": hexToRgb("#00FDCF"), // Teal-green
  }

  return (
    <section className="relative w-screen min-h-[85vh] flex flex-col items-center justify-center overflow-hidden bg-transparent">
      <div className="absolute inset-0">
        <div className="absolute inset-0 opacity-95">
          <Image
            src="/ai-origins/blackboard-texture-2.png"
            alt="Chalkboard texture"
            fill
            priority
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-black/18" />
      </div>
      {/* Full-bleed particle canvas - covers entire hero with particles flowing throughout */}
      <div className="absolute inset-0 w-full h-full">
        <ParticleTextEffect 
          words={["THE", "TECH", "AI", "ORIGINS"]}
          wordColors={wordColors}
          fullBleed={true}
          className="w-full h-full"
        />
      </div>

      {/* Content layer - title and paragraphs over the particle canvas */}
      <div className="relative z-10 w-full flex flex-col items-center justify-center min-h-[85vh] py-12">
        {/* Title space - particles render centered here */}
        <div className="h-[35vh] flex items-center justify-center">
          {/* Title is rendered in the particle canvas above, centered */}
        </div>

        {/* Intro Paragraphs - floating over particles with glass effect */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="w-full max-w-[720px] mx-auto px-6 lg:px-8 relative mt-8"
        >
          {/* Glass effect - subtle backdrop blur with transparency */}
          <div className="absolute inset-0 -mx-4 -my-3 bg-black/25 backdrop-blur-[2px] rounded-xl pointer-events-none" />
          
          {/* Paragraphs - smaller size for better hierarchy */}
          <div className="relative z-10 px-6 py-5 text-center">
            <p className="text-base md:text-lg text-white leading-[1.7] font-light">
              Artificial intelligence is not a sudden invention from 2022, nor a single technology, nor a product category. It is a field that has existed for decades, but remained limited not because of lack of ideas, but because of computational constraints.
            </p>
            <p className="text-base md:text-lg text-white/90 leading-[1.7] font-light mt-6">
              The core shift to understand is that we moved from explicitly programming machines with rules to training machines with data, and that this change fundamentally alters what software is and how it scales. AI is no longer a tool that executes instructions; it is a system that learns behavior. That distinction is not semantic—it is structural, and it explains why AI works now in ways it never could before.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

