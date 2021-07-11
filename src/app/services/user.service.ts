import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserData } from '../interfaces/user.interface';

const baseUrl = environment.base_URL;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  createUser(formData: UserData): Observable<UserData> {
    return this.http.post<UserData>(`${baseUrl}/usuarios`, formData );
  }
}
