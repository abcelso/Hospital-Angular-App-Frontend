import { Component } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(private userService: UserService,
              private router: Router) {

    this.user = userService.user;
    this.img = this.user.imageUrl;
  }

  logout(): void {
    this.userService.logout();
  }

  search(term: string): void {
    let mTerm = ' ';

    if (term.length !== 0){
      mTerm = term;
    }
    console.log(mTerm);
    this.router.navigate(['/dashboard/buscar/', mTerm]);
  }
}
