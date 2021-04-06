import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IncrementalComponent } from './incremental/incremental.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [IncrementalComponent],
  exports: [IncrementalComponent],
  imports: [
    CommonModule,
    FormsModule
  ],
})

export class ComponentModule { }
