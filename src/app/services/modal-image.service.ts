import { EventEmitter, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

const baseUrl = environment.base_URL;

@Injectable({
  providedIn: 'root'
})
export class ModalImageService {

  private hideModal = true;
  uid: string;
  img: string;
  type: 'usuarios'|'medicos'|'hospitales';
  imgEmit: EventEmitter<string> = new EventEmitter<string>();

  constructor(private http: HttpClient) { }

  get hiddenModal(): boolean {
    return this.hideModal;
  }

  openModal(
    type: 'usuarios'|'medicos'|'hospitales',
    uid: string,
    img: string
  ): void {
    this.hideModal = false;
    this.uid = uid;
    this.type = type;

    if ( img.includes('https')) {
      this.img = img;
    }else {
      this.img = `${ baseUrl }/upload/${ type }/${ img }`;
    }

    // console.log(this.img);
  }

  closeModal(): void {
    this.hideModal = true;
    this.img = null;
  }


}
