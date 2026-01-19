import React from 'react';

interface PrimaryButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    disabled?: boolean;
    className?: string;
}

export default function PrimaryButton({ children, onClick, disabled, className = '' }: PrimaryButtonProps) {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`
        px-8 py-4 rounded-lg font-bold text-lg
        bg-gradient-to-r from-f1-red to-f1-orange
        text-white
        hover:scale-105 active:scale-95
        transition-all duration-200
        disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
        shadow-lg hover:shadow-f1-neon/50
        ${className}
      `}
        >
            {children}
        </button>
    );
}
