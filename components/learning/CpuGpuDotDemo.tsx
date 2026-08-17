"use client"

import { useMemo, useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"

// CPU draws a smiley sequentially; GPU paints a mosaic instantly.

// 7x7 smiley: simple circle + eyes + smile
const smileyDots = [
  [2, 1], [3, 1], [5, 1], [6, 1],
  [1, 2], [7, 2],
  [1, 3], [3, 3], [5, 3], [7, 3],
  [1, 4], [7, 4],
  [1, 5], [2, 5], [6, 5], [7, 5],
  [2, 6], [3, 6], [4, 6], [5, 6], [6, 6],
  [3, 7], [5, 7],
]

// Palette and 24x24 mosaic approximating the attached Rubik-style Mona Lisa
const monaPalette: Record<string, string> = {
  N: "#0b1a39", // navy
  B: "#12295a", // deep blue
  Y: "#f5c542", // yellow
  O: "#e06c2f", // orange
  G: "#1faa59", // green
  T: "#0ea5e9", // teal/sky
  W: "#ffffff", // white
}

const monaPixels: string[][] = [
  "BBBBBBBBBBBBBBBBBBBBBBBB".split(""),
  "BBBBGGGGTTTTGGGGGBBBBBBB".split(""),
  "BBBGGGTTTTTTTTTTGGGGBBBB".split(""),
  "BBGTTTTTBBBBBBTTTTTGGGBB".split(""),
  "BBGTTTBBBBOOOOBBBBTTTGBB".split(""),
  "BGTTBBYYYYYYYYYBBTTTGBBB".split(""),
  "BGTTBYYYYYYYYYYBTTTGBBB".split(""),
  "BGTTBYYYWYYYYWYYBTTTGBBB".split(""),
  "BGTTBYYYYYYYYYYBTTTGBBB".split(""),
  "BGTTBYYYYOOOYYYBTTTGBBBB".split(""),
  "BGTTBYYYYYYYYYYBTTTGBBB".split(""),
  "BGTTBYYYYYYYYYYBTTTGBBB".split(""),
  "BGTTBYYYYYYYYYYBTTTGBBB".split(""),
  "BGTTBYYYYYYYYYYBTTTGBBB".split(""),
  "BGTTBYYYYYYYYYYBTTTGBBB".split(""),
  "BBGTTBYYOOYYYYYBTTTGBBBB".split(""),
  "BBBGTTBBYYYYYYBBTTTGBBBB".split(""),
  "BBBBGGTTBBBBBBTTGGGBBBBB".split(""),
  "BBBBBBBGGGGGGGGBBBBBBBBB".split(""),
  "BBBBBBBBBBBBBBBBBBBBBBBB".split(""),
  "BBBBBBBBBBBBBBBBBBBBBBBB".split(""),
  "BBBBBBBBBBBBBBBBBBBBBBBB".split(""),
  "BBBBBBBBBBBBBBBBBBBBBBBB".split(""),
  "BBBBBBBBBBBBBBBBBBBBBBBB".split(""),
]

export default function CpuGpuDotDemo() {
  const [cpuProgress, setCpuProgress] = useState(0)
  const [gpuRevealed, setGpuRevealed] = useState(false)
  const maxDots = smileyDots.length
  const filledSet = useMemo(() => {
    const s = new Set<string>()
    smileyDots.slice(0, cpuProgress).forEach(([x, y]) => s.add(`${x}-${y}`))
    return s
  }, [cpuProgress])

  return (
    <div className="rounded-2xl border border-black/5 bg-white/80 shadow-sm p-6 md:p-8 space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        {/* CPU card */}
        <div className="rounded-2xl border border-sky-200 bg-sky-50/50 p-4 shadow-sm">
          <div className="flex items-center justify-between text-sm font-semibold text-slate-700 mb-3">
            <span>CPU: Sequential Processing</span>
            <span>{cpuProgress}/{maxDots} dots</span>
          </div>
          <p className="text-xs text-secondary mb-3">Click repeatedly to build the image dot by dot.</p>
          <div className="relative rounded-xl border border-sky-200 bg-white/80 p-4 shadow-inner flex justify-center">
            <div className="grid gap-[6px]" style={{ gridTemplateColumns: "repeat(7, 18px)", gridTemplateRows: "repeat(7, 18px)" }}>
              {Array.from({ length: 7 }).map((_, row) =>
                Array.from({ length: 7 }).map((_, col) => {
                  const key = `${col + 1}-${row + 1}`
                  const filled = filledSet.has(key)
                  return (
                    <motion.div
                      key={key}
                      initial={{ scale: filled ? 0 : 1, opacity: filled ? 0 : 1 }}
                      animate={{ scale: filled ? 1 : 1, opacity: 1 }}
                      transition={{ duration: 0.12 }}
                      className={`h-[18px] w-[18px] rounded-[4px] border ${filled ? "bg-blue-500 border-blue-600" : "bg-slate-100 border-slate-200"}`}
                    />
                  )
                })
              )}
            </div>
            {cpuProgress < maxDots && (
              <button
                onClick={() => setCpuProgress((p) => Math.min(p + 1, maxDots))}
                className="absolute inset-0 m-auto h-10 w-36 rounded-lg bg-foreground text-background text-sm font-semibold shadow hover:bg-foreground/90 focus:outline-none focus:ring-2 focus:ring-foreground focus:ring-offset-2"
              >
                Compute Next Dot
              </button>
            )}
          </div>
          <div className="mt-3 text-xs text-slate-600">
            Progress: {Math.round((Math.min(cpuProgress, maxDots) / maxDots) * 100)}% | One core processing sequentially
          </div>
          <button
            onClick={() => setCpuProgress(0)}
            className="mt-2 inline-flex items-center justify-center rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:border-slate-500 hover:text-slate-800"
          >
            Reset
          </button>
        </div>

        {/* GPU card */}
        <div className="rounded-2xl border border-blue-200 bg-blue-50/40 p-4 shadow-sm">
          <div className="flex items-center justify-between text-sm font-semibold text-slate-700 mb-3">
            <span>GPU: Parallel Processing</span>
            <span>{gpuRevealed ? "rendered" : "ready"}</span>
          </div>
          <p className="text-xs text-secondary mb-3">Click once to render the detailed image instantly.</p>
          <div className="relative rounded-xl border border-blue-200 bg-white/80 p-3 shadow-inner flex justify-center">
            <div className="grid gap-[2px]" style={{ gridTemplateColumns: "repeat(24, 10px)", gridTemplateRows: "repeat(24, 10px)" }}>
              {monaPixels.map((row, rIdx) =>
                row.map((colorKey, cIdx) => (
                  <div
                    key={`${rIdx}-${cIdx}`}
                    className="h-[10px] w-[10px] rounded-[2px] border border-slate-200"
                    style={{ backgroundColor: gpuRevealed ? monaPalette[colorKey] : "#e5e7eb" }}
                  />
                ))
              )}
            </div>
            {!gpuRevealed && (
              <button
                onClick={() => setGpuRevealed(true)}
                className="absolute inset-0 m-auto h-10 w-40 rounded-lg bg-blue-600 text-white text-sm font-semibold shadow hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Compute All at Once
              </button>
            )}
          </div>
          <div className="mt-3 text-xs text-slate-600">
            One click to start. Thousands of cores processing in parallel.
          </div>
          <button
            onClick={() => setGpuRevealed(false)}
            className="mt-2 inline-flex items-center justify-center rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:border-slate-500 hover:text-slate-800"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Memory comparison */}
      <div className="rounded-2xl border border-black/5 bg-white p-4 md:p-6 space-y-4">
        <div className="text-sm font-semibold uppercase tracking-[0.14em] text-secondary">
          Memory that feeds the compute
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-xl border border-slate-200 bg-slate-50/60 p-4 space-y-3 shadow-sm">
            <div className="text-sm font-semibold text-slate-800">CPU • Memory used</div>
            <div className="rounded-lg border border-slate-200 bg-white p-3 flex items-center justify-center">
              <div className="relative h-28 w-auto">
                <Image
                  src="/ai-origins/chip-sketch.png"
                  alt="Standard DRAM single chip"
                  width={400}
                  height={250}
                  className="h-28 w-auto object-contain"
                />
              </div>
            </div>
            <div className="text-xs font-semibold text-slate-700">Standard DRAM</div>
            <p className="text-xs text-secondary leading-relaxed">
              One CPU talks to one memory stick. Fine for sequential work, but bandwidth becomes the bottleneck for AI.
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-slate-50/60 p-4 space-y-3 shadow-sm">
            <div className="text-sm font-semibold text-slate-800">GPU • Memory used</div>
            <div className="rounded-lg border border-slate-200 bg-white p-3 flex items-center justify-center">
              <div className="relative h-28 w-auto">
                <Image
                  src="/ai-origins/hbm-stack-sketch.png"
                  alt="HBM stacked memory"
                  width={400}
                  height={250}
                  className="h-28 w-auto object-contain"
                />
              </div>
            </div>
            <div className="text-xs font-semibold text-slate-700">HBM (High Bandwidth Memory)</div>
            <p className="text-xs text-secondary leading-relaxed">
              Stacked memory sits on-package with huge parallel lanes, keeping thousands of GPU cores fed for training and inference.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
