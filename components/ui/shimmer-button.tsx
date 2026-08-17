"use client";

/**
 * Magic UI-style Shimmer Button (reference:
 * magicui.design/docs/components/shimmer-button) — re-themed to the site's
 * emerald accent instead of Magic UI's default black/white, for primary CTAs.
 * Simplified from the original child-span + container-query approach: that
 * relied on `cqw` units needing `container-type: inline-size`, which strips
 * the element's intrinsic width without an explicit one set — collapsed the
 * button to a sliver of wrapped text. This version animates background
 * position instead, so width stays entirely content-driven.
 */
import { cn } from "@/lib/utils";

export function ShimmerButton({
  children,
  className,
  href,
  background = "#059669", // blue-600, matches existing CTA buttons
  ...props
}: {
  children: React.ReactNode;
  className?: string;
  href: string;
  background?: string;
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "style" | "href">) {
  return (
    <a
      href={href}
      style={{
        backgroundColor: background,
        backgroundImage:
          "linear-gradient(110deg, transparent 40%, rgba(255,255,255,0.45) 50%, transparent 60%)",
        backgroundSize: "250% 100%",
      }}
      className={cn(
        "group inline-flex w-fit items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-white shadow-sm transition-[background-position,filter] duration-700 hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 animate-shimmer-slide",
        className,
      )}
      {...props}
    >
      {children}
    </a>
  );
}
