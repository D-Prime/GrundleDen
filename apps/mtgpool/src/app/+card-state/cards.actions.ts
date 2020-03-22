import { createAction, props } from '@ngrx/store';
import { CardsEntity } from './cards.models';

export const loadCards = createAction('[Cards] Load Cards');

export const loadCardsSuccess = createAction(
  '[Cards] Load Cards Success',
  props<{ cards: CardsEntity[] }>()
);

export const loadCardsFailure = createAction(
  '[Cards] Load Cards Failure',
  props<{ error: any }>()
);
