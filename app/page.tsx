'use client';

import Link from 'next/link';
import PrimaryButton from '@/components/PrimaryButton';
import FeatureRow from '@/components/FeatureRow';

export default function Home() {
    return (
        <main className="min-h-screen bg-gradient-to-b from-f1-darker via-f1-dark to-f1-darker">
            <div className="container mx-auto px-4 py-16 max-w-6xl">

                {/* Hero Section */}
                <section className="text-center mb-20 animate-fade-in">
                    <h1 className="text-5xl md:text-7xl font-black mb-6 bg-gradient-to-r from-f1-red via-f1-orange to-f1-red bg-clip-text text-transparent leading-tight">
                        Which F1 driver&apos;s mindset do you have in real life?
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed">
                        Answer a short quiz about how you handle pressure, risk, and teamwork in everyday life—and we&apos;ll match you to an F1-style driver archetype.
                    </p>
                    <Link href="/quiz">
                        <PrimaryButton>Start Quiz</PrimaryButton>
                    </Link>
                </section>

                {/* How it works */}
                <section className="mb-20">
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-white">
                        How it works
                    </h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        <FeatureRow
                            icon="📝"
                            title="Answer 12 quick questions"
                            description="About how you react to deadlines, stress, and big decisions."
                        />
                        <FeatureRow
                            icon="🧮"
                            title="We compute your racecraft profile"
                            description="Your risk, consistency, emotion control, teamwork, and adaptability."
                        />
                        <FeatureRow
                            icon="🏎️"
                            title="Get your driver archetype"
                            description="See which F1-style mindset you resemble—and how to use it in real life."
                        />
                    </div>
                </section>

                {/* Why it's different */}
                <section className="mb-20 bg-white/5 border border-white/10 rounded-2xl p-10">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
                        Not just a meme quiz.
                    </h2>
                    <ul className="space-y-4 text-lg text-gray-300">
                        <li className="flex items-start">
                            <span className="text-f1-neon mr-3 text-2xl">✓</span>
                            <span>Uses a simple but transparent scoring model.</span>
                        </li>
                        <li className="flex items-start">
                            <span className="text-f1-neon mr-3 text-2xl">✓</span>
                            <span>No personal data stored on any server.</span>
                        </li>
                        <li className="flex items-start">
                            <span className="text-f1-neon mr-3 text-2xl">✓</span>
                            <span>Everything runs in your browser and is completely free.</span>
                        </li>
                    </ul>
                </section>

                {/* Bottom CTA */}
                <section className="text-center">
                    <p className="text-2xl mb-6 text-gray-300">
                        Ready to take your formation lap?
                    </p>
                    <Link href="/quiz">
                        <PrimaryButton>Start Quiz</PrimaryButton>
                    </Link>
                </section>
            </div>
        </main>
    );
}
