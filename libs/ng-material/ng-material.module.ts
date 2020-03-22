import { NgModule } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

const materialModules = [MatMenuModule, MatCardModule, MatFormFieldModule];
const materialFormControlModules = [MatInputModule, MatSelectModule];

@NgModule({
  declarations: [],
  imports: [...materialModules, ...materialFormControlModules],
  exports: [...materialModules, ...materialFormControlModules]
})
export class NgMaterialModule {}
