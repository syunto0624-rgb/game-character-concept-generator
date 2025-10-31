
export type ImageStyle = 'standing' | 'pixel';
export type Language = 'en' | 'ja' | 'zh' | 'ko';

export interface GeneratorFormState {
  gameDescription: string;
  characterDescription: string;
  imageStyle: ImageStyle;
  pixelSize: number;
  numImages: number;
}
