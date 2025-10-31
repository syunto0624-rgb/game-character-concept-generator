
import React, { useState } from 'react';
import type { GeneratorFormState, ImageStyle, Language } from '../types';
import { SparklesIcon } from './icons/SparklesIcon';
import { translations } from '../translations';

interface GeneratorFormProps {
  onSubmit: (formState: GeneratorFormState) => void;
  isLoading: boolean;
  language: Language;
}

export const GeneratorForm: React.FC<GeneratorFormProps> = ({ onSubmit, isLoading, language }) => {
  const t = translations[language];

  const [formState, setFormState] = useState<GeneratorFormState>({
    gameDescription: '',
    characterDescription: '',
    imageStyle: 'standing',
    pixelSize: 64,
    numImages: 2,
  });

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormState(prevState => ({
      ...prevState,
      [name]: name === 'numImages' || name === 'pixelSize' ? parseInt(value, 10) : value,
    }));
  };
  
  const handleStyleChange = (style: ImageStyle) => {
    setFormState(prevState => ({ ...prevState, imageStyle: style }));
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(formState);
  };

  const commonInputClasses = "w-full bg-dark-surface border border-dark-border rounded-md p-3 focus:ring-2 focus:ring-brand-primary focus:border-brand-primary transition duration-200 text-dark-text-primary placeholder-gray-500";
  const labelClasses = "block text-sm font-medium text-dark-text-secondary mb-2";

  return (
    <form onSubmit={handleSubmit} className="bg-dark-surface p-6 rounded-lg shadow-lg space-y-6">
      <div>
        <label htmlFor="gameDescription" className={labelClasses}>{t['form.gameTheme.label']}</label>
        <textarea
          id="gameDescription"
          name="gameDescription"
          value={formState.gameDescription}
          onChange={handleChange}
          rows={3}
          className={commonInputClasses}
          placeholder={t['form.gameTheme.placeholder']}
          required
        />
      </div>
      <div>
        <label htmlFor="characterDescription" className={labelClasses}>{t['form.characterDetails.label']}</label>
        <textarea
          id="characterDescription"
          name="characterDescription"
          value={formState.characterDescription}
          onChange={handleChange}
          rows={5}
          className={commonInputClasses}
          placeholder={t['form.characterDetails.placeholder']}
          required
        />
      </div>
      <div>
        <label className={labelClasses}>{t['form.imageStyle.label']}</label>
        <div className="grid grid-cols-2 gap-2">
            <button type="button" onClick={() => handleStyleChange('standing')} className={`p-3 rounded-md text-sm font-semibold transition ${formState.imageStyle === 'standing' ? 'bg-brand-primary text-white' : 'bg-gray-600 hover:bg-gray-500'}`}>
                {t['form.imageStyle.standing']}
            </button>
            <button type="button" onClick={() => handleStyleChange('pixel')} className={`p-3 rounded-md text-sm font-semibold transition ${formState.imageStyle === 'pixel' ? 'bg-brand-primary text-white' : 'bg-gray-600 hover:bg-gray-500'}`}>
                {t['form.imageStyle.pixel']}
            </button>
        </div>
      </div>
      
      {formState.imageStyle === 'pixel' && (
        <div>
            <label htmlFor="pixelSize" className={labelClasses}>{t['form.pixelSize.label']}</label>
            <select id="pixelSize" name="pixelSize" value={formState.pixelSize} onChange={handleChange} className={commonInputClasses}>
                <option value="16">16x16</option>
                <option value="32">32x32</option>
                <option value="64">64x64</option>
                <option value="128">128x128</option>
            </select>
        </div>
      )}

      <div>
        <label htmlFor="numImages" className={labelClasses}>
          {t['form.numImages.label'].replace('{numImages}', String(formState.numImages))}
        </label>
        <input
          type="range"
          id="numImages"
          name="numImages"
          min="1"
          max="4"
          value={formState.numImages}
          onChange={handleChange}
          className="w-full h-2 bg-dark-border rounded-lg appearance-none cursor-pointer accent-brand-secondary"
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full flex items-center justify-center bg-brand-primary hover:bg-purple-700 text-white font-bold py-3 px-4 rounded-md transition duration-300 disabled:bg-gray-500 disabled:cursor-not-allowed"
      >
        <SparklesIcon className="w-5 h-5 mr-2" />
        {isLoading ? t['form.button.generating'] : t['form.button.generate']}
      </button>
    </form>
  );
};
