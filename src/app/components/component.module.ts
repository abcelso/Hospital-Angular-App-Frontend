import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';

import { IncrementalComponent } from './incremental/incremental.component';
import { DonaComponent } from './dona/dona.component';



@NgModule({
  declarations: [IncrementalComponent, DonaComponent],
  exports: [IncrementalComponent, DonaComponent],
  imports: [
    CommonModule,
    FormsModule,
    ChartsModule
  ],
})

export class ComponentModule { }
