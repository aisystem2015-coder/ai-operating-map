"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useSpring, useTransform } from "framer-motion";
import { SplineScene } from "@/components/ui/spline-scene";
import { Spotlight } from "@/components/ui/spotlight";
import { SpotlightReactiveText } from "@/components/ui/spotlight-reactive-text";
import { HiddenFact } from "@/components/ui/hidden-fact";

export default function MarketRealityHero() {
  const [showInitials, setShowInitials] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const mouseX = useSpring(0, { stiffness: 150, damping: 15 });
  const mouseY = useSpring(0, { stiffness: 150, damping: 15 });

  useEffect(() => {
    // Delay showing initials by 2.5 seconds to let robot animation complete
    const timer = setTimeout(() => {
      setShowInitials(true);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current.closest('section');
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      
      // Check if mouse is within the section bounds
      if (
        e.clientX < rect.left || 
        e.clientX > rect.right || 
        e.clientY < rect.top || 
        e.clientY > rect.bottom
      ) {
        return;
      }
      
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      // Calculate offset from center (normalized to -1 to 1)
      const offsetX = (e.clientX - centerX) / (rect.width / 2);
      const offsetY = (e.clientY - centerY) / (rect.height / 2);
      
      // Apply subtle movement (max 8px movement)
      mouseX.set(offsetX * 8);
      mouseY.set(offsetY * 8);
    };

    // Use capture phase to catch events even on child elements
    window.addEventListener('mousemove', handleMouseMove, true);
    return () => window.removeEventListener('mousemove', handleMouseMove, true);
  }, [mouseX, mouseY]);

  // Transform for subtle parallax movement (max 8px)
  const parallaxX = useTransform(mouseX, (value) => value);
  const parallaxY = useTransform(mouseY, (value) => value);

  return (
    <section ref={containerRef} className="relative w-full bg-black/[0.96] overflow-hidden h-[580px] lg:h-[680px]">
      <Spotlight size={250} />
      
      {/* Hidden facts that appear on hover */}
      <HiddenFact 
        spotlightSize={250}
        hoverColor="#5BA3FF"
        position={{ top: '12%', left: '18%' }}
      >
        60-70% of AI use cases fail at the data layer
      </HiddenFact>
      
      <HiddenFact 
        spotlightSize={250}
        hoverColor="#5BA3FF"
        position={{ bottom: '18%', left: '48%' }}
        className="transform -translate-x-1/2"
      >
        Need a change in data mindset
      </HiddenFact>
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-20 pb-0 w-full h-full flex items-center">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center w-full">
          {/* Left side: Text content */}
          <div className="flex-1 relative z-10 flex flex-col justify-center pointer-events-none">
            <SpotlightReactiveText 
              className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold leading-tight mb-6 pointer-events-none"
              spotlightSize={250}
              hoverColor="#00FDCF"
              defaultColor="white"
              radius={120}
            >
              95% of GenAI pilots fail to scale
            </SpotlightReactiveText>
            
            <p className="text-lg md:text-xl text-neutral-300 max-w-lg mb-6 leading-relaxed">
              Most pilots succeed in demos, then fail in production.  
              This gap is structural, not technical.
            </p>
            
            <p className="text-sm text-neutral-500 mb-8">
              Source: AI World Summit 2025 & cited industry research · Updated with Ai4 2026 data below
            </p>
            
            {/* Hidden fact below source text */}
            <div className="relative mt-2">
              <HiddenFact 
                spotlightSize={250}
                hoverColor="#5BA3FF"
                position={{ top: '0', left: '8%' }}
                className="relative"
              >
                Just 20% of POCs have realistic expectations
              </HiddenFact>
            </div>
          </div>

          {/* Right side: 3D Spline scene */}
          <div className="flex-1 relative w-full h-[500px] lg:h-[600px] mt-6">
            <SplineScene 
              scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
              className="w-full h-full"
            />
            {/* FG Initials - metallic etched engraving on chest armor (easter egg) */}
            {showInitials && (
              <div className="absolute top-[50%] left-[50%] pointer-events-none z-0" style={{ transform: 'translate(-50%, -50%)' }}>
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  style={{
                    x: parallaxX,
                    y: parallaxY
                  }}
                >
                <div className="relative">
                  {/* Deep shadow layer for depth */}
                  <div 
                    className="absolute inset-0 font-heading font-bold text-2xl md:text-3xl tracking-tighter"
                    style={{
                      color: 'transparent',
                      WebkitTextStroke: '1px rgba(0, 0, 0, 0.7)',
                      filter: 'blur(1.5px)',
                      transform: 'translate(2px, 2px)',
                      opacity: 0.5
                    }}
                  >
                    FG
                  </div>
                  {/* Metallic engraved text */}
                  <div 
                    className="font-heading font-bold text-2xl md:text-3xl tracking-tighter relative"
                    style={{
                      color: 'rgba(60, 60, 60, 0.75)',
                      textShadow: `
                        2px 2px 6px rgba(0, 0, 0, 0.9),
                        1px 1px 3px rgba(0, 0, 0, 0.8),
                        0 0 10px rgba(0, 0, 0, 0.6),
                        -1px -1px 2px rgba(255, 255, 255, 0.05),
                        0 1px 0 rgba(255, 255, 255, 0.1)
                      `,
                      mixBlendMode: 'multiply',
                      letterSpacing: '-0.03em',
                      filter: 'contrast(1.2) brightness(0.8)',
                      WebkitTextStroke: '0.3px rgba(70, 70, 70, 0.3)'
                    }}
                  >
                    FG
                  </div>
                </div>
                </motion.div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
