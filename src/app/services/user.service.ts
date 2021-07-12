import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginData } from '../interfaces/user-login.interface';
import { RegisterData } from '../interfaces/user-register.interface';

const baseUrl = environment.base_URL;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  createUser(formData: RegisterData): Observable<RegisterData> {
    return this.http.post<RegisterData>(`${baseUrl}/usuarios`, formData );
  }

  loginUser(formData: LoginData): Observable<LoginData> {
      return this.http.post<LoginData>(`${baseUrl}/login`, formData);
  }
}
