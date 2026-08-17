import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // Francisco's canonical personal-brand palette (Brand Manual 2026-08-14).
      // Retired: #1BC4A6 (old AI Operating Map teal), #6366f1 (generic-AI indigo).
      // "Business Architect for the AI Era" — deep navy ink + signal blue.
      colors: {
        background: "#fafaf7", // paper — off-white page ground
        foreground: "#0a1838", // ink — primary text, headings, logo
        secondary: "#2a3654", // ink_soft — secondary text
        accent: "#2563eb", // signal_blue — links, buttons, eyebrows
        warm: "#d4956a", // editorial accent, used sparingly
        card: "rgba(255, 255, 255, 0.9)",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        heading: ["var(--font-manrope)", "system-ui", "sans-serif"],
      },
      backdropBlur: {
        xs: "2px",
      },
      keyframes: {
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(calc(-100% - var(--gap)))" },
        },
        "marquee-vertical": {
          from: { transform: "translateY(0)" },
          to: { transform: "translateY(calc(-100% - var(--gap)))" },
        },
        "shimmer-slide": {
          from: { backgroundPosition: "200% 0" },
          to: { backgroundPosition: "-50% 0" },
        },
        "border-beam": {
          "100%": { "offset-distance": "100%" },
        },
      },
      animation: {
        marquee: "marquee var(--duration) linear infinite",
        "marquee-vertical": "marquee-vertical var(--duration) linear infinite",
        "shimmer-slide": "shimmer-slide 2.5s ease-in-out infinite",
        "border-beam": "border-beam calc(var(--duration)*1s) infinite linear",
      },
    },
  },
  plugins: [],
};
export default config;




