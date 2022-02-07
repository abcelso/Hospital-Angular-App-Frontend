import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';

import { Hospital } from '../models/hospitales.model';

const baseUrl = environment.base_URL;

@Injectable({
  providedIn: 'root'
})

export class HospitalService {

  constructor(private http: HttpClient) { }

  get xToken(): any {
    const token = localStorage.getItem('token') || '';
    return {headers: {'x-token': token}};
  }

  loadHospital(): Observable<Hospital[]> {

    const url = `${baseUrl}/hospitales`;

    return this.http.get(url, this.xToken)
      .pipe(
        map( (resp: any ) => resp.hospitales)
        );

  }

  createHospital( name: string ): Observable<any> {

    const url = `${ baseUrl }/hospitales`;

    return this.http.post(url, {nombre: name}, this.xToken);
  }

  updateHospital( id: string, name: string ): Observable<any> {

    const url = `${ baseUrl }/hospitales/${ id }`;

    return this.http.put(url, {nombre: name}, this.xToken);
  }

  deleteHospital( id: string ): Observable<any> {

    const url = `${ baseUrl }/hospitales/${ id }`;

    return this.http.delete(url, this.xToken);
  }
}
