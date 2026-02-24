import { createReducer, on } from '@ngrx/store';
import { setLanguage, setTheme, toggleTheme } from '../actions/app.actions';
import { AppState, initialAppState, Theme } from '../app.state';

export const appReducer = createReducer(
  initialAppState,
  on(setLanguage, (state, { language }) => ({ ...state, language })),
  on(setTheme, (state, { theme }) => ({ ...state, theme })),
  on(toggleTheme, (state) => ({
    ...state,
    theme: (state.theme === 'dark' ? 'light' : 'dark') as Theme
  }))
);
