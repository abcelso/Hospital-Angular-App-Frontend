import { SidebarService } from './../../services/sidebar.service';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Usuario } from 'src/app/models/usuarios.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {

  menuItems: any[] = [];
  lista = ['hola', 'asdasd'];
  img = '';
  user: Usuario;

  constructor(private sidebarService: SidebarService,
              private userService: UserService) {

      this.menuItems = this.sidebarService.menu;

      console.log(this.menuItems);

      this.user = userService.user;
      this.img = this.user.imageUrl;

      console.log(this.menuItems[0].title);
   }

  ngOnInit(): void {
  }

}
