import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CardContainerComponent } from '@MTGPool/components';

const routes: Routes = [
  { path: 'home', component: CardContainerComponent },
  { path: '**', redirectTo: 'home' }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes, { initialNavigation: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
