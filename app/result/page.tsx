'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import PrimaryButton from '@/components/PrimaryButton';
import TraitChart from '@/components/TraitChart';
import { generateShareText, getTraitLabel } from '@/lib/quiz-engine';
import { getMatchedDriver } from '@/lib/driver-mapping';
import type { TraitVector, Archetype } from '@/lib/personality-model';
import type { Driver } from '@/lib/driver-mapping';
import driversData from '@/data/drivers.json';

export default function ResultPage() {
    const router = useRouter();
    const [result, setResult] = useState<{ traits: TraitVector; archetype: Archetype } | null>(null);
    const [matchedDriver, setMatchedDriver] = useState<Driver | null>(null);
    const [showToast, setShowToast] = useState(false);

    useEffect(() => {
        // Load result from sessionStorage
        const stored = sessionStorage.getItem('quizResult');
        if (stored) {
            const parsedResult = JSON.parse(stored);
            setResult(parsedResult);

            // Match driver based on archetype
            const driver = getMatchedDriver(parsedResult.archetype, driversData as Driver[]);
            setMatchedDriver(driver);
        } else {
            // Redirect to quiz if no data
            router.push('/quiz');
        }
    }, [router]);

    const handleCopyShare = () => {
        if (result) {
            const shareText = generateShareText(result.archetype, result.traits);
            navigator.clipboard.writeText(shareText);
            setShowToast(true);
            setTimeout(() => setShowToast(false), 3000);
        }
    };

    const handleRetake = () => {
        sessionStorage.removeItem('quizResult');
        router.push('/quiz');
    };

    if (!result) {
        return (
            <main className="min-h-screen bg-gradient-to-b from-f1-darker via-f1-dark to-f1-darker flex items-center justify-center">
                <div className="text-white text-xl">Loading...</div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-gradient-to-b from-f1-darker via-f1-dark to-f1-darker">
            <div className="container mx-auto px-4 py-16 max-w-5xl">

                {/* Header */}
                <div className="text-center mb-12 animate-fade-in">
                    <p className="text-sm text-gray-400 mb-2">F1 Mindset Profiler</p>
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        Your F1-style driver mindset
                    </h1>
                    <p className="text-gray-300 text-lg">
                        Based on how you handle pressure, risk, and teamwork in everyday life.
                    </p>
                </div>

                {/* Archetype Card */}
                <section className="mb-12 bg-gradient-to-br from-f1-red/20 to-f1-orange/20 border-2 border-f1-neon rounded-2xl p-8 md:p-12 shadow-2xl shadow-f1-neon/20 animate-fade-in">
                    <h2 className="text-4xl md:text-5xl font-black text-white mb-3">
                        {result.archetype.name}
                    </h2>
                    <p className="text-xl md:text-2xl text-f1-neon mb-6 font-semibold">
                        {result.archetype.tagline}
                    </p>
                    <ul className="space-y-3 text-gray-200 text-lg">
                        {result.archetype.insights.map((insight, idx) => (
                            <li key={idx} className="flex items-start">
                                <span className="text-f1-neon mr-3 text-xl">•</span>
                                <span>{insight}</span>
                            </li>
                        ))}
                    </ul>
                </section>

                {/* Driver Profile */}
                {matchedDriver && (
                    <section className="mb-12 bg-white/5 border border-white/10 rounded-2xl p-8 md:p-12 animate-fade-in">
                        <h3 className="text-2xl md:text-3xl font-bold text-white mb-6 text-center">
                            You're most like...
                        </h3>
                        <div className="flex flex-col md:flex-row items-center gap-8">
                            <div className="relative w-64 h-64 flex-shrink-0">
                                <Image
                                    src={matchedDriver.image_url}
                                    alt={matchedDriver.name}
                                    fill
                                    className="object-contain"
                                    unoptimized
                                />
                            </div>
                            <div className="flex-1 text-center md:text-left">
                                <div className="text-6xl font-black text-f1-neon mb-2">
                                    #{matchedDriver.number}
                                </div>
                                <h4 className="text-3xl md:text-4xl font-bold text-white mb-2">
                                    {matchedDriver.name}
                                </h4>
                                <p className="text-xl text-gray-300 mb-4">
                                    {matchedDriver.team}
                                </p>
                                <p className="text-gray-400">
                                    🏁 {matchedDriver.nationality}
                                </p>
                            </div>
                        </div>
                    </section>
                )}

                {/* Trait Chart */}
                <section className="mb-12 bg-white/5 border border-white/10 rounded-2xl p-8 md:p-12">
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-8 text-center">
                        Your Trait Breakdown
                    </h3>
                    <TraitChart traits={result.traits} />

                    {/* Trait Values */}
                    <div className="mt-8 grid grid-cols-2 md:grid-cols-5 gap-4">
                        {Object.entries(result.traits).map(([key, value]) => (
                            <div key={key} className="text-center">
                                <div className="text-f1-neon font-bold text-2xl">{Math.round(value)}</div>
                                <div className="text-gray-400 text-sm">{getTraitLabel(key as keyof TraitVector)}</div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* F1 Team Fit */}
                <section className="mb-12 bg-white/5 border border-white/10 rounded-2xl p-8">
                    <h3 className="text-2xl font-bold text-white mb-4">
                        If you were in an F1 team…
                    </h3>
                    <p className="text-gray-300 text-lg">
                        {result.archetype.team_fit}
                    </p>
                </section>

                {/* Actions */}
                <section className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <PrimaryButton onClick={handleRetake}>
                        Retake Quiz
                    </PrimaryButton>
                    <button
                        onClick={handleCopyShare}
                        className="px-8 py-4 rounded-lg font-bold text-lg border-2 border-f1-neon text-f1-neon hover:bg-f1-neon/10 transition-all duration-200"
                    >
                        Copy My Summary
                    </button>
                </section>

                {/* Toast Notification */}
                {showToast && (
                    <div className="fixed bottom-8 right-8 bg-f1-neon text-white px-6 py-3 rounded-lg shadow-lg animate-slide-in">
                        Summary copied!
                    </div>
                )}
            </div>
        </main>
    );
}
