"use client";

import * as React from "react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface EmbeddingsVisualizationProps {
  mainColor?: string;
  secondaryColor?: string;
  gridColor?: string;
  className?: string;
}

interface Point {
  id: number;
  x: number;
  y: number;
  z: number; // For fake 3D depth effect
  isRelevant: boolean; // Whether this point is a "best match"
  hoverX?: number; // Target x position on hover (for alignment)
  hoverY?: number; // Target y position on hover
  hoverOpacity?: number; // Target opacity on hover
  hoverScale?: number; // Target scale on hover
}

export function EmbeddingsVisualization({
  mainColor = "#2563eb",
  secondaryColor = "#00FDCF",
  gridColor = "#80808015",
  className,
}: EmbeddingsVisualizationProps) {
  const [hovered, setHovered] = useState(false);
  
  // For mobile: allow tap to trigger the animation
  const handleInteraction = (isActive: boolean) => {
    setHovered(isActive);
  };

  // Generate points in a scattered 3D-like cloud
  // Some points will be "relevant" (best matches) and will align on hover
  const generatePoints = (): Point[] => {
    const points: Point[] = [];
    const totalPoints = 150;
    const relevantCount = 6; // Number of points that will be "best matches"
    
    // Generate scattered points
    for (let i = 0; i < totalPoints; i++) {
      const isRelevant = i < relevantCount;
      
      // Random positions in a scattered cloud (more concentrated in center)
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.random() * 35 + 5; // Concentrated in center area
      const baseX = 50 + Math.cos(angle) * radius;
      const baseY = 50 + Math.sin(angle) * radius;
      const z = Math.random(); // Depth for 3D effect
      
      let hoverX = baseX;
      let hoverY = baseY;
      let hoverOpacity = 0.15; // Most points fade significantly
      let hoverScale = 0.5; // Most points shrink and drift outward
      
      if (isRelevant) {
        // Relevant points align vertically in a tight cluster on the right
        const clusterCenterX = 72;
        const clusterCenterY = 48;
        const spread = (i - relevantCount / 2) * 1.5; // Tight vertical cluster
        hoverX = clusterCenterX;
        hoverY = clusterCenterY + spread;
        hoverOpacity = 1; // Fully visible
        hoverScale = 1.4; // Larger and more prominent
      } else {
        // Non-relevant points drift outward from center
        const driftAngle = Math.atan2(baseY - 50, baseX - 50);
        const driftDistance = 15 + Math.random() * 10; // Drift outward
        hoverX = baseX + Math.cos(driftAngle) * driftDistance;
        hoverY = baseY + Math.sin(driftAngle) * driftDistance;
        // Clamp to viewBox bounds
        hoverX = Math.max(5, Math.min(95, hoverX));
        hoverY = Math.max(5, Math.min(95, hoverY));
      }
      
      points.push({
        id: i,
        x: baseX,
        y: baseY,
        z,
        isRelevant,
        hoverX,
        hoverY,
        hoverOpacity,
        hoverScale,
      });
    }
    
    return points;
  };

  const [points] = React.useState<Point[]>(generatePoints());

  return (
    <div
      className={cn(
        "relative w-full max-w-[1200px] mx-auto overflow-hidden rounded-xl",
        className
      )}
      onMouseEnter={() => handleInteraction(true)}
      onMouseLeave={() => handleInteraction(false)}
      onTouchStart={() => handleInteraction(true)}
      onTouchEnd={() => handleInteraction(false)}
      onClick={() => handleInteraction(!hovered)}
      style={
        {
          "--color": mainColor,
          "--secondary-color": secondaryColor,
        } as React.CSSProperties
      }
    >
      <div className="relative w-full aspect-[16/9] min-h-[400px] md:min-h-[500px] overflow-hidden rounded-xl border border-zinc-200/50 bg-gradient-to-br from-black/5 via-transparent to-black/5 dark:border-zinc-800/50 dark:from-white/5 dark:via-transparent dark:to-white/5 shadow-sm">
        {/* Grid Layer */}
        <div
          style={{ "--grid-color": gridColor } as React.CSSProperties}
          className="pointer-events-none absolute inset-0 z-[4] h-full w-full bg-transparent bg-[linear-gradient(to_right,var(--grid-color)_1px,transparent_1px),linear-gradient(to_bottom,var(--grid-color)_1px,transparent_1px)] bg-[size:20px_20px] bg-center opacity-70 [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_60%,transparent_100%)]"
        />

        {/* Ellipse Gradient */}
        <div className="absolute inset-0 z-[5] flex h-full w-full items-center justify-center">
          <svg
            className="w-full h-full"
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
          >
            <rect width="100" height="100" fill="url(#paint0_radial_embeddings)" />
            <defs>
              <radialGradient
                id="paint0_radial_embeddings"
                cx="50"
                cy="50"
                r="50"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor={mainColor} stopOpacity="0.25" />
                <stop offset="0.34" stopColor={mainColor} stopOpacity="0.15" />
                <stop offset="1" stopOpacity="0" />
              </radialGradient>
            </defs>
          </svg>
        </div>

        {/* Points Layer */}
        <div className="absolute inset-0 z-[8] w-full h-full">
          <svg
            className="w-full h-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            {points.map((point) => {
              const currentX = hovered ? point.hoverX! : point.x;
              const currentY = hovered ? point.hoverY! : point.y;
              const currentOpacity = hovered 
                ? point.hoverOpacity! 
                : 0.5 + point.z * 0.3; // Initial: varied opacity for depth
              const currentScale = hovered 
                ? point.hoverScale! 
                : 0.6 + point.z * 0.4; // Initial: varied size for depth
              const currentBlur = hovered 
                ? (point.isRelevant ? 0 : 1.5) // Relevant points sharp, others blurred
                : point.z * 1.2; // Initial: depth-based blur
              const pointColor = point.isRelevant && hovered 
                ? secondaryColor 
                : mainColor;
              
              return (
                <circle
                  key={point.id}
                  cx={currentX}
                  cy={currentY}
                  r={1.2 * currentScale}
                  fill={pointColor}
                  opacity={currentOpacity}
                  className="transition-all duration-700 ease-[cubic-bezier(0.6, 0.6, 0, 1)]"
                  style={{
                    filter: `blur(${currentBlur}px)`,
                  }}
                />
              );
            })}
          </svg>
        </div>

        {/* Gradient overlay on hover */}
        <div className="ease-[cubic-bezier(0.6, 0.6, 0, 1)] absolute inset-0 z-[6] flex items-center justify-center opacity-0 transition-all duration-500 group-hover:opacity-100"
          style={{ opacity: hovered ? 1 : 0 }}
        >
          <svg
            className="w-full h-full"
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
          >
            <rect width="100" height="100" fill="url(#paint0_linear_hover)" />
            <defs>
              <linearGradient
                id="paint0_linear_hover"
                x1="50"
                y1="0"
                x2="50"
                y2="100"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0.35" stopColor={mainColor} stopOpacity="0" />
                <stop offset="1" stopColor={mainColor} stopOpacity="0.3" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Tooltip that slides in on hover */}
        <div
          className="ease-[cubic-bezier(0.6, 0.6, 0, 1)] absolute inset-0 z-[7] flex w-full items-start justify-center bg-transparent p-4 transition-transform duration-500"
          style={{
            transform: hovered ? "translateY(0)" : "translateY(20px)",
            opacity: hovered ? 1 : 0,
            pointerEvents: hovered ? "auto" : "none",
          }}
        >
          <div className="ease-[cubic-bezier(0.6, 0, 1)] rounded-lg border border-zinc-200 bg-white/30 p-4 backdrop-blur-md shadow-lg dark:border-zinc-800 dark:bg-black/30">
            <div className="flex items-center gap-2 mb-1.5">
              <div className="h-2 w-2 shrink-0 rounded-full bg-[var(--color)]" />
              <p className="text-sm font-semibold text-black dark:text-white">
                Query vector created
              </p>
            </div>
            <p className="text-xs text-neutral-600 dark:text-neutral-400">
              Nearest neighbors selected
            </p>
          </div>
        </div>

        {/* "Best probability match" label - appears near aligned points on hover */}
        <div
          className="absolute z-[9] transition-all duration-700 ease-[cubic-bezier(0.6, 0.6, 0, 1)]"
          style={{
            left: "72%",
            top: "48%",
            transform: hovered ? "translateY(0)" : "translateY(10px)",
            opacity: hovered ? 1 : 0,
            pointerEvents: hovered ? "auto" : "none",
          }}
        >
          <div className="flex items-center gap-2 rounded-full border border-zinc-200 bg-white/90 px-4 py-2 backdrop-blur-sm shadow-lg dark:border-zinc-800 dark:bg-black/90">
            <div className="h-2 w-2 shrink-0 rounded-full bg-[var(--secondary-color)] animate-pulse" />
            <span className="text-sm font-semibold text-black dark:text-white">
              Best probability match
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

