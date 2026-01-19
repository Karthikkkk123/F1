import { TraitKey, TraitVector, Archetype, archetypes, questions } from './personality-model';

export interface Answer {
    questionId: string;
    optionId: string;
}

export interface QuizResult {
    traits: TraitVector;
    archetype: Archetype;
}

// Compute trait scores from answers
export function computeTraits(answers: Answer[]): TraitVector {
    // Initialize all traits at 50
    const traits: TraitVector = {
        risk_taking: 50,
        consistency: 50,
        emotion_control: 50,
        teamwork: 50,
        adaptability: 50,
    };

    // Apply weights from each answer
    for (const answer of answers) {
        const question = questions.find(q => q.id === answer.questionId);
        if (!question) continue;

        const option = question.options.find(o => o.id === answer.optionId);
        if (!option) continue;

        // Add deltas to traits
        for (const [traitKey, delta] of Object.entries(option.weights)) {
            if (delta !== undefined) {
                traits[traitKey as TraitKey] += delta;
            }
        }
    }

    // Normalize and clamp to [0, 100]
    for (const key of Object.keys(traits) as TraitKey[]) {
        traits[key] = Math.max(0, Math.min(100, traits[key]));
    }

    return traits;
}

// Calculate Euclidean distance between two trait vectors
function distance(a: TraitVector, b: TraitVector): number {
    let sum = 0;
    for (const key of Object.keys(a) as TraitKey[]) {
        const diff = a[key] - b[key];
        sum += diff * diff;
    }
    return Math.sqrt(sum);
}

// Find the best matching archetype
export function findBestArchetype(traits: TraitVector): Archetype {
    let bestArchetype = archetypes[0];
    let bestDistance = distance(traits, archetypes[0].traits);

    for (const archetype of archetypes) {
        const d = distance(traits, archetype.traits);
        if (d < bestDistance) {
            bestDistance = d;
            bestArchetype = archetype;
        }
    }

    return bestArchetype;
}

// Generate shareable text summary
export function generateShareText(archetype: Archetype, traits: TraitVector): string {
    const traitDescriptions: string[] = [];

    if (traits.consistency >= 70) traitDescriptions.push('high consistency');
    if (traits.emotion_control >= 70) traitDescriptions.push('strong emotional control');
    if (traits.teamwork >= 70) traitDescriptions.push('strong teamwork');
    if (traits.risk_taking >= 70) traitDescriptions.push('high risk-taking');
    if (traits.adaptability >= 70) traitDescriptions.push('high adaptability');

    const traitText = traitDescriptions.length > 0
        ? traitDescriptions.join(', ')
        : 'balanced traits';

    return `My F1 Mindset Profile: I'm '${archetype.name}' type—${traitText}. What's yours? Try the F1 Mindset Profiler.`;
}

// Classify trait level
export function classifyTrait(value: number): 'high' | 'mid' | 'low' {
    if (value >= 70) return 'high';
    if (value >= 40) return 'mid';
    return 'low';
}

// Get trait label
export function getTraitLabel(key: TraitKey): string {
    const labels: Record<TraitKey, string> = {
        risk_taking: 'Risk Taking',
        consistency: 'Consistency',
        emotion_control: 'Emotion Control',
        teamwork: 'Teamwork',
        adaptability: 'Adaptability',
    };
    return labels[key];
}
