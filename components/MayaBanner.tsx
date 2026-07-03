"use client";

export default function MayaBanner() {
  return (
    <div className="fixed top-0 inset-x-0 z-[60] h-10 flex items-center justify-center bg-emerald-600 px-4 shadow-sm">
      <p className="truncate text-center text-sm font-semibold tracking-wide text-white">
        AI Operating Map v2 · Updated July 2026 · 14 sections · Live on Vercel
      </p>
    </div>
  );
}
