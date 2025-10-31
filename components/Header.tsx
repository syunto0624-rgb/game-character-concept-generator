
import React from 'react';
import { languages, translations } from '../translations';
import type { Language } from '../types';

interface HeaderProps {
    language: Language;
    setLanguage: (language: Language) => void;
}

export const Header: React.FC<HeaderProps> = ({ language, setLanguage }) => {
  const t = translations[language];

  return (
    <header className="bg-dark-surface shadow-md">
      <div className="container mx-auto px-4 lg:px-8 py-4 flex justify-between items-center">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-dark-text-primary tracking-tight">
            {t['header.title.part1']} <span className="text-brand-secondary">{t['header.title.part2']}</span>
          </h1>
          <p className="text-sm text-dark-text-secondary mt-1">{t['header.subtitle']}</p>
        </div>
        <div className="relative">
            <select
                aria-label={t['header.selectLanguage']}
                value={language}
                onChange={(e) => setLanguage(e.target.value as Language)}
                className="bg-dark-surface border border-dark-border rounded-md p-2 focus:ring-2 focus:ring-brand-primary focus:border-brand-primary transition duration-200 text-dark-text-primary"
            >
                {languages.map(({ code, name }) => (
                    <option key={code} value={code}>
                        {name}
                    </option>
                ))}
            </select>
        </div>
      </div>
    </header>
  );
};
