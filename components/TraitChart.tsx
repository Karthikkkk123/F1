'use client';

import React from 'react';
import {
    Chart as ChartJS,
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';
import { TraitVector } from '@/lib/personality-model';
import { getTraitLabel } from '@/lib/quiz-engine';

ChartJS.register(
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend
);

interface TraitChartProps {
    traits: TraitVector;
}

export default function TraitChart({ traits }: TraitChartProps) {
    const data = {
        labels: Object.keys(traits).map(key => getTraitLabel(key as keyof TraitVector)),
        datasets: [
            {
                label: 'Your Traits',
                data: Object.values(traits),
                backgroundColor: 'rgba(255, 30, 0, 0.2)',
                borderColor: 'rgba(255, 30, 0, 1)',
                borderWidth: 2,
                pointBackgroundColor: 'rgba(255, 69, 0, 1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(255, 30, 0, 1)',
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: true,
        scales: {
            r: {
                min: 0,
                max: 100,
                ticks: {
                    stepSize: 20,
                    color: '#9ca3af',
                    backdropColor: 'transparent',
                },
                grid: {
                    color: 'rgba(255, 255, 255, 0.1)',
                },
                pointLabels: {
                    color: '#ffffff',
                    font: {
                        size: 14,
                        weight: 'bold' as const,
                    },
                },
            },
        },
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                callbacks: {
                    label: function (context: any) {
                        return `${context.label}: ${context.parsed.r}/100`;
                    },
                },
            },
        },
    };

    return (
        <div className="w-full max-w-md mx-auto">
            <Radar data={data} options={options} />
        </div>
    );
}
