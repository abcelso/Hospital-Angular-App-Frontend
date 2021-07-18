import { Component, NgZone, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
    remember: new FormControl(false)
  });

  email: string;
  auth2: any;

  constructor(private router: Router,
              private userService: UserService,
              private zone: NgZone) { }

  ngOnInit(): void {

    this.renderButton();

    this.email = localStorage.getItem('email') || '';

    if ( this.email !== '') {
      this.loginForm.patchValue(
        {
          email: this.email,
          remember: true
        }
        );
    }
  }


  login(): void {

    this.userService.loginUser(this.loginForm.value)
      .subscribe( resp => {
        this.rememberEmail();
        this.router.navigate(['/dashboard']);
      }, err => {
        Swal.fire('Error', 'email o password incorrectos', 'error');
      });

  }

  rememberEmail(): void {
    if (this.loginForm.get('remember').value){
      localStorage.setItem('email', this.loginForm.get('email').value);
    }else{
      localStorage.removeItem('email');
    }
  }

  // ?Renderiza el botón de google
  renderButton(): void {
    gapi.signin2.render('my-signin2', {
      scope: 'profile email',
      width: 240,
      height: 50,
      longtitle: true,
      theme: 'dark',
    });

    this.startApp();
  }

  async startApp(): Promise<any>{

    await this.userService.googleInit();
    this.auth2 = this.userService.auth2;

    this.attachSignin(document.getElementById('my-signin2'));

  }

  attachSignin(element: any): any {
    console.log(element.id);
    this.auth2.attachClickHandler(element, {},
      (googleUser) => {
        const id_token = googleUser.getAuthResponse().id_token;
        console.log(id_token);
        this.zone.run(() => {
          this.userService.loginGoogle(id_token).subscribe();
          this.router.navigateByUrl('/dashboard');
          });
        }, (error) => {
          alert(JSON.stringify(error, undefined, 2));
        });
  }

}
