import { AppStateEntity } from './app-state.models';
import * as AppStateActions from './app-state.actions';
import { State, initialState, reducer } from './app-state.reducer';

describe('AppState Reducer', () => {
  const createAppStateEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`
    } as AppStateEntity);

  beforeEach(() => {});

  describe('valid AppState actions', () => {
    it('loadAppStateSuccess should return set the list of known AppState', () => {
      const appState = [
        createAppStateEntity('PRODUCT-AAA'),
        createAppStateEntity('PRODUCT-zzz')
      ];
      const action = AppStateActions.loadAppStateSuccess({ appState });

      const result: State = reducer(initialState, action);

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(2);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
