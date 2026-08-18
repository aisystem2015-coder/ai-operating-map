"use client";

import * as React from "react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface Embeddings3DVisualizationProps {
  mainColor?: string;
  secondaryColor?: string;
  className?: string;
}

interface Point3D {
  id: number;
  x: number;
  y: number;
  z: number;
  color: string;
  isRelevant: boolean; // Will align on hover
  alignX?: number;
  alignY?: number;
  alignZ?: number;
}

// Color palette for different points
const colorPalette = [
  "#2563eb", // Blue
  "#00FDCF", // Teal
  "#FF6B6B", // Red
  "#FFD93D", // Yellow
  "#6BCF7F", // Green
  "#A78BFA", // Purple
  "#FB7185", // Pink
  "#38BDF8", // Sky blue
  "#F59E0B", // Orange
  "#10B981", // Emerald
];

// Aligned points get special colors
const alignedColorPalette = [
  "#00FDCF", // Teal
  "#2563eb", // Blue
  "#A78BFA", // Purple
  "#FFD93D", // Yellow
  "#6BCF7F", // Green
];

export function Embeddings3DVisualization({
  mainColor = "#2563eb",
  secondaryColor = "#00FDCF",
  className,
}: Embeddings3DVisualizationProps) {
  const [hovered, setHovered] = useState(false);

  // Generate points in 3D space
  const generatePoints = (): Point3D[] => {
    const points: Point3D[] = [];
    const totalPoints = 100;
    const relevantCount = Math.floor(totalPoints * 0.15); // 15% will align
    
    for (let i = 0; i < totalPoints; i++) {
      const isRelevant = i < relevantCount;
      
      // Random 3D positions (normalized to 0-100 for viewBox)
      const x = 15 + Math.random() * 70; // Spread across more area
      const y = 15 + Math.random() * 70;
      const z = Math.random() * 80 + 10; // Depth range 10-90
      
      // Random color from palette
      const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
      
      let alignX = x;
      let alignY = y;
      let alignZ = z;
      
      if (isRelevant) {
        // Align in a nice horizontal chain in the center
        const chainIndex = i;
        alignX = 20 + (chainIndex * 4.5); // Horizontal chain
        alignY = 50; // Fixed Y position (center)
        alignZ = 50; // Center depth for consistent projection
      }
      
      points.push({
        id: i,
        x,
        y,
        z,
        color,
        isRelevant,
        alignX,
        alignY,
        alignZ,
      });
    }
    
    return points;
  };

  const [points] = React.useState<Point3D[]>(generatePoints());

  // Project 3D to 2D with perspective
  const project3D = (x: number, y: number, z: number, viewBoxSize: number = 100) => {
    const perspective = 150;
    const normalizedZ = z / 100; // Normalize z to 0-1
    const scale = perspective / (perspective + z * 0.8);
    const projectedX = (x - viewBoxSize / 2) * scale + viewBoxSize / 2;
    const projectedY = (y - viewBoxSize / 2) * scale + viewBoxSize / 2;
    return { x: projectedX, y: projectedY, scale: Math.max(0.5, scale) };
  };

  // Get aligned points for connecting lines
  const alignedPoints = points.filter(p => p.isRelevant);

  return (
    <div
      className={cn(
        "relative w-full max-w-[1200px] mx-auto overflow-visible rounded-xl",
        className
      )}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onTouchStart={() => setHovered(true)}
      onTouchEnd={() => setHovered(false)}
      onClick={() => setHovered(!hovered)}
    >
      <div 
        className="relative w-full aspect-[16/9] min-h-[400px] md:min-h-[500px] overflow-visible rounded-xl border border-zinc-200/50 bg-gradient-to-br from-black/5 via-transparent to-black/5 dark:border-zinc-800/50 dark:from-white/5 dark:via-transparent dark:to-white/5 shadow-sm transition-transform duration-700 ease-[cubic-bezier(0.6, 0.6, 0, 1)]"
        style={{
          transform: hovered ? "scale(1.15)" : "scale(1)",
        }}
      >
        {/* 3D Axes - Disappear on hover */}
        <svg
          className="absolute inset-0 w-full h-full z-[3] transition-opacity duration-700"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          style={{ opacity: hovered ? 0 : 1 }}
        >
          {/* Origin point */}
          <circle cx="15" cy="85" r="0.8" fill="rgba(0,0,0,0.5)" />
          
          {/* X-axis (horizontal) */}
          <line
            x1="15"
            y1="85"
            x2="85"
            y2="85"
            stroke="rgba(0,0,0,0.3)"
            strokeWidth="0.6"
            strokeDasharray="1.5,1.5"
          />
          {/* Y-axis (vertical) */}
          <line
            x1="15"
            y1="85"
            x2="15"
            y2="15"
            stroke="rgba(0,0,0,0.3)"
            strokeWidth="0.6"
            strokeDasharray="1.5,1.5"
          />
          {/* Z-axis (diagonal for 3D depth effect) */}
          <line
            x1="15"
            y1="85"
            x2="25"
            y2="75"
            stroke="rgba(0,0,0,0.3)"
            strokeWidth="0.6"
            strokeDasharray="1.5,1.5"
          />
          
          {/* Axis labels with better visibility */}
          <text
            x="87"
            y="87"
            fontSize="5"
            fill="rgba(0,0,0,0.8)"
            className="font-mono"
            style={{ fontWeight: 700 }}
          >
            X
          </text>
          <text
            x="12"
            y="12"
            fontSize="5"
            fill="rgba(0,0,0,0.8)"
            className="font-mono"
            style={{ fontWeight: 700 }}
          >
            Y
          </text>
          <text
            x="27"
            y="73"
            fontSize="5"
            fill="rgba(0,0,0,0.8)"
            className="font-mono"
            style={{ fontWeight: 700 }}
          >
            Z
          </text>
        </svg>

        {/* Grid Layer - Fade on hover */}
        <div
          className="pointer-events-none absolute inset-0 z-[4] h-full w-full bg-transparent bg-[linear-gradient(to_right,rgba(0,0,0,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.05)_1px,transparent_1px)] bg-[size:20px_20px] bg-center transition-opacity duration-700"
          style={{ opacity: hovered ? 0.2 : 0.5 }}
        />

        {/* Points Layer */}
        <div className="absolute inset-0 z-[8] w-full h-full">
          <svg
            className="w-full h-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            {/* Connecting lines between aligned points on hover */}
            {hovered && alignedPoints.length > 1 && alignedPoints.map((point, index) => {
              if (index === alignedPoints.length - 1) return null;
              const nextPoint = alignedPoints[index + 1];
              const currentProj = project3D(point.alignX!, point.alignY!, point.alignZ!);
              const nextProj = project3D(nextPoint.alignX!, nextPoint.alignY!, nextPoint.alignZ!);
              
              return (
                <line
                  key={`line-${point.id}`}
                  x1={currentProj.x}
                  y1={currentProj.y}
                  x2={nextProj.x}
                  y2={nextProj.y}
                  stroke={alignedColorPalette[point.id % alignedColorPalette.length]}
                  strokeWidth="0.8"
                  strokeOpacity="0.6"
                  className="transition-all duration-700 ease-[cubic-bezier(0.6, 0.6, 0, 1)]"
                />
              );
            })}

            {points.map((point) => {
              if (hovered && !point.isRelevant) {
                // Non-relevant points disappear
                return null;
              }

              const useAligned = hovered && point.isRelevant;
              const currentX = useAligned ? point.alignX! : point.x;
              const currentY = useAligned ? point.alignY! : point.y;
              const currentZ = useAligned ? point.alignZ! : point.z;

              const projected = project3D(currentX, currentY, currentZ);
              const alignedColor = alignedColorPalette[point.id % alignedColorPalette.length];
              const pointColor = useAligned ? alignedColor : point.color;
              const pointSize = useAligned ? 2.5 : projected.scale * 1.2; // Much larger when aligned

              return (
                <g key={point.id}>
                  <circle
                    cx={projected.x}
                    cy={projected.y}
                    r={pointSize}
                    fill={pointColor}
                    opacity={1}
                    className="transition-all duration-700 ease-[cubic-bezier(0.6, 0.6, 0, 1)]"
                    style={{
                      filter: "none", // Solid, no blur
                    }}
                  />
                  {/* Probability text above aligned points */}
                  {useAligned && hovered && (
                    <text
                      x={projected.x}
                      y={projected.y - pointSize - 3}
                      fontSize="4.5"
                      fill={alignedColor}
                      className="font-mono font-semibold transition-all duration-700 ease-[cubic-bezier(0.6, 0.6, 0, 1)]"
                      textAnchor="middle"
                      style={{
                        fontWeight: 700,
                        textShadow: "0 1px 3px rgba(0,0,0,0.5), 0 0 8px rgba(0,0,0,0.3)",
                      }}
                    >
                      {`${(95 - point.id * 2).toFixed(1)}%`}
                    </text>
                  )}
                </g>
              );
            })}
          </svg>
        </div>

        {/* Gradient overlay on hover */}
        <div
          className="absolute inset-0 z-[6] flex items-center justify-center transition-opacity duration-500"
          style={{ opacity: hovered ? 0.3 : 0 }}
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

        {/* Text overlay on hover - positioned above aligned particles */}
        {hovered && (
          <div
            className="absolute inset-0 z-[10] flex items-start justify-center transition-all duration-700 ease-[cubic-bezier(0.6, 0.6, 0, 1)] pt-8"
            style={{
              pointerEvents: "none",
            }}
          >
            <div className="max-w-3xl mx-auto px-6 text-center">
              <div className="bg-white backdrop-blur-md rounded-xl border-2 border-zinc-300 p-6 shadow-2xl">
                <h4 className="text-xl md:text-2xl font-heading font-bold text-gray-900 mb-2">
                  This is the embedding
                </h4>
                <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                  The power of embedding, which generates meaning through probability. 
                  This is how we unlock LLMs—by converting language into mathematical space 
                  where similarity becomes computation.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

