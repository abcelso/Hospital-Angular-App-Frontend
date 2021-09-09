import { Component, EventEmitter, OnInit } from '@angular/core';

import { ModalImageService } from 'src/app/services/modal-image.service';
import { FileUploadService } from '../../services/file-upload.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-image',
  templateUrl: './modal-image.component.html',
  styles: [
  ]
})
export class ModalImageComponent implements OnInit {

  imgTemp: any = null;
  image: File;
  hideModal: boolean;


  constructor(public modalImageService: ModalImageService, private fileService: FileUploadService) { }

  ngOnInit(): void {
  }

  closeModal(): void {
    this.modalImageService.closeModal();
    this.imgTemp = null;
  }

  changeImage(file: File ): void {
    this.image = file;

    if (!file){
      return this.imgTemp = null;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      this.imgTemp = reader.result;
    };

    console.log(this.image);
  }

  uploadImage(): void {

    const type = this.modalImageService.type;
    const uid = this.modalImageService.uid;

    this.closeModal();

    this.fileService.updatePhoto(this.image, type, uid)
    .then( img => {
        Swal.fire('Guardado', 'Imágen guardada', 'success');
        this.modalImageService.imgEmit.emit(img);
      })
      .catch( error => Swal.fire('Error', error.error.msg, 'error'));
  }
}
