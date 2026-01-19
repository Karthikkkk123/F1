'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import ProgressBar from '@/components/ProgressBar';
import QuizOption from '@/components/QuizOption';
import { questions } from '@/lib/personality-model';
import { computeTraits, findBestArchetype } from '@/lib/quiz-engine';
import type { Answer } from '@/lib/quiz-engine';

export default function QuizPage() {
    const router = useRouter();
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState<Answer[]>([]);
    const [selectedOption, setSelectedOption] = useState<string | null>(null);

    const currentQuestion = questions[currentQuestionIndex];
    const isFirstQuestion = currentQuestionIndex === 0;
    const isLastQuestion = currentQuestionIndex === questions.length - 1;

    const handleOptionSelect = (optionId: string) => {
        setSelectedOption(optionId);

        // Save answer
        const newAnswers = [
            ...answers.filter(a => a.questionId !== currentQuestion.id),
            { questionId: currentQuestion.id, optionId }
        ];
        setAnswers(newAnswers);

        // Auto-advance after a short delay
        setTimeout(() => {
            if (isLastQuestion) {
                // Compute results and navigate
                const traits = computeTraits(newAnswers);
                const archetype = findBestArchetype(traits);

                // Store in sessionStorage for result page
                sessionStorage.setItem('quizResult', JSON.stringify({ traits, archetype }));
                router.push('/result');
            } else {
                // Move to next question
                setCurrentQuestionIndex(prev => prev + 1);
                setSelectedOption(null);
            }
        }, 300);
    };

    const handleBack = () => {
        if (!isFirstQuestion) {
            setCurrentQuestionIndex(prev => prev - 1);
            const previousAnswer = answers.find(a => a.questionId === questions[currentQuestionIndex - 1].id);
            setSelectedOption(previousAnswer?.optionId || null);
        }
    };

    return (
        <main className="min-h-screen bg-gradient-to-b from-f1-darker via-f1-dark to-f1-darker">
            <div className="container mx-auto px-4 py-8 max-w-4xl">

                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-2xl font-bold text-f1-neon mb-4">F1 Mindset Profiler</h1>
                    <ProgressBar current={currentQuestionIndex + 1} total={questions.length} />
                </div>

                {/* Question */}
                <div className="animate-slide-in">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 text-center">
                        {currentQuestion.text}
                    </h2>
                    {currentQuestion.subtitle && (
                        <p className="text-gray-400 text-center mb-8">{currentQuestion.subtitle}</p>
                    )}

                    {/* Options */}
                    <div className="space-y-4 mb-8">
                        {currentQuestion.options.map((option) => (
                            <QuizOption
                                key={option.id}
                                label={option.label}
                                description={option.description}
                                selected={selectedOption === option.id}
                                onClick={() => handleOptionSelect(option.id)}
                            />
                        ))}
                    </div>

                    {/* Navigation */}
                    {!isFirstQuestion && (
                        <div className="flex justify-center">
                            <button
                                onClick={handleBack}
                                className="px-6 py-3 text-gray-400 hover:text-white transition-colors"
                            >
                                ← Back
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}
