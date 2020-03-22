import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  APPSTATE_FEATURE_KEY,
  State,
  AppStatePartialState,
  appStateAdapter
} from './app-state.reducer';

// Lookup the 'AppState' feature state managed by NgRx
export const getAppStateState = createFeatureSelector<
  AppStatePartialState,
  State
>(APPSTATE_FEATURE_KEY);

const { selectAll, selectEntities } = appStateAdapter.getSelectors();

export const getAppStateLoaded = createSelector(
  getAppStateState,
  (state: State) => state.loaded
);

export const getAppStateError = createSelector(
  getAppStateState,
  (state: State) => state.error
);

export const getAllAppState = createSelector(getAppStateState, (state: State) =>
  selectAll(state)
);

export const getAppStateEntities = createSelector(
  getAppStateState,
  (state: State) => selectEntities(state)
);

export const getSelectedId = createSelector(
  getAppStateState,
  (state: State) => state.selectedId
);

export const getSelected = createSelector(
  getAppStateEntities,
  getSelectedId,
  (entities, selectedId) => selectedId && entities[selectedId]
);
