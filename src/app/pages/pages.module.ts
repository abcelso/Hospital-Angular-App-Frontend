import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ComponentModule } from '../components/component.module';

// Components
import { DashboardComponent } from './dashboard/dashboard.component';
import { Page404Component } from './page404/page404.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { ProgressComponent } from './progress/progress.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';



@NgModule({
  declarations: [
    DashboardComponent,
    Page404Component,
    Grafica1Component,
    ProgressComponent,
    AccountSettingsComponent,
  ],
  exports: [
    DashboardComponent,
    Page404Component,
    Grafica1Component,
    ProgressComponent,
    AccountSettingsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ComponentModule,
  ]
})
export class PagesModule { }
