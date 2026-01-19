import React from 'react';

interface QuizOptionProps {
    label: string;
    description?: string;
    selected: boolean;
    onClick: () => void;
}

export default function QuizOption({ label, description, selected, onClick }: QuizOptionProps) {
    return (
        <button
            onClick={onClick}
            className={`
        w-full p-6 rounded-lg text-left
        border-2 transition-all duration-200
        ${selected
                    ? 'border-f1-neon bg-f1-neon/10 shadow-lg shadow-f1-neon/30'
                    : 'border-white/20 bg-white/5 hover:border-f1-neon/50 hover:bg-white/10'
                }
      `}
        >
            <div className="text-white font-semibold text-lg mb-1">{label}</div>
            {description && (
                <div className="text-gray-400 text-sm">{description}</div>
            )}
        </button>
    );
}
