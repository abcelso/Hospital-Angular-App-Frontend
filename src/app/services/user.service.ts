import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import { LoginData } from '../interfaces/user-login.interface';
import { RegisterData } from '../interfaces/user-register.interface';

const baseUrl = environment.base_URL;
declare const gapi: any;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  auth2: any;

  constructor(private http: HttpClient,
              private router: Router,
              private zone: NgZone) {

                this.googleInit();

              }

  async googleInit(): Promise<void> {

    return new Promise(resolve => {
      gapi.load('auth2', () => {
        this.auth2 = gapi.auth2.init({
          client_id: '716698500881-ldbil14mtv1brno8g6nlvmk74ddesfur.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
        });
      });
      return resolve();
    });

  }

  validarToken(): Observable<boolean> {
    const token = localStorage.getItem('token') || '';

    return this.http.get(`${baseUrl}/login/renew`, {
      headers: {'x-token': token}
    })
      .pipe(
        tap( (resp: any) => localStorage.setItem('token', resp.token)),
        map( resp => true),
        catchError( error => of(false))
      );
  }

  createUser(formData: RegisterData): Observable<RegisterData> {
    return this.http.post<RegisterData>(`${baseUrl}/usuarios`, formData );
  }

  loginUser(formData: LoginData): Observable<boolean> {
      return this.http.post<LoginData>(`${baseUrl}/login`, formData)
        .pipe(
            map((data: any) => {
              localStorage.setItem('token', data.token);
              return true;
          })
        );
  }

  loginGoogle( token: any ): Observable<any> {
    return this.http.post<any>(`${baseUrl}/login/google`, {token})
      .pipe(
        tap( resp => localStorage.setItem('token', resp.token))
      );
  }

  logout(): void {
    localStorage.removeItem('token');

    this.auth2.signOut().then(() => {
      this.zone.run(() => {
        this.router.navigate(['/login']);
      });
    });

  }
}
