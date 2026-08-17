"use client";

/**
 * Magic UI-style Animated Gradient Text (reference:
 * magicui.design/docs/components/animated-gradient-text) — re-themed to the
 * emerald palette (no purple/pink defaults) for the site's main hero claim.
 */
import { cn } from "@/lib/utils";

export function AnimatedGradientText({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline bg-gradient-to-r from-blue-600 via-teal-500 to-blue-600 bg-[length:200%_auto] bg-clip-text text-transparent [animation:gradient-pan_4s_linear_infinite]",
        className,
      )}
    >
      {children}
    </span>
  );
}
