
import React from 'react';
import { Loader } from './Loader';
import { translations } from '../translations';
import type { Language } from '../types';

interface ImageGridProps {
  images: string[];
  isLoading: boolean;
  error: string | null;
  language: Language;
}

const Placeholder: React.FC<{ language: Language }> = ({ language }) => {
    const t = translations[language];
    return (
        <div className="flex flex-col items-center justify-center h-full text-center p-8 border-2 border-dashed border-dark-border rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <h3 className="text-xl font-semibold text-dark-text-primary">{t['grid.placeholder.title']}</h3>
            <p className="text-dark-text-secondary mt-2">{t['grid.placeholder.description']}</p>
        </div>
    );
};

export const ImageGrid: React.FC<ImageGridProps> = ({ images, isLoading, error, language }) => {
  const t = translations[language];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader language={language} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-96 bg-red-900/20 border border-red-500 text-red-300 p-4 rounded-lg">
        <p>{t['grid.error.prefix']}{error}</p>
      </div>
    );
  }

  if (images.length === 0) {
    return <Placeholder language={language} />;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4">
      {images.map((src, index) => (
        <div key={index} className="bg-dark-surface p-2 rounded-lg shadow-lg overflow-hidden animate-fade-in">
          <img 
            src={src} 
            alt={`Generated character ${index + 1}`} 
            className="w-full h-auto object-contain rounded-md" 
          />
        </div>
      ))}
      <style>{`
        @keyframes fade-in {
          0% { opacity: 0; transform: translateY(10px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
};
