"use client";

/**
 * "Want your own?" interest capture, ported from digital_twin_site and
 * re-skinned to emerald. Client-side only by design — see
 * app/api/twin-waitlist/route.ts: never sends a real email, just appends
 * {name, email, ts} to a local JSON file in the AI_Lab repo.
 */
import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Check, Loader2 } from "lucide-react";

type Status = "idle" | "submitting" | "done" | "error";

export default function WaitlistForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const reduceMotion = useReducedMotion();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || status === "submitting") return;
    setStatus("submitting");
    try {
      const res = await fetch("/api/twin-waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), email: email.trim() }),
      });
      if (!res.ok) throw new Error("bad response");
      setStatus("done");
    } catch {
      setStatus("error");
    }
  };

  if (status === "done") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-3 rounded-2xl border border-white/15 bg-white/5 px-6 py-5"
      >
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-indigo-400">
          <Check className="h-5 w-5 text-indigo-950" />
        </span>
        <p className="text-sm text-white/90 leading-relaxed">
          Thanks, noted — we&apos;ll reach out when there&apos;s something to try. No spam, just an update
          when this becomes a real product.
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
      <label className="sr-only" htmlFor="dt-waitlist-name">Your name</label>
      <input
        id="dt-waitlist-name"
        type="text"
        required
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Your name"
        className="flex-1 min-h-[44px] rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-indigo-300"
      />
      <label className="sr-only" htmlFor="dt-waitlist-email">Your email</label>
      <input
        id="dt-waitlist-email"
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@email.com"
        className="flex-1 min-h-[44px] rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-indigo-300"
      />
      <motion.button
        type="submit"
        disabled={status === "submitting"}
        whileHover={reduceMotion || status === "submitting" ? undefined : { scale: 1.03 }}
        whileTap={reduceMotion || status === "submitting" ? undefined : { scale: 0.97 }}
        className="min-h-[44px] shrink-0 cursor-pointer rounded-xl bg-indigo-400 px-6 py-2.5 text-sm font-semibold text-indigo-950 shadow-sm disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-offset-2"
      >
        {status === "submitting" && <Loader2 className="h-4 w-4 animate-spin" />}
        {status === "submitting" ? "Sending…" : "Count me in"}
      </motion.button>
      {status === "error" && (
        <p className="sm:absolute sm:mt-14 text-xs text-rose-300">Something went wrong — mind trying again?</p>
      )}
    </form>
  );
}
