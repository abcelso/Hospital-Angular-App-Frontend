import { SidebarService } from './../../services/sidebar.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {

  menuItems: any[] = [];
  lista = ['hola', 'asdasd'];

  constructor(private sidebarService: SidebarService) {
      this.menuItems = this.sidebarService.menu;
      console.log(this.menuItems[0].title);
   }

  ngOnInit(): void {
  }

}
