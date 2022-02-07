import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from 'src/app/models/usuarios.model';
import { map, reduce } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Hospital } from '../models/hospitales.model';
import { Medico } from '../models/medicos.model';

const baseUrl = environment.base_URL;

@Injectable({
  providedIn: 'root'
})
export class SearchService {


  constructor(private http: HttpClient) { }

  get xToken(): any {
    const token = localStorage.getItem('token') || '';
    return {headers: {'x-token': token}};
  }

  transformUser( resp: any): Usuario {

    const respuesta = resp.data.map(
      user => new Usuario(user.nombre, user.email, '', user.role, user.google, user.uid, user.img) );

    return respuesta;
  }

  transformHospital( resp: any): Hospital {

    // const respuesta = resp.data;
    // const respuesta = resp.data.map(
    //   hospital => new Hospital(hospital.id, hospital.usuario, hospital.nombre, hospital.img, ) );

    return resp.data;
  }

  transformMedico( resp: any): Medico {

    return resp.data;
  }

  search(
      type: 'usuarios' | 'medicos' | 'hospitales',
      term: string
    ): Observable<any> {

    const url = `${baseUrl}/todo/coleccion/${ type }/${ term }`;

    return this.http.get<any[]>(url, this.xToken)
              .pipe(
                map( (resp: any) => {

                  switch (type) {
                    case 'usuarios':
                      return this.transformUser( resp );

                    case 'hospitales':
                      return this.transformHospital( resp );

                    case 'medicos':
                      return this.transformMedico( resp );

                    default:
                      return [];
                  }
                  // console.log(usuarios[0].imageUrl);
                })
              );
  }
}
