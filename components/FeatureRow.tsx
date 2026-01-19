import React from 'react';

interface FeatureRowProps {
    icon: string;
    title: string;
    description: string;
}

export default function FeatureRow({ icon, title, description }: FeatureRowProps) {
    return (
        <div className="flex flex-col items-center text-center p-6 bg-white/5 rounded-lg border border-white/10 hover:border-f1-neon/50 transition-colors">
            <div className="text-4xl mb-4">{icon}</div>
            <h3 className="text-xl font-bold mb-2 text-white">{title}</h3>
            <p className="text-gray-400">{description}</p>
        </div>
    );
}
