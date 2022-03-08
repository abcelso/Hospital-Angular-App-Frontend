import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../guards/auth.guard';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { ProgressComponent } from './progress/progress.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { ProfileComponent } from './profile/profile.component';
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import { MedicosComponent } from './mantenimientos/medicos/medicos.component';
import { HospitalesComponent } from './mantenimientos/hospitales/hospitales.component';
import { MedicoComponent } from './mantenimientos/medicos/medico.component';
import { SearchComponent } from './search/search.component';

const routes: Routes = [
  { path: 'dashboard',
    component: PagesComponent, canActivate: [AuthGuard],
    children: [
      { path: '', component: DashboardComponent, data: { pageName: 'Dashboard' }},
      { path: 'account-settings', component: AccountSettingsComponent, data: { pageName: 'Temas' } },
      { path: 'buscar/:termino', component: SearchComponent, data: { pageName: 'Buscar médicos, hospitales o usuarios' } },
      { path: 'grafica1', component: Grafica1Component, data: { pageName: 'Grafica1' } },
      { path: 'progress', component: ProgressComponent, data: { pageName: 'Progress' } },
      { path: 'promesas', component: PromesasComponent, data: { pageName: 'Promesas' } },
      { path: 'profile', component: ProfileComponent, data: { pageName: 'Profile' }},
      { path: 'rxjs', component: RxjsComponent, data: { pageName: 'Rxjs' } },

      // Mantenimiento
      {  path: 'hospitales', component: HospitalesComponent, data: { pageName: 'Mantenimiento de Hospitales'} },
      {  path: 'medicos', component: MedicosComponent, data: { pageName: 'Mantenimiento de Médicos'} },
      {  path: 'medico/:text', component: MedicoComponent, data: { pageName: 'Mantenimiento de Médicos'} },
      {  path: 'usuarios', component: UsuariosComponent, data: { pageName: 'Mantenimiento de Usuarios'} },
    ]
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
