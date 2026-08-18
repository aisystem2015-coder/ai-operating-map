import type { MetadataRoute } from "next";

const BASE = "https://aioperatingmappackage.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "", "/profile", "/book", "/origins", "/market-reality", "/what-works",
    "/what-works/digital-twins", "/ai-mindset", "/execution-checklist",
    "/how-to-prompt", "/ai-now-2026", "/resources", "/ai-map", "/vertical-ai",
    "/case-studies",
  ];
  const now = new Date();
  return routes.map((r) => ({
    url: `${BASE}${r}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: r === "" ? 1 : r === "/profile" ? 0.9 : 0.7,
  }));
}
