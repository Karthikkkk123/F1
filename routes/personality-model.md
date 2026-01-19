# Logic: F1 Mindset Personality Model

This file defines:

1. The trait system.
2. Archetype definitions.
3. Quiz questions and option weights.
4. The algorithm for computing the result.

It should be implemented as a local TypeScript/JavaScript module imported by `/quiz` and `/result`.

---

## 1. Traits

Use five core traits, each scored from 0 to 100:

- `risk_taking`: comfort with risk and aggressive moves.
- `consistency`: ability to maintain performance over time.
- `emotion_control`: ability to stay calm and composed under stress.
- `teamwork`: willingness to work for the “team result” vs just personal glory.
- `adaptability`: flexibility when plans change (e.g., weather, strategy shifts).

Internally, we can start each trait at **50** and then add/subtract deltas per answer, then normalize and clamp between 0 and 100.

---

## 2. Archetypes

Define 5 archetypes with target trait profiles.

Each archetype has:
- `id`
- `name`
- `tagline`
- `description`
- `traits` (target values 0–100)
- `insights` (short bullet strings)
- `team_fit` (one or two lines)

Example config (pseudo-TS):

```ts
const archetypes = [
  {
    id: "champion",
    name: "The Champion",
    tagline: "Calm, consistent, and deadly across a full season.",
    traits: {
      risk_taking: 60,
      consistency: 90,
      emotion_control: 90,
      teamwork: 75,
      adaptability: 70,
    },
    insights: [
      "You treat life like a full championship, not just a single race.",
      "You rarely panic; you trust your preparation and long-term plan.",
    ],
    team_fit: "You’d thrive in a top team that rewards discipline and long-run pace.",
  },
  {
    id: "quali_specialist",
    name: "The Quali Specialist",
    tagline: "Explosive one-lap pace, streaky over a season.",
    traits: {
      risk_taking: 85,
      consistency: 55,
      emotion_control: 60,
      teamwork: 55,
      adaptability: 65,
    },
    insights: [
      "You’re great at short bursts of focus and last-minute pushes.",
      "You might burn a lot of energy in ‘qualifying laps’ and need to manage your tyres over the long run.",
    ],
    team_fit: "You’d shine in high-pressure, short-deadline environments.",
  },
  {
    id: "strategist",
    name: "The Dark Horse Strategist",
    tagline: "Always thinking two pit stops ahead.",
    traits: {
      risk_taking: 50,
      consistency: 80,
      emotion_control: 80,
      teamwork: 80,
      adaptability: 75,
    },
    insights: [
      "You love having a plan and adjusting it as the race evolves.",
      "You value smart decisions more than raw speed.",
    ],
    team_fit: "You’d be the backbone of a team that wins through strategy and execution.",
  },
  {
    id: "attacker",
    name: "The Chaos Attacker",
    tagline: "Overtaking whenever you see half a gap.",
    traits: {
      risk_taking: 90,
      consistency: 45,
      emotion_control: 50,
      teamwork: 60,
      adaptability: 80,
    },
    insights: [
      "You thrive in chaos and big swings.",
      "Sometimes you push too hard and have a ‘DNF’ when a P5 was possible.",
    ],
    team_fit: "You’d light up midfield battles and changing conditions.",
  },
  {
    id: "defender",
    name: "The Ice-Cold Defender",
    tagline: "Hard to pass, hard to shake.",
    traits: {
      risk_taking: 40,
      consistency: 85,
      emotion_control: 85,
      teamwork: 70,
      adaptability: 60,
    },
    insights: [
      "You’re stable and hard to rattle.",
      "You focus on not making mistakes rather than taking huge gambles.",
    ],
    team_fit: "You’d be a key points-scorer, always bringing the car home.",
  },
] as const;


The app should pick the archetype with the smallest Euclidean distance between the user’s final trait vector and the archetype’s trait vector.

3. Quiz Questions & Weights

Use ~12 questions. Each question has 4 options. Each option adjusts traits slightly.

Implementation hint:

Start all traits at 50.

For each answer, add the option’s weights to the running totals.

After all questions, normalize each trait:

Option 1: Just clamp to [0, 100].

Option 2: Divide by number of questions and scale into [0,100] range.

Keep it simple and deterministic.

Example data (you can encode this as JSON/TS in code):

const questions: QuestionConfig[] = [
  {
    id: "q1",
    text: "A big exam or deadline is 2 weeks away. What’s your usual approach?",
    options: [
      {
        id: "q1a",
        label: "I make a plan and start early, even if it’s not perfect.",
        weights: { consistency: +8, emotion_control: +4, risk_taking: -2 },
      },
      {
        id: "q1b",
        label: "I start a bit late but ramp up steadily.",
        weights: { consistency: +3, risk_taking: +1 },
      },
      {
        id: "q1c",
        label: "I wait until the last few days and then go full send.",
        weights: { risk_taking: +8, consistency: -5 },
      },
      {
        id: "q1d",
        label: "I do minimal prep and trust improvisation.",
        weights: { risk_taking: +5, adaptability: +4, consistency: -6 },
      },
    ],
  },
  {
    id: "q2",
    text: "Something goes wrong early in your day (plan ruined, unexpected issue). How do you react?",
    options: [
      {
        id: "q2a",
        label: "Stay calm, adjust the plan, and keep going.",
        weights: { emotion_control: +8, adaptability: +6 },
      },
      {
        id: "q2b",
        label: "I get annoyed but recover after a bit.",
        weights: { emotion_control: +2, adaptability: +3 },
      },
      {
        id: "q2c",
        label: "I tilt for a while and lose focus.",
        weights: { emotion_control: -6, consistency: -4 },
      },
      {
        id: "q2d",
        label: "I pivot completely and do something totally different.",
        weights: { adaptability: +8, consistency: -3 },
      },
    ],
  },
  {
    id: "q3",
    text: "In group projects or team work, what’s your natural role?",
    options: [
      {
        id: "q3a",
        label: "The planner – I organize tasks and timelines.",
        weights: { teamwork: +6, consistency: +5, emotion_control: +2 },
      },
      {
        id: "q3b",
        label: "The finisher – I make sure things are done correctly.",
        weights: { teamwork: +5, consistency: +7 },
      },
      {
        id: "q3c",
        label: "The wild card – I bring big ideas, even if not all work.",
        weights: { risk_taking: +6, adaptability: +4, consistency: -3 },
      },
      {
        id: "q3d",
        label: "The soloist – I prefer doing things my way.",
        weights: { teamwork: -5, risk_taking: +3 },
      },
    ],
  },
  {
    id: "q4",
    text: "You’re offered a risky opportunity with big upside but a real chance of failure. What do you do?",
    options: [
      {
        id: "q4a",
        label: "I analyze it deeply, then take it if the odds are good.",
        weights: { risk_taking: +5, emotion_control: +3 },
      },
      {
        id: "q4b",
        label: "I prefer a safer option, even if the upside is smaller.",
        weights: { risk_taking: -4, consistency: +4 },
      },
      {
        id: "q4c",
        label: "I take it quickly – you miss 100% of the chances you don’t take.",
        weights: { risk_taking: +8, consistency: -2 },
      },
      {
        id: "q4d",
        label: "I wait and see what others do first.",
        weights: { teamwork: +2, risk_taking: -2, adaptability: -1 },
      },
    ],
  },
  {
    id: "q5",
    text: "When you make a mistake in something important, what usually happens next?",
    options: [
      {
        id: "q5a",
        label: "I reset mentally and focus on damage limitation.",
        weights: { emotion_control: +8, consistency: +3 },
      },
      {
        id: "q5b",
        label: "I over-push to immediately fix it, sometimes making things worse.",
        weights: { risk_taking: +5, emotion_control: -4 },
      },
      {
        id: "q5c",
        label: "I need some time to cool down before I can continue.",
        weights: { emotion_control: -3, adaptability: +2 },
      },
      {
        id: "q5d",
        label: "I step back, rethink the whole approach, and then continue.",
        weights: { adaptability: +6, consistency: +2 },
      },
    ],
  },
  {
    id: "q6",
    text: "How do you usually work on long-term goals (fitness, learning, big projects)?",
    options: [
      {
        id: "q6a",
        label: "Steady laps – a little bit almost every day.",
        weights: { consistency: +8 },
      },
      {
        id: "q6b",
        label: "I work in waves – big effort, then rest, then big effort again.",
        weights: { consistency: +1, risk_taking: +3 },
      },
      {
        id: "q6c",
        label: "Intense sprints when deadlines appear.",
        weights: { risk_taking: +5, consistency: -3 },
      },
      {
        id: "q6d",
        label: "I want to, but I struggle to stay on any routine.",
        weights: { consistency: -6, adaptability: +2 },
      },
    ],
  },
  {
    id: "q7",
    text: "In a conflict or argument, what’s closest to you?",
    options: [
      {
        id: "q7a",
        label: "I stay calm, listen, and try to find a solution.",
        weights: { emotion_control: +7, teamwork: +5 },
      },
      {
        id: "q7b",
        label: "I strongly defend my point, but don’t lose control.",
        weights: { emotion_control: +3, risk_taking: +3 },
      },
      {
        id: "q7c",
        label: "I sometimes say things I regret later.",
        weights: { emotion_control: -6, risk_taking: +4 },
      },
      {
        id: "q7d",
        label: "I avoid the conflict and let it fade.",
        weights: { teamwork: -2, emotion_control: +1 },
      },
    ],
  },
  {
    id: "q8",
    text: "Plans suddenly change (like a surprise ‘safety car’ in your day). How do you respond?",
    options: [
      {
        id: "q8a",
        label: "I quickly adapt and look for a new best plan.",
        weights: { adaptability: +8 },
      },
      {
        id: "q8b",
        label: "I follow whatever the group decides.",
        weights: { teamwork: +4, adaptability: +2 },
      },
      {
        id: "q8c",
        label: "I get stressed because my original plan is ruined.",
        weights: { emotion_control: -5, consistency: -2 },
      },
      {
        id: "q8d",
        label: "I ignore the changes and try to continue as planned anyway.",
        weights: { consistency: +3, adaptability: -5 },
      },
    ],
  },
  {
    id: "q9",
    text: "You’re slightly behind on a goal. What’s your instinct?",
    options: [
      {
        id: "q9a",
        label: "Stick to the plan; slowly reel it back.",
        weights: { consistency: +6, emotion_control: +3 },
      },
      {
        id: "q9b",
        label: "Take a bold shortcut to catch up fast.",
        weights: { risk_taking: +7, adaptability: +3 },
      },
      {
        id: "q9c",
        label: "Reduce the target to something safer.",
        weights: { risk_taking: -4, emotion_control: +1 },
      },
      {
        id: "q9d",
        label: "Drop it and look for a new goal.",
        weights: { adaptability: +5, consistency: -4 },
      },
    ],
  },
  {
    id: "q10",
    text: "How do you feel about relying on others for success?",
    options: [
      {
        id: "q10a",
        label: "I like working with a strong team around me.",
        weights: { teamwork: +7 },
      },
      {
        id: "q10b",
        label: "I’m okay with it, but I prefer control over my part.",
        weights: { teamwork: +3 },
      },
      {
        id: "q10c",
        label: "I’d rather depend almost entirely on myself.",
        weights: { teamwork: -4, risk_taking: +2 },
      },
      {
        id: "q10d",
        label: "I feel uncomfortable both leading and depending on others.",
        weights: { teamwork: -3, emotion_control: -2 },
      },
    ],
  },
  {
    id: "q11",
    text: "On a good day when everything clicks, which feels most like you?",
    options: [
      {
        id: "q11a",
        label: "Calm, smooth, and in control from start to finish.",
        weights: { consistency: +7, emotion_control: +6 },
      },
      {
        id: "q11b",
        label: "Explosive focus – I smash through tasks quickly.",
        weights: { risk_taking: +4, adaptability: +3 },
      },
      {
        id: "q11c",
        label: "Creative – I find new paths or ideas.",
        weights: { adaptability: +6, risk_taking: +3 },
      },
      {
        id: "q11d",
        label: "Supportive – I help others succeed too.",
        weights: { teamwork: +7 },
      },
    ],
  },
  {
    id: "q12",
    text: "How do you handle long periods where effort doesn’t immediately show results?",
    options: [
      {
        id: "q12a",
        label: "I trust the process and keep going.",
        weights: { consistency: +8, emotion_control: +4 },
      },
      {
        id: "q12b",
        label: "I adjust my strategy but keep pushing.",
        weights: { adaptability: +6, consistency: +3 },
      },
      {
        id: "q12c",
        label: "I get frustrated and slow down.",
        weights: { emotion_control: -4, consistency: -3 },
      },
      {
        id: "q12d",
        label: "I switch to something with quicker rewards.",
        weights: { adaptability: +4, risk_taking: +3, consistency: -5 },
      },
    ],
  },
];

4. Algorithm

Initialize trait scores:

let traits = {
  risk_taking: 50,
  consistency: 50,
  emotion_control: 50,
  teamwork: 50,
  adaptability: 50,
};


For each answered question:

for (const answer of answers) {
  // find option config
  const option = findOptionById(answer.optionId);
  for (const [traitKey, delta] of Object.entries(option.weights)) {
    traits[traitKey as TraitKey] += delta;
  }
}


Normalize & clamp:

for (const key of Object.keys(traits) as TraitKey[]) {
  traits[key] = Math.max(0, Math.min(100, traits[key]));
}


Compute distance to each archetype (Euclidean):

function distance(a: TraitVector, b: TraitVector): number {
  let sum = 0;
  for (const key of Object.keys(a) as TraitKey[]) {
    const diff = a[key] - b[key];
    sum += diff * diff;
  }
  return Math.sqrt(sum);
}

const bestArchetype = archetypes.reduce((best, current) => {
  const d = distance(traits, current.traits);
  if (!best || d < best.distance) {
    return { archetype: current, distance: d };
  }
  return best;
}, null as null | { archetype: Archetype; distance: number });


Output for /result:

traits: object with 5 traits (0–100).

archetype: bestArchetype.archetype.

Use this to:

Populate the archetype card.

Fill the trait chart.

Generate human-readable insights from pre-written templates.

This model is:

Transparent,

Deterministic,

Free to run in the browser, and

Tunable later if you want to adjust weights or archetype target vectors.

