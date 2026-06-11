export type Language = 'en' | 'ar';
export type Theme = 'dark' | 'light';

export interface AppState {
  language: Language;
  theme: Theme;
}

const LANGUAGE_KEY = 'portfolio.language';
const THEME_KEY = 'portfolio.theme';

function readStored(key: string): string | null {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

function detectLanguage(): Language {
  const stored = readStored(LANGUAGE_KEY);
  if (stored === 'en' || stored === 'ar') return stored;
  return (navigator.language || '').toLowerCase().startsWith('ar') ? 'ar' : 'en';
}

function detectTheme(): Theme {
  const stored = readStored(THEME_KEY);
  if (stored === 'dark' || stored === 'light') return stored;
  return window.matchMedia?.('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
}

export function persistPreferences(state: AppState): void {
  try {
    localStorage.setItem(LANGUAGE_KEY, state.language);
    localStorage.setItem(THEME_KEY, state.theme);
  } catch {
    // Storage unavailable (private mode, disabled cookies) — preferences just won't persist.
  }
}

export const initialAppState: AppState = {
  language: detectLanguage(),
  theme: detectTheme()
};
