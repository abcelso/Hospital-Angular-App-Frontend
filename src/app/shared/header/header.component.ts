import { Component } from '@angular/core';
import { Usuario } from 'src/app/models/usuarios.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent {

  user: Usuario;
  img = '';

  constructor(private userService: UserService) {
    this.user = userService.user;
    this.img = this.user.imageUrl;
  }

  logout(): void {
    this.userService.logout();
  }
}
