import en from './locales/en.ts';
import ja from './locales/ja.ts';
import zh from './locales/zh.ts';
import ko from './locales/ko.ts';
import type { Language } from './types';

export const languages: { code: Language, name: string }[] = [
    { code: 'en', name: 'English' },
    { code: 'ja', name: '日本語' },
    { code: 'zh', name: '中文' },
    { code: 'ko', name: '한국어' },
];

export const translations = {
  en,
  ja,
  zh,
  ko,
};