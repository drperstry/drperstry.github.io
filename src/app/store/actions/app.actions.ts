import { createAction, props } from '@ngrx/store';
import { Language, Theme } from '../app.state';

export const setLanguage = createAction(
  '[App] Set Language',
  props<{ language: Language }>()
);

export const setTheme = createAction(
  '[App] Set Theme',
  props<{ theme: Theme }>()
);

export const toggleTheme = createAction('[App] Toggle Theme');
