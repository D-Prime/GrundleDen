import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as CardsActions from './cards.actions';
import { CardsEntity } from './cards.models';
import { ICard, CardRarity } from '@MTGPool/models';

export const CARDS_FEATURE_KEY = 'cards';

export interface State extends EntityState<CardsEntity> {
  selectedId?: string | number; // which Cards record has been selected
  loaded: boolean; // has the Cards list been loaded
  error?: string | null; // last none error (if any)
  cardGen: ICard;
}

export interface CardsPartialState {
  readonly [CARDS_FEATURE_KEY]: State;
}

export const cardsAdapter: EntityAdapter<CardsEntity> = createEntityAdapter<
  CardsEntity
>();

export const initialState: State = cardsAdapter.getInitialState({
  // set initial required properties
  loaded: false,
  cardGen: {
    name: null,
    manaCost: null,
    type: null,
    subtype: null,
    expansion: null,
    rarity: CardRarity.Common,
    textbox: null,
    power: null,
    toughness: null,
    creator: null,
    copyright: null,
    foil: false
  }
});

const cardsReducer = createReducer(
  initialState,
  on(CardsActions.loadCards, state => ({
    ...state,
    loaded: false,
    error: null
  })),
  on(CardsActions.loadCardsSuccess, (state, { cards }) =>
    cardsAdapter.setAll(cards, { ...state, loaded: true })
  ),
  on(CardsActions.loadCardsFailure, (state, { error }) => ({
    ...state,
    error
  })),
  // ^ ^ ^ Boilerplate ^ ^ ^
  on(CardsActions.updateCardGen, (state, { cardFormData }) => ({
    ...state,
    cardGen: {
      ...state.cardGen,
      ...cardFormData
    }
  }))
);

export function reducer(state: State | undefined, action: Action) {
  return cardsReducer(state, action);
}
