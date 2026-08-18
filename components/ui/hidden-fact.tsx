'use client';
import React, { useRef, useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';
import { cn } from '@/lib/utils';

interface HiddenFactProps {
  children: string;
  className?: string;
  spotlightSize?: number;
  hoverColor?: string;
  defaultColor?: string;
  position: { top?: string; bottom?: string; left?: string; right?: string };
}

export function HiddenFact({ 
  children, 
  className, 
  spotlightSize = 200,
  hoverColor = '#2563eb',
  defaultColor = 'rgba(0, 0, 0, 0)',
  position
}: HiddenFactProps) {
  const textRef = useRef<HTMLDivElement>(null);
  const [opacity, setOpacity] = useState(0);
  const [color, setColor] = useState(defaultColor);
  
  const mouseX = useSpring(0, { bounce: 0 });
  const mouseY = useSpring(0, { bounce: 0 });

  useEffect(() => {
    if (!textRef.current) return;
    const parent = textRef.current.closest('section');
    if (!parent) return;

    const move = (e: MouseEvent) => {
      const rect = parent.getBoundingClientRect();
      
      if (
        e.clientX >= rect.left && 
        e.clientX <= rect.right && 
        e.clientY >= rect.top && 
        e.clientY <= rect.bottom
      ) {
        mouseX.set(e.clientX - rect.left);
        mouseY.set(e.clientY - rect.top);
      }
    };

    const updateReveal = () => {
      if (!textRef.current) return;
      const rect = textRef.current.getBoundingClientRect();
      const parentRect = parent.getBoundingClientRect();
      const textCenterX = rect.left + rect.width / 2 - parentRect.left;
      const textCenterY = rect.top + rect.height / 2 - parentRect.top;
      
      const mx = mouseX.get();
      const my = mouseY.get();
      
      const dx = mx - textCenterX;
      const dy = my - textCenterY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      // Reveal when spotlight is within range
      if (distance < spotlightSize) {
        const intensity = 1 - (distance / spotlightSize);
        setOpacity(intensity);
        setColor(hoverColor);
      } else {
        setOpacity(0);
        setColor(defaultColor);
      }
    };

    window.addEventListener('mousemove', move, true);
    const unsubscribeX = mouseX.on('change', updateReveal);
    const unsubscribeY = mouseY.on('change', updateReveal);
    
    return () => {
      window.removeEventListener('mousemove', move, true);
      unsubscribeX();
      unsubscribeY();
    };
  }, [mouseX, mouseY, spotlightSize, hoverColor, defaultColor]);

  const isRelative = className?.includes('relative');
  
  return (
    <motion.div
      ref={textRef}
      className={cn(
        isRelative ? 'relative' : 'absolute',
        'pointer-events-none z-20',
        className
      )}
      style={{
        ...(isRelative ? {} : position),
        opacity,
        color,
        transition: 'opacity 1s ease-out, color 1s ease-out'
      }}
    >
      <p className="text-sm md:text-base font-mono tracking-wider text-left max-w-[300px]">
        {children}
      </p>
    </motion.div>
  );
}

