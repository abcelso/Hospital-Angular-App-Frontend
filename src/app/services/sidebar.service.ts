import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu = [
    {
      title: 'Dashboard',
      icon: 'mdi mdi-gauge',
      submenu: [
        {
          title: 'Principal',
          path: '/'
        },
        {
          title: 'ProgressBar',
          path: 'progress'
        },
        {
          title: 'Graficas',
          path: 'grafica1'
        },

      ]
    }
  ];

  constructor() { }
}
