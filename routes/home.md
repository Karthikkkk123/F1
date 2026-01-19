# Route: /
# Title: F1 Mindset Profiler – Which F1-style driver are you in real life?

## Layout

Use a centered, responsive layout with a dark theme:

- Background: Very dark grey or near-black.
- Accent: Neon red/orange for CTAs and accents (F1 vibes).
- Typography:
  - Big bold title.
  - Medium subtitle.
  - Clear primary button.

## Sections

### 1. Hero

- Heading:  
  **“Which F1 driver’s mindset do you have in real life?”**
- Subheading:  
  “Answer a short quiz about how you handle pressure, risk, and teamwork in everyday life—and we’ll match you to an F1-style driver archetype.”
- Primary button:  
  - Label: **Start quiz**
  - Action: Navigate to `/quiz`.

### 2. How it works

Three simple steps displayed in a horizontal or vertical layout with icons:

1. **Answer 12 quick questions**  
   “About how you react to deadlines, stress, and big decisions.”

2. **We compute your racecraft profile**  
   “Your risk, consistency, emotion control, teamwork, and adaptability.”

3. **Get your driver archetype**  
   “See which F1-style mindset you resemble—and how to use it in real life.”

### 3. Why it’s different

A small section explaining the value and accuracy:

- Title: **“Not just a meme quiz.”**
- Bullets:
  - “Uses a simple but transparent scoring model.”
  - “No personal data stored on any server.”
  - “Everything runs in your browser and is completely free.”

### 4. Call to Action

Repeat the main CTA at the bottom:

- Text: “Ready to take your formation lap?”
- Button: **Start quiz** → `/quiz`.

## Components

- `<PrimaryButton>` — Reusable button used for CTAs.
- `<FeatureRow>` — For the “How it works” section.
- Use simple Tailwind classes for styling.

## Behavior

- On click of “Start quiz”, the quiz state should be initialized (e.g., reset any previous answers) and user navigated to `/quiz`.
