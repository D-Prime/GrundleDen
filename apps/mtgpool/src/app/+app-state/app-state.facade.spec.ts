import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { readFirst } from '@nrwl/angular/testing';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';

import { NxModule } from '@nrwl/angular';

import { AppStateEntity } from './app-state.models';
import { AppStateEffects } from './app-state.effects';
import { AppStateFacade } from './app-state.facade';

import * as AppStateSelectors from './app-state.selectors';
import * as AppStateActions from './app-state.actions';
import {
  APPSTATE_FEATURE_KEY,
  State,
  initialState,
  reducer
} from './app-state.reducer';

interface TestSchema {
  appState: State;
}

describe('AppStateFacade', () => {
  let facade: AppStateFacade;
  let store: Store<TestSchema>;
  const createAppStateEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`
    } as AppStateEntity);

  beforeEach(() => {});

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(APPSTATE_FEATURE_KEY, reducer),
          EffectsModule.forFeature([AppStateEffects])
        ],
        providers: [AppStateFacade]
      })
      class CustomFeatureModule {}

      @NgModule({
        imports: [
          NxModule.forRoot(),
          StoreModule.forRoot({}),
          EffectsModule.forRoot([]),
          CustomFeatureModule
        ]
      })
      class RootModule {}
      TestBed.configureTestingModule({ imports: [RootModule] });

      store = TestBed.get(Store);
      facade = TestBed.get(AppStateFacade);
    });

    /**
     * The initially generated facade::loadAll() returns empty array
     */
    it('loadAll() should return empty list with loaded == true', async done => {
      try {
        let list = await readFirst(facade.allAppState$);
        let isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(false);

        facade.dispatch(AppStateActions.loadAppState());

        list = await readFirst(facade.allAppState$);
        isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(true);

        done();
      } catch (err) {
        done.fail(err);
      }
    });

    /**
     * Use `loadAppStateSuccess` to manually update list
     */
    it('allAppState$ should return the loaded list; and loaded flag == true', async done => {
      try {
        let list = await readFirst(facade.allAppState$);
        let isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(false);

        facade.dispatch(
          AppStateActions.loadAppStateSuccess({
            appState: [createAppStateEntity('AAA'), createAppStateEntity('BBB')]
          })
        );

        list = await readFirst(facade.allAppState$);
        isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(2);
        expect(isLoaded).toBe(true);

        done();
      } catch (err) {
        done.fail(err);
      }
    });
  });
});
