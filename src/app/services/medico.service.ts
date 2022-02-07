import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Medico } from '../models/medicos.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const baseUrl = environment.base_URL;

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  constructor(private http: HttpClient) { }

  get xToken(): any {
    const token = localStorage.getItem('token') || '';
    return {headers: {'x-token': token}};
  }

  loadMedicos(): Observable<Medico[]> {

    const url = `${baseUrl}/medicos`;

    return this.http.get(url, this.xToken)
      .pipe(
        map( (resp: any) => resp.medicos )
      );
  }

  getMedicoById(id: string): Observable<Medico> {

    const url = `${baseUrl}/medico/${id}`;

    return this.http.get(url, this.xToken)
      .pipe(
        map( (resp: any) => resp.medico)
      );
  }

  createMedico( medico: {nombre: string, hospital: string} ): Observable<any> {

    const url = `${baseUrl}/medicos`;

    return this.http.post(url, medico, this.xToken);

  }

  updateMedico( medico: Medico): Observable<any> {
    const {nombre, hospital, id} = medico;

    const url = `${baseUrl}/medicos/${id}`;

    return this.http.put(url, {nombre, hospital}, this.xToken);

  }

  deleteMedico( id: string ): Observable<any> {

    const url = `${baseUrl}/medicos/${id}`;

    return this.http.delete(url, this.xToken);

  }
}
