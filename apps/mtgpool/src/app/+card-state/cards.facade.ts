import { Injectable } from '@angular/core';

import { select, Store, Action } from '@ngrx/store';

import * as fromCards from './cards.reducer';
import * as CardsSelectors from './cards.selectors';
import * as CardActions from './cards.actions';
import { ICard } from '../models';

@Injectable()
export class CardsFacade {
  loaded$ = this.store.pipe(select(CardsSelectors.getCardsLoaded));
  allCards$ = this.store.pipe(select(CardsSelectors.getAllCards));
  selectedCards$ = this.store.pipe(select(CardsSelectors.getSelected));
  getCardGen$ = this.store.pipe(select(CardsSelectors.getCardGen));

  constructor(private store: Store<fromCards.CardsPartialState>) {}

  dispatch(action: Action) {
    this.store.dispatch(action);
  }

  updateCardGen(cardFormData: ICard) {
    this.store.dispatch(CardActions.updateCardGen({ cardFormData }));
  }
}
