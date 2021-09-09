import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentModule } from '../components/component.module';

// Components
import { DashboardComponent } from './dashboard/dashboard.component';
import { Page404Component } from './page404/page404.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { ProgressComponent } from './progress/progress.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { ProfileComponent } from './profile/profile.component';
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';



@NgModule({
  declarations: [
    DashboardComponent,
    Page404Component,
    Grafica1Component,
    ProgressComponent,
    AccountSettingsComponent,
    PromesasComponent,
    RxjsComponent,
    ProfileComponent,
    UsuariosComponent,
  ],
  exports: [
    DashboardComponent,
    Page404Component,
    Grafica1Component,
    ProgressComponent,
    AccountSettingsComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ComponentModule,
    ReactiveFormsModule,
  ]
})
export class PagesModule { }
