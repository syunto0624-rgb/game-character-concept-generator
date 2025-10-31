
import React from 'react';
import { translations } from '../translations';
import type { Language } from '../types';

interface LoaderProps {
    language: Language;
}

export const Loader: React.FC<LoaderProps> = ({ language }) => {
    const t = translations[language];
    return (
        <div className="flex flex-col items-center justify-center space-y-4">
            <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-brand-primary"></div>
            <p className="text-lg text-dark-text-secondary">{t['loader.message']}</p>
        </div>
    );
};
