import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';

import * as fromAppState from './app-state.reducer';
import * as AppStateActions from './app-state.actions';

@Injectable()
export class AppStateEffects {
  loadAppState$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AppStateActions.loadAppState),
      fetch({
        run: action => {
          // Your custom service 'load' logic goes here. For now just return a success action...
          return AppStateActions.loadAppStateSuccess({ appState: [] });
        },

        onError: (action, error) => {
          console.error('Error', error);
          return AppStateActions.loadAppStateFailure({ error });
        }
      })
    )
  );

  constructor(private actions$: Actions) {}
}
