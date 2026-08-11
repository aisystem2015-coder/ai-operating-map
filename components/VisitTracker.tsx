"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

// Pings /api/track on each page view so the Health of the Business dashboard
// gets real visitor analytics (country/city/hour by IP, from Vercel geo headers).
// Skips the HOTB itself and its data file.
export default function VisitTracker() {
  const pathname = usePathname();
  useEffect(() => {
    if (pathname?.startsWith("/hotb")) return;
    fetch("/api/track", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ path: pathname, referrer: document.referrer || "" }),
      keepalive: true,
    }).catch(() => {});
  }, [pathname]);
  return null;
}
