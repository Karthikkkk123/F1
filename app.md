# App: F1 Mindset Profiler

## Goal

Build a **fully free, frontend-only F1 personality web app** that maps a user's real-life behavior to F1-style driver archetypes.

The app should:
- Run 100% in the browser (no backend, no paid APIs).
- Be super fast, mobile-first, and easy to deploy on Vercel.
- Use a clear, deterministic scoring model (no randomness).
- Feel premium and fun, but still give meaningful insights.

## Tech & Architecture

- Framework: Next.js + React.
- Styling: Tailwind CSS.
- State: React hooks + URL/query params or router state.
- Charts: A small client-side chart library (e.g. `react-chartjs-2` + `chart.js`) or a custom SVG radar/bar chart.
- Data:
  - Quiz questions and scoring config live in a local TypeScript/JSON file.
  - No database, analytics, or tracking in v1.

All logic for computing the result happens on the client side.

## Core Screens

1. **Home (/)** — Landing page with hero section and CTA to start quiz.
2. **Quiz (/quiz)** — Multi-step quiz with a progress bar.
3. **Result (/result)** — Shows archetype, trait breakdown, chart, and share button.

## Design & UX

- Dark theme inspired by an F1 night race (dark background, neon accent).
- Large, tap-friendly cards for answers.
- Smooth transitions between questions.
- Clear progress indicator (e.g., “Question 4 of 12”).
- Copyable result summary for sharing.

## Personality Model

We will use a deterministic, vector-based model defined in `logic/personality-model.md`:

- Traits:
  - `risk_taking`
  - `consistency`
  - `emotion_control`
  - `teamwork`
  - `adaptability`

- Process:
  - Each question has 4 options.
  - Each option contributes fixed deltas to these traits.
  - Final scores are normalized to 0–100.
  - The app compares the user’s trait vector to a set of predefined archetype vectors and picks the closest one.

No real driver names or images required: use **archetypes** like:
- “The Champion”
- “The Quali Specialist”
- “The Dark Horse Strategist”
- “The Chaos Attacker”
- “The Ice-Cold Defender”

We can optionally display “Inspired by drivers like X/Y” in plain text without logos or copyrighted imagery.

## Accessibility & Performance

- Use semantic HTML.
- Ensure high contrast and good font sizes.
- No heavy external scripts.
- Prefer static assets and static generation (no server rendering requirements beyond default).

## Free Deployment

- Should work as a static Next.js app, easily deployable on:
  - Vercel free tier (preferred)
  - or Netlify free tier.
- No env vars needed for v1.
- No external API keys required.

## Files Overview

- `routes/home.md` — Landing page spec.
- `routes/quiz.md` — Quiz UI and flow spec.
- `routes/result.md` — Result UI and chart spec.
- `logic/personality-model.md` — Questions, scoring, and archetype logic.

Use those markdown files to generate React components and tie them together via Next.js routing and shared state.
