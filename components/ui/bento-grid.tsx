"use client";

/**
 * Magic UI-style Bento Grid (reference: magicui.design/docs/components/bento-grid)
 * — asymmetric card grid where one item can span extra columns/rows for
 * visual hierarchy, instead of a uniform 3-up grid.
 */
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function BentoGrid({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("grid grid-cols-1 lg:grid-cols-3 gap-4", className)}>
      {children}
    </div>
  );
}

export function BentoCard({
  title,
  description,
  icon: Icon,
  examples,
  span = 1,
  className,
}: {
  title: string;
  description: string;
  icon?: React.ElementType;
  examples?: string[];
  span?: 1 | 2;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.4 }}
      className={cn(
        "group relative flex flex-col gap-4 overflow-hidden rounded-2xl border border-black/5 bg-white p-6 shadow-sm transition-shadow hover:shadow-md",
        span === 2 ? "lg:col-span-2" : "",
        className,
      )}
    >
      <div
        className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-emerald-100/60 blur-2xl transition-transform duration-500 group-hover:scale-125"
        aria-hidden
      />
      <div className="relative flex items-center gap-3">
        {Icon && <Icon className="h-6 w-6 text-emerald-600" />}
        <h3 className="text-xl font-semibold text-foreground">{title}</h3>
      </div>
      <p className="relative text-sm text-secondary leading-relaxed">{description}</p>
      {examples && (
        <div className="relative flex flex-wrap gap-2">
          {examples.map((ex) => (
            <span
              key={ex}
              className="rounded-full border border-black/5 bg-slate-50 px-3 py-1 text-xs font-medium text-secondary"
            >
              {ex}
            </span>
          ))}
        </div>
      )}
    </motion.div>
  );
}
