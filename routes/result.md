
---

### 4️⃣ `routes/result.md`

```md
# Route: /result
# Title: Your F1 Mindset Profile

## Goal

Show a **clear, satisfying result** screen that explains:

- The user’s F1-style driver archetype.
- Their trait breakdown.
- How this relates to real life.
- A way to share or retake the quiz.

## Layout

### 1. Header

- Small text: “F1 Mindset Profiler”
- Title: “Your F1-style driver mindset”
- Subtitle: Something like:
  > “Based on how you handle pressure, risk, and teamwork in everyday life.”

### 2. Archetype Card

A prominent card showing:

- Archetype name, e.g. **“The Champion”**.
- Short tagline, e.g. “Calm, consistent, and deadly over a full season.”
- 2–3 bullet points summarizing key traits:
  - “High consistency and strong emotional control.”
  - “You perform best when there is a clear long-term target.”
  - “You rarely panic under pressure; you plan your ‘race’ carefully.”

All archetype descriptions and trait interpretations come from the logic defined in `logic/personality-model.md`.

### 3. Trait Chart

Show a chart with the 5 traits:

- `risk_taking`
- `consistency`
- `emotion_control`
- `teamwork`
- `adaptability`

Chart requirements:

- Could be a radar/spider chart or a bar chart.
- Input: normalized scores in range 0–100.
- Display numeric labels, e.g. “Risk taking: 78/100”.

If using `react-chartjs-2`:

- Load charts only on the client side.
- Keep configuration simple (no heavy plugins).

### 4. Life Insight / Interpretation

A panel that explains how this mindset appears in real life, not just on track.

Example sections:

- **In exams or work**  
  “You’re more of a ‘long-run pace’ person. You build momentum across time instead of relying on last-minute heroics.”

- **Under pressure**  
  “You keep a cool head. You rarely rage-quit; instead you adjust your strategy.”

- **What to watch out for**  
  “Sometimes you may avoid big risks even when they are necessary. Consider running a few ‘practice laps’ with small, safe experiments.”

These texts should be generated from a simple mapping in code:
- For each trait, classify high/mid/low and combine pre-written sentences.

### 5. F1 Flavor

Add a small section:

- Title: **“If you were in an F1 team…”**
- Content:
  - “You’d thrive in a stable top-team environment that rewards long-term consistency.”
  - Or “You’d be the surprise package in changing conditions.”

This mapping also comes from the archetype definition.

### 6. Actions

At the bottom, provide:

- Primary button: **Retake quiz** → `/quiz` (reset state).
- Secondary button: **Copy my summary**.
  - When clicked, copy a text like:

  > “My F1 Mindset Profile: I’m ‘The Champion’ type—high consistency and emotional control, strong teamwork, and medium risk-taking. What’s yours? Try the F1 Mindset Profiler.”

Show a small toast like “Summary copied!” after copying.

## Behavior

- If user lands on `/result` without having taken the quiz:
  - Redirect them to `/quiz`.

- All data should come from client-side state or query parameters.
- No server round-trips or API calls required.
