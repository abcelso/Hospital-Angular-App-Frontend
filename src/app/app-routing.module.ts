import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthRoutingModule } from './auth/auth.routing';
import { PagesRoutingModule } from './pages/pages.routing';

import { Page404Component } from './pages/page404/page404.component';

const routes: Routes = [

  // path: /dashboard - En pages.routing.ts
  // path: /auth - En auth.routing.ts

  { path: '**', component: Page404Component },
];


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes),
    PagesRoutingModule,
    AuthRoutingModule
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
