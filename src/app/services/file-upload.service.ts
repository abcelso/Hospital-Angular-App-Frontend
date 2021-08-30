import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const BASE_URL = environment.base_URL;

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor() { }

  async updatePhoto(
    file: File,
    type: 'usuarios' | 'medicos' | 'hospitales',
    id: string
    ): Promise<any> {

    try {

      const url = `${BASE_URL}/upload/${ type }/${ id }`;

      const formData = new FormData();
      formData.append('imagen', file);

      const resp = await fetch(url, {
        method: 'PUT',
        headers: {
          'x-token': localStorage.getItem('token') || ''
        },
        body: formData
      });

      const data = await resp.json();

      if (data.ok) {
        console.log(data.archiveName);
        return data.archiveName;
      }else {
        console.log(data);
        return false;
      }

    } catch (error) {
      console.log(error);
      return false;
    }

  }
}
