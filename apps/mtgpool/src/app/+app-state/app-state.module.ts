import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { AppStateFacade } from './app-state.facade';
import { AppStateEffects } from './app-state.effects';
import * as fromApp from './app-state.reducer';

@NgModule({
  imports: [
    StoreModule.forFeature(fromApp.APPSTATE_FEATURE_KEY, fromApp.reducer),
    EffectsModule.forFeature([AppStateEffects])
  ],
  providers: [AppStateFacade]
})
export class AppStateModule {}
