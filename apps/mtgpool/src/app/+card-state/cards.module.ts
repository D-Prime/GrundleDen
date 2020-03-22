import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { CardsFacade } from './cards.facade';
import { CardsEffects } from './cards.effects';
import * as fromCards from './cards.reducer';

@NgModule({
  imports: [
    StoreModule.forFeature(fromCards.CARDS_FEATURE_KEY, fromCards.reducer),
    EffectsModule.forFeature([CardsEffects])
  ],
  providers: [CardsFacade]
})
export class CardsStateModule {}
