import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

const base_URL = environment.base_URL;

@Pipe({
  name: 'image'
})
export class ImagePipe implements PipeTransform {

  transform(img: string, type: 'usuarios'|'medicos'|'hospitales'): string {

    if (!img) {
      return `${base_URL}/upload/usuarios/no-img`;
    }else if (img.includes('https')) {
      return `${base_URL}`;
    }else if (img) {
      return `${base_URL}/upload/${type}/${img}`;
    }else {
      return `${base_URL}/upload/usuarios/no-img`;
    }

  }

}
