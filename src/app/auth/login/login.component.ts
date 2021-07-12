import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {

  loginForm = new FormGroup({
    email: new FormControl('alejandro@gmail.com', [Validators.required, Validators.email]),
    password: new FormControl('123456', Validators.required),
    remember: new FormControl(false)
  });

  constructor(private router: Router,
              private userService: UserService) { }


  login(): void {

    this.userService.loginUser(this.loginForm.value)
      .subscribe( resp => {
        console.log(resp);
      }, err => {
        Swal.fire('Error', err.error.msg, 'error');
      });
  }

}
