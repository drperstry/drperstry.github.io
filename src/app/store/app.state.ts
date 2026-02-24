export type Language = 'en' | 'ar';
export type Theme = 'dark' | 'light';

export interface AppState {
  language: Language;
  theme: Theme;
}

export const initialAppState: AppState = {
  language: 'en',
  theme: 'dark'
};
