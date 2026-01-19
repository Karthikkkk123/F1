# Route: /quiz
# Title: F1 Mindset Quiz

## Goal

Provide a smooth, step-by-step quiz experience with:

- One question per screen.
- A visible progress bar.
- Large, easy-to-tap option cards.
- No page refreshes.

## Layout

- Top:
  - Small logo text or app name (“F1 Mindset Profiler”).
  - A slim progress bar showing how many questions are done.
- Middle:
  - Question text, centered.
  - A short helper subtitle if needed.
- Below:
  - 4 answer options as cards or buttons.
- Bottom:
  - “Back” (if not on first question).
  - “Skip” (optional, but default is no skip for better accuracy).

## Data & Logic

- Import quiz data and scoring config from a local module, read from `logic/personality-model.md`.
- Assume an array of `questions`, each with:
  - `id`
  - `text`
  - `subtitle` (optional)
  - `options`: each with
    - `id`
    - `label`
    - `description` (optional)
    - `weights`: a map of trait deltas, e.g. `{ risk_taking: +8, consistency: -3 }`

Example expected structure (pseudo-TypeScript):

```ts
type TraitKey = "risk_taking" | "consistency" | "emotion_control" | "teamwork" | "adaptability";

interface OptionConfig {
  id: string;
  label: string;
  description?: string;
  weights: Partial<Record<TraitKey, number>>;
}

interface QuestionConfig {
  id: string;
  text: string;
  subtitle?: string;
  options: OptionConfig[];
}
The quiz component should:

Keep track of:

Current question index.

Selected answer for each question (in local state).

On selecting an option:

Save the answer for that question.

Move to the next question with a small animation.

Progress Indicator
Text: “Question X of N”

Progress bar width: X/N * 100%.

Navigation
If user clicks “Back”, go to the previous question and restore the selected option.

If the user reaches the last question and selects an answer:

Compute the final trait scores.

Determine an archetype.

Navigate to /result, passing:

Raw trait scores.

Normalized trait scores.

Selected archetype ID.

State passing can be via:

Router state (e.g., URL query with JSON encoded or history.state), or

A global context provider in React.

If /result is opened without quiz data, redirect back to /quiz.

Accuracy Notes
The quiz must force one selection per question for best accuracy.

If a user tries to leave mid-quiz, no special handling is needed in v1.

sql
Copy code

---