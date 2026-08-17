"use client";

import { useState, useRef, useEffect } from "react";

const infrastructureItems = [
  "Agent Orchestration",
  "Data/App Integrations",
  "Data Engineering",
  "Data Storage",
  "Governance",
  "Privacy & Security",
  "Cost",
  "Scalability",
  "Expertise",
  "Maintenance",
];

export default function Iceberg() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [hoveredAI, setHoveredAI] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
        const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
        setMousePosition({ x, y });
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("mousemove", handleMouseMove);
      return () => container.removeEventListener("mousemove", handleMouseMove);
    }
  }, []);

  const tiltX = mousePosition.x * 2;
  const tiltY = mousePosition.y * 1.5;

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-6xl mx-auto"
      style={{ perspective: "1200px" }}
    >
      {/* 75% Statistic - Separate callout above */}
      <div className="text-center mb-12">
        <div className="text-7xl md:text-8xl font-heading font-bold text-[#2563eb] leading-none mb-4">
          75%
        </div>
        <p className="text-xl md:text-2xl text-secondary max-w-3xl mx-auto leading-relaxed">
          of enterprises have more AI use cases than they&apos;re able to pursue
        </p>
        <p className="text-lg text-secondary/80 mt-2 max-w-2xl mx-auto">
          And most of them fail due to poor data
        </p>
      </div>

      {/* Mindset Shift Table - immediately under stat */}
      <div className="mb-12">
        <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg border border-black/5 px-8 md:px-12 py-10">
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#2563eb] text-white font-semibold uppercase tracking-[0.08em] text-sm">
              Mindset Shift
            </div>
          </div>
          <div className="grid grid-cols-[1fr_auto_1fr] gap-x-6 md:gap-x-12 gap-y-4 md:gap-y-6 text-lg text-secondary">
            <div className="font-semibold text-foreground text-xl md:text-2xl">FROM</div>
            <div className="flex justify-center items-center text-[#2563eb] font-bold text-2xl md:text-3xl tracking-[0.15em]">
              →
            </div>
            <div className="font-semibold text-foreground text-right md:text-left text-xl md:text-2xl">TO</div>

            <div>Data as a support asset</div>
            <div className="flex justify-center items-center text-[#2563eb] font-bold text-2xl md:text-3xl tracking-[0.15em]">
              →
            </div>
            <div className="text-right md:text-left">
              Data as a <span className="font-semibold text-foreground">strategic differentiator</span>
            </div>

            <div>Governance as compliance</div>
            <div className="flex justify-center items-center text-[#2563eb] font-bold text-2xl md:text-3xl tracking-[0.15em]">
              →
            </div>
            <div className="text-right md:text-left">
              Governance as <span className="font-semibold text-foreground">enablement and trust</span>
            </div>

            <div>Static dashboards</div>
            <div className="flex justify-center items-center text-[#2563eb] font-bold text-2xl md:text-3xl tracking-[0.15em]">
              →
            </div>
            <div className="text-right md:text-left">
              Real-time <span className="font-semibold text-foreground">data observability</span>
            </div>
          </div>
        </div>
      </div>

      {/* Iceberg Container */}
      <div className="relative rounded-2xl overflow-hidden shadow-2xl">
        {/* Top Section - White Background (Above Water) */}
        <div className="bg-white px-8 md:px-12 py-12 md:py-16 relative">
          <div
            className="transition-transform duration-300 ease-out"
            style={{
              transform: `rotateY(${tiltX}deg) rotateX(${-tiltY}deg)`,
              transformStyle: "preserve-3d",
            }}
          >
            {/* Iceberg Tip SVG - Above Water */}
            <div className="relative w-full max-w-2xl mx-auto mb-8">
              <svg
                viewBox="0 0 500 200"
                className="w-full h-full"
                preserveAspectRatio="xMidYMid meet"
                style={{ minHeight: "120px" }}
              >
                <defs>
                  <linearGradient
                    id="icebergTopGradient"
                    x1="0%"
                    y1="0%"
                    x2="0%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="#E8F4F8" stopOpacity="1" />
                    <stop offset="100%" stopColor="#B8D9E8" stopOpacity="1" />
                  </linearGradient>
                </defs>
                {/* Above water - small visible AI tip */}
                <path
                  d="M 150 200 
                     Q 200 120 250 180 
                     Q 280 100 300 180 
                     Q 350 120 350 200 
                     L 350 200 
                     L 150 200 
                     Z"
                  fill="url(#icebergTopGradient)"
                  className="transition-opacity duration-300"
                  style={{
                    opacity: hoveredAI ? 1 : 0.95,
                  }}
                />
              </svg>
            </div>

            {/* YOUR AI Content */}
            <div
              className="text-center transition-opacity duration-300"
              style={{
                opacity: hoveredAI ? 1 : 0.95,
              }}
              onMouseEnter={() => setHoveredAI(true)}
              onMouseLeave={() => setHoveredAI(false)}
            >
              <h3 className="text-4xl md:text-5xl font-heading font-bold text-[#4D9DFB] mb-3">
                YOUR AI
              </h3>
              <p className="text-base md:text-lg text-secondary">
                Normal integration of AI in companies
              </p>
              <p className="text-sm md:text-base text-secondary/80 mt-2">
                User-facing applications, copilots, assistants
              </p>
            </div>
          </div>
        </div>

        {/* Waterline - Visual Separator */}
        <div className="h-2 bg-gradient-to-b from-[#7DD3FC] via-[#00FDCF] to-[#0A7A8A] relative">
          <div className="absolute left-1/2 -translate-x-1/2 -top-3 text-xs text-[#0A7A8A] font-medium bg-white px-3 rounded-full border border-[#00FDCF]/30">
            Water Line
          </div>
        </div>

        {/* Bottom Section - Dark Blue Background (Below Water) */}
        <div className="bg-[#0A1E2E] px-8 md:px-12 py-12 md:py-16 relative">
          <div
            className="transition-transform duration-300 ease-out"
            style={{
              transform: `rotateY(${tiltX}deg) rotateX(${-tiltY}deg)`,
              transformStyle: "preserve-3d",
            }}
          >
            {/* Iceberg Base SVG - Below Water */}
            <div className="relative w-full max-w-4xl mx-auto">
              <svg
                viewBox="0 0 600 400"
                className="w-full h-full"
                preserveAspectRatio="xMidYMid meet"
                style={{ minHeight: "300px" }}
              >
                <defs>
                  {/* Network pattern for data graph effect */}
                  <pattern
                    id="dataNetworkPattern"
                    x="0"
                    y="0"
                    width="60"
                    height="60"
                    patternUnits="userSpaceOnUse"
                  >
                    {/* Dots */}
                    <circle cx="30" cy="30" r="2.5" fill="#00FDCF" opacity="0.4" />
                    <circle cx="10" cy="10" r="1.5" fill="#00FDCF" opacity="0.3" />
                    <circle cx="50" cy="10" r="1.5" fill="#00FDCF" opacity="0.3" />
                    <circle cx="10" cy="50" r="1.5" fill="#00FDCF" opacity="0.3" />
                    <circle cx="50" cy="50" r="1.5" fill="#00FDCF" opacity="0.3" />
                    {/* Connecting lines */}
                    <line
                      x1="30"
                      y1="30"
                      x2="10"
                      y2="10"
                      stroke="#00FDCF"
                      strokeWidth="0.8"
                      opacity="0.2"
                    />
                    <line
                      x1="30"
                      y1="30"
                      x2="50"
                      y2="10"
                      stroke="#00FDCF"
                      strokeWidth="0.8"
                      opacity="0.2"
                    />
                    <line
                      x1="30"
                      y1="30"
                      x2="10"
                      y2="50"
                      stroke="#00FDCF"
                      strokeWidth="0.8"
                      opacity="0.2"
                    />
                    <line
                      x1="30"
                      y1="30"
                      x2="50"
                      y2="50"
                      stroke="#00FDCF"
                      strokeWidth="0.8"
                      opacity="0.2"
                    />
                  </pattern>

                  {/* Gradient for below water - dark blue */}
                  <linearGradient
                    id="icebergBaseGradient"
                    x1="0%"
                    y1="0%"
                    x2="0%"
                    y2="100%"
                  >
                    <stop
                      offset="0%"
                      stopColor="#0F3A5A"
                      stopOpacity={hoveredItem ? 1 : hoveredAI ? 0.75 : 0.95}
                    />
                    <stop
                      offset="100%"
                      stopColor="#051A2E"
                      stopOpacity={hoveredItem ? 1 : hoveredAI ? 0.75 : 0.95}
                    />
                  </linearGradient>
                </defs>

                {/* Below waterline - large infrastructure base (classic iceberg) */}
                <path
                  d="M 50 0 
                     Q 100 20 150 0 
                     Q 200 10 250 0 
                     Q 300 20 350 0 
                     Q 400 10 450 0 
                     Q 500 20 550 0 
                     L 580 400 
                     L 20 400 
                     Z"
                  fill="url(#icebergBaseGradient)"
                  className="transition-all duration-300"
                />
                {/* Network pattern overlay */}
                <path
                  d="M 50 0 
                     Q 100 20 150 0 
                     Q 200 10 250 0 
                     Q 300 20 350 0 
                     Q 400 10 450 0 
                     Q 500 20 550 0 
                     L 580 400 
                     L 20 400 
                     Z"
                  fill="url(#dataNetworkPattern)"
                  className="transition-opacity duration-300"
                  style={{
                    opacity: hoveredItem ? 0.4 : 0.25,
                  }}
                />
              </svg>

              {/* Infrastructure Content Overlay - Inside the underwater iceberg */}
              <div className="absolute inset-0 flex flex-col justify-center items-center pointer-events-none">
                <div
                  className="w-full max-w-3xl px-6 md:px-10 transition-opacity duration-300 pointer-events-auto"
                  style={{
                    opacity: hoveredAI ? 0.8 : 1,
                  }}
                >
                  <h3 className="text-3xl md:text-4xl font-heading font-bold text-[#4D9DFB] mb-8 text-center">
                    YOUR INFRASTRUCTURE
                  </h3>
                  <p className="text-base md:text-lg text-white/80 mb-8 text-center">
                    Real integration of AI from an infrastructure perspective
                  </p>
                  <div className="grid grid-cols-2 gap-3 md:gap-4">
                    {infrastructureItems.map((item) => (
                      <div
                        key={item}
                        className={`px-4 py-3 md:px-5 md:py-3.5 rounded-lg text-sm md:text-base text-white transition-all duration-300 cursor-pointer text-center ${
                          hoveredItem === item
                            ? "bg-[#00FDCF]/40 text-[#00FDCF] scale-105 shadow-lg shadow-[#00FDCF]/30 font-semibold border border-[#00FDCF]/50"
                            : "bg-white/5 hover:bg-white/10 border border-white/10"
                        }`}
                        onMouseEnter={() => setHoveredItem(item)}
                        onMouseLeave={() => setHoveredItem(null)}
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Source Citation - Bottom */}
            <div className="text-center mt-8 text-xs text-white/60">
              Source: The Radical ROI of Gen AI Study - Snowflake
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
