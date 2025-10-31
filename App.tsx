
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { GeneratorForm } from './components/GeneratorForm';
import { ImageGrid } from './components/ImageGrid';
import { generateCharacterImages } from './services/geminiService';
import type { GeneratorFormState, Language } from './types';

const App: React.FC = () => {
  const [generatedImages, setGeneratedImages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [language, setLanguage] = useState<Language>('ja');

  const handleGenerate = useCallback(async (formState: GeneratorFormState) => {
    setIsLoading(true);
    setError(null);
    setGeneratedImages([]);
    try {
      const images = await generateCharacterImages(formState);
      setGeneratedImages(images);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message); // The service already provides a good message
      } else {
        setError('An unknown error occurred.');
      }
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <div className="min-h-screen bg-dark-bg font-sans">
      <Header language={language} setLanguage={setLanguage} />
      <main className="container mx-auto p-4 lg:p-8">
        <div className="flex flex-col lg:flex-row lg:space-x-8">
          <div className="lg:w-1/3 xl:w-1/4 mb-8 lg:mb-0">
            <GeneratorForm onSubmit={handleGenerate} isLoading={isLoading} language={language} />
          </div>
          <div className="lg:w-2/3 xl:w-3/4">
            <ImageGrid 
              images={generatedImages} 
              isLoading={isLoading} 
              error={error} 
              language={language}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
