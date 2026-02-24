import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from '../app.state';

export const selectAppState = createFeatureSelector<AppState>('app');

export const selectLanguage = createSelector(selectAppState, (state) => state.language);
export const selectTheme = createSelector(selectAppState, (state) => state.theme);
export const selectIsArabic = createSelector(selectAppState, (state) => state.language === 'ar');
export const selectIsDark = createSelector(selectAppState, (state) => state.theme === 'dark');
