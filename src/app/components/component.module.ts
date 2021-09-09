import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';

import { IncrementalComponent } from './incremental/incremental.component';
import { DonaComponent } from './dona/dona.component';
import { ModalImageComponent } from './modal-image/modal-image.component';



@NgModule({
  declarations: [IncrementalComponent, DonaComponent, ModalImageComponent],

  exports: [IncrementalComponent, DonaComponent, ModalImageComponent],

  imports: [
    CommonModule,
    FormsModule,
    ChartsModule
  ],
})

export class ComponentModule { }
