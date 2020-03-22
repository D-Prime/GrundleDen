import { Injectable } from '@angular/core';

import { select, Store, Action } from '@ngrx/store';

import * as fromAppState from './app-state.reducer';
import * as AppStateSelectors from './app-state.selectors';

@Injectable()
export class AppStateFacade {
  loaded$ = this.store.pipe(select(AppStateSelectors.getAppStateLoaded));
  allAppState$ = this.store.pipe(select(AppStateSelectors.getAllAppState));
  selectedAppState$ = this.store.pipe(select(AppStateSelectors.getSelected));

  constructor(private store: Store<fromAppState.AppStatePartialState>) {}

  dispatch(action: Action) {
    this.store.dispatch(action);
  }
}
