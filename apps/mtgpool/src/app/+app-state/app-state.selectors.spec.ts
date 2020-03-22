import { AppStateEntity } from './app-state.models';
import { State, appStateAdapter, initialState } from './app-state.reducer';
import * as AppStateSelectors from './app-state.selectors';

describe('AppState Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getAppStateId = it => it['id'];
  const createAppStateEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`
    } as AppStateEntity);

  let state;

  beforeEach(() => {
    state = {
      appState: appStateAdapter.addAll(
        [
          createAppStateEntity('PRODUCT-AAA'),
          createAppStateEntity('PRODUCT-BBB'),
          createAppStateEntity('PRODUCT-CCC')
        ],
        {
          ...initialState,
          selectedId: 'PRODUCT-BBB',
          error: ERROR_MSG,
          loaded: true
        }
      )
    };
  });

  describe('AppState Selectors', () => {
    it('getAllAppState() should return the list of AppState', () => {
      const results = AppStateSelectors.getAllAppState(state);
      const selId = getAppStateId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getSelected() should return the selected Entity', () => {
      const result = AppStateSelectors.getSelected(state);
      const selId = getAppStateId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it("getAppStateLoaded() should return the current 'loaded' status", () => {
      const result = AppStateSelectors.getAppStateLoaded(state);

      expect(result).toBe(true);
    });

    it("getAppStateError() should return the current 'error' state", () => {
      const result = AppStateSelectors.getAppStateError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
