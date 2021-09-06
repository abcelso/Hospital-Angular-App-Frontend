import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuarios.model';
import { UserService } from 'src/app/services/user.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [
  ]
})
export class UsuariosComponent implements OnInit {

  users: Usuario[] = [];
  totalUsers: number;
  desde = 0;
  loading = true;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.loading = true;
    this.userService.loadUsers(this.desde)
      .subscribe( ({cuenta, user}) => {
        this.users = user;
        this.totalUsers = cuenta;
        this.loading = false;
        console.log(this.users);
      });
  }

  changePage(value: number): void {
    if (this.desde > 0 && value < 0){
      this.desde += value;
      console.log(this.desde);

    }else if (this.desde < this.totalUsers && value > 0) {
      this.desde += value;
      console.log(this.desde);
    }

    this.loadUsers();
  }

}
