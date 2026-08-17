# AI Operating Map — Claude Onboarding

When Francisco says "Hey, find this" — this is the file you read first.

## What this is

A public-facing Next.js 14 web app. LIVE (current build) at https://aioperatingmappackage.vercel.app/ — that is the project's real production alias and the ONLY one that serves the latest code. NOTE: the older, prettier link https://ai-operating-map.vercel.app/ is a STALE separate deployment stuck on a pre-2026 build (no digital-twins route, no Meet 22/23 rebrand) — never send that link. Reclaiming the `ai-operating-map` subdomain needs a Vercel dashboard action (rename this project to `ai-operating-map`, or add the domain to it).
It is Francisco's authored work on AI systems for operations teams. 344+ visits, 40% from ops professionals.

The core argument: "AI is not a product. It is the reasoning layer inside your system."

The app teaches:
- The Tech: how AI actually works (Transformers + GPUs + Vector DBs)
- Market Reality: why AI stalls — data and mindset are the blockers. Note: the page led on "95% of GenAI pilots fail" for a year; an Ai4 2026 section now corrects that figure (~75% of pilots against a hard ROI test) and reframes the 2026 failure as post-deployment rollback. The 95% claim still appears in the Home hero and Resources — left in place on purpose while Francisco reworks positioning.
- What Works: LLMs as a reasoning layer, surrounding systems create compound value
- AI Mindset: five-layer architecture (Inputs, Reasoning, Orchestration, Tools/Data, Outcomes)
- Execution Checklist: how to act with clarity before committing budgets

## Your first three steps

1. Install and run locally:
   ```bash
   npm install
   npm run dev
   ```
   App runs at http://localhost:3000

2. Open these pages in a browser and read them:
   - / (home — the overview with robot hero and sections)
   - /origins (The Tech tab)
   - /market-reality (the 95% data + expectations gap)
   - /ai-mindset (the mindset shift + five-layer system view)
   - /execution-checklist

3. Read these key files:
   - components/Home.tsx (home page — all sections here)
   - app/layout.tsx (global layout — MayaBanner wired here)
   - components/ folder for all building blocks

## Project structure

```
app/                  — Next.js App Router pages (one folder per route)
  origins/            — The Tech history section
  market-reality/     — The 95% failure data
  ai-mindset/         — Mindset shift + system model
  execution-checklist/— Action layer
  what-works/         — Patterns that scale
  vertical-ai/        — Vertical vs horizontal AI
  why-pilots-fail/    — Root causes
components/           — Reusable UI components
  learning/           — Interactive learning blocks
  market-reality/     — Market data components
  ai-origins/         — History/tech components
  ui/                 — Core UI primitives (SystemViewCard, etc.)
data/                 — Static content data
public/               — Static assets (robot image, logos)
```

## What needs to be updated and improved

This is a living document — Francisco uses it for workshops, pitches, and thesis material.

Likely improvement areas:
- Content: fresher stats, new real-world examples from Logitech operations context
- The robot hero section: confirm it renders correctly, improve if needed
- The five-layer system model: keep it clean and accurate
- New sections Francisco will specify
- MayaBanner text can be updated each session with new context or focus areas

## Rules when editing

- Keep the emerald + white color palette — no other brand colors
- Keep framer-motion animations — do not strip them
- All new components go in components/ with clear names
- Run `npm run build` before packaging to confirm no errors
- No node_modules or .next in any zip or commit

## Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- framer-motion (animations)
- Spline (3D elements — the robot)
- Deployed on Vercel (no git remote locally — push to GitHub before any Vercel redeploy)

## Contact

Francisco Vargas Guevara — fguevara@logitech.com
