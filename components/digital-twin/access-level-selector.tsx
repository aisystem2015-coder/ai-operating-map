"use client";

/**
 * Dev/QA access-level selector (job 2, Meet 17 ask). Francisco watched
 * the widget correctly refuse a personal question at level 0 and asked
 * for a way to verify the other levels gate correctly too, without a
 * real auth/token system existing yet. This is exactly that: a visible,
 * clearly-labeled toggle — not real auth, not hidden, not meant to look
 * like a production feature. Selecting a level sets the `x-dt-qa` header
 * on the next chat request (see use-twin-chat.ts / app/api/twin-chat/
 * route.ts), which is the only thing that lets the API raise its answer
 * ceiling above the public default of level 1.
 */
import { ShieldAlert } from "lucide-react";

export const ACCESS_LEVELS = [
  { level: 0, label: "0 · Public", detail: "What a stranger gets by default." },
  { level: 1, label: "1 · Shareable", detail: "Public default for this widget." },
  { level: 2, label: "2 · Private", detail: "Day-to-day notes, unfiltered." },
  { level: 3, label: "3 · Sensitive", detail: "Operational, guarded." },
  { level: 4, label: "4 · Intimate", detail: "Never auto-surfaced." },
] as const;

export default function AccessLevelSelector({
  value,
  onChange,
}: {
  value: number;
  onChange: (level: number) => void;
}) {
  return (
    <div className="rounded-xl border border-amber-300/60 bg-amber-50 px-3 py-2.5 space-y-2">
      <div className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-amber-800">
        <ShieldAlert className="h-3.5 w-3.5" aria-hidden />
        QA only — not real auth
      </div>
      <div className="flex flex-wrap gap-1.5" role="radiogroup" aria-label="Preview access level (QA)">
        {ACCESS_LEVELS.map((opt) => {
          const isActive = value === opt.level;
          return (
            <button
              key={opt.level}
              type="button"
              role="radio"
              aria-checked={isActive}
              title={opt.detail}
              onClick={() => onChange(opt.level)}
              className={`cursor-pointer rounded-full px-2.5 py-1 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-1 ${
                isActive
                  ? "bg-amber-500 text-white"
                  : "bg-white text-amber-800 border border-amber-300/70 hover:bg-amber-100"
              }`}
            >
              {opt.label}
            </button>
          );
        })}
      </div>
      <p className="text-[11px] leading-snug text-amber-800/80">
        Previewing how the twin answers at this level. The public widget always defaults to level 1 — this
        toggle only affects your own testing session.
      </p>
    </div>
  );
}
