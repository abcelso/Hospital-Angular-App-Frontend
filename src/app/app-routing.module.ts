import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { Page404Component } from './pages/page404/page404.component';
import { PagesroutingModule } from './pages/pages.routing';

const routes: Routes = [

  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '**', component: Page404Component },
];


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes),
    PagesroutingModule
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
