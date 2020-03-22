import { NgModule } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';

const matrialModules = [MatMenuModule];

@NgModule({
  declarations: [],
  imports: [...matrialModules],
  exports: [...matrialModules]
})
export class NgMaterialModule {}
