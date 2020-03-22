import { TestBed, async } from '@angular/core/testing';

import { Observable } from 'rxjs';

import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { NxModule, DataPersistence } from '@nrwl/angular';
import { hot } from '@nrwl/angular/testing';

import { AppStateEffects } from './app-state.effects';
import * as AppStateActions from './app-state.actions';

describe('AppStateEffects', () => {
  let actions: Observable<any>;
  let effects: AppStateEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot()],
      providers: [
        AppStateEffects,
        DataPersistence,
        provideMockActions(() => actions),
        provideMockStore()
      ]
    });

    effects = TestBed.get(AppStateEffects);
  });

  describe('loadAppState$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: AppStateActions.loadAppState() });

      const expected = hot('-a-|', {
        a: AppStateActions.loadAppStateSuccess({ appState: [] })
      });

      expect(effects.loadAppState$).toBeObservable(expected);
    });
  });
});
