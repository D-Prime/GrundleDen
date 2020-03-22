import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as AppStateActions from './app-state.actions';
import { AppStateEntity } from './app-state.models';

export const APPSTATE_FEATURE_KEY = 'appState';

export interface State extends EntityState<AppStateEntity> {
  selectedId?: string | number; // which AppState record has been selected
  loaded: boolean; // has the AppState list been loaded
  error?: string | null; // last none error (if any)
}

export interface AppStatePartialState {
  readonly [APPSTATE_FEATURE_KEY]: State;
}

export const appStateAdapter: EntityAdapter<AppStateEntity> = createEntityAdapter<
  AppStateEntity
>();

export const initialState: State = appStateAdapter.getInitialState({
  // set initial required properties
  loaded: false
});

const appStateReducer = createReducer(
  initialState,
  on(AppStateActions.loadAppState, state => ({
    ...state,
    loaded: false,
    error: null
  })),
  on(AppStateActions.loadAppStateSuccess, (state, { appState }) =>
    appStateAdapter.addAll(appState, { ...state, loaded: true })
  ),
  on(AppStateActions.loadAppStateFailure, (state, { error }) => ({
    ...state,
    error
  }))
);

export function reducer(state: State | undefined, action: Action) {
  return appStateReducer(state, action);
}
