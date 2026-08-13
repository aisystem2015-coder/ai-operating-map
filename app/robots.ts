import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // the control base is password-gated; keep it out of indexes too
      disallow: ["/hotb.html", "/api/", "/ops_state.json"],
    },
    sitemap: "https://aioperatingmappackage.vercel.app/sitemap.xml",
  };
}
