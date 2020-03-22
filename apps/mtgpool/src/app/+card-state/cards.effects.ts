import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';

import * as fromCards from './cards.reducer';
import * as CardsActions from './cards.actions';

@Injectable()
export class CardsEffects {
  loadCards$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CardsActions.loadCards),
      fetch({
        run: action => {
          // Your custom service 'load' logic goes here. For now just return a success action...
          return CardsActions.loadCardsSuccess({ cards: [] });
        },

        onError: (action, error) => {
          console.error('Error', error);
          return CardsActions.loadCardsFailure({ error });
        }
      })
    )
  );

  constructor(private actions$: Actions) {}
}
