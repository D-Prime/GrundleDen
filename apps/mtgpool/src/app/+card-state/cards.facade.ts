import { Injectable } from '@angular/core';

import { select, Store, Action } from '@ngrx/store';

import * as fromCards from './cards.reducer';
import * as CardsSelectors from './cards.selectors';

@Injectable()
export class CardsFacade {
  loaded$ = this.store.pipe(select(CardsSelectors.getCardsLoaded));
  allCards$ = this.store.pipe(select(CardsSelectors.getAllCards));
  selectedCards$ = this.store.pipe(select(CardsSelectors.getSelected));

  constructor(private store: Store<fromCards.CardsPartialState>) {}

  dispatch(action: Action) {
    this.store.dispatch(action);
  }
}
