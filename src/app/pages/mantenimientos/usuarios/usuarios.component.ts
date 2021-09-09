import { Component, OnDestroy, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuarios.model';
import { UserService } from 'src/app/services/user.service';
import { delay, filter, map } from 'rxjs/operators';
import { SearchService } from 'src/app/services/search.service';
import Swal from 'sweetalert2';
import { ModalImageService } from 'src/app/services/modal-image.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [
  ]
})
export class UsuariosComponent implements OnInit, OnDestroy {

  users: Usuario[] = [];
  usersTemp: Usuario[] = [];
  totalUsers: number;
  desde = 0;
  loading = true;
  myUser = '';
  imgSubscription: Subscription;

  constructor(private userService: UserService,
              private searchService: SearchService,
              private modalImageService: ModalImageService) { }

  ngOnDestroy(): void {
    this.imgSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.loadUsers();
    this.imgSubscription = this.modalImageService.imgEmit
      .pipe(
        delay(100)
      )
      .subscribe( () => {
        this.loadUsers();
      });
  }

  loadUsers(): void {
    this.myUser = this.userService.uid;
    console.log(this.myUser);
    this.loading = true;
    this.userService.loadUsers(this.desde)
      .subscribe( ({cuenta, user}) => {
        this.users = user;
        this.usersTemp = user;
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

  search(term: string): void {
    console.log(term);
    if (term.length === 0) {
      this.users = this.usersTemp;
      return;
    }

    this.searchService.search('usuarios', term)
      .subscribe( resp => {
        this.users = resp;
      } );
  }

  deleteUser( user: Usuario): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You wont be able to revert this!',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.deleteUser( user )
          .subscribe( resp => {
            Swal.fire(
              'Deleted!',
              `${ user.name } has been deleted.`,
              'success'
            );

            this.loadUsers();
          });
      }
    });
  }

  saveRole( user: Usuario): void {
    this.userService.saveRole( user )
      .subscribe( resp => console.log(user));
  }

  openModal( user: Usuario ): void {
    console.log(user);
    this.modalImageService.openModal('usuarios', user.uid, user.img);
  }

}
