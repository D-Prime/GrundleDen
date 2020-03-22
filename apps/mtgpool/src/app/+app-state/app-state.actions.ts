import { createAction, props } from '@ngrx/store';
import { AppStateEntity } from './app-state.models';

export const loadAppState = createAction('[AppState] Load AppState');

export const loadAppStateSuccess = createAction(
  '[AppState] Load AppState Success',
  props<{ appState: AppStateEntity[] }>()
);

export const loadAppStateFailure = createAction(
  '[AppState] Load AppState Failure',
  props<{ error: any }>()
);
