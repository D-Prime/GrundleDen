import { createAction, props } from '@ngrx/store';
import { CardsEntity } from './cards.models';
import { ICard } from '../models';

export const loadCards = createAction('[Cards] Load Cards');

export const loadCardsSuccess = createAction(
  '[Cards] Load Cards Success',
  props<{ cards: CardsEntity[] }>()
);

export const loadCardsFailure = createAction(
  '[Cards] Load Cards Failure',
  props<{ error: any }>()
);

// ^ ^ ^ Boilerplate ^ ^ ^

export const updateCardGen = createAction(
  '[Cards] Update Card Gen',
  props<{ cardFormData: ICard }>()
);
