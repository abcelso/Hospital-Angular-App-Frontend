import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Usuario } from 'src/app/models/usuarios.model';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';
import { FileUploadService } from './../../services/file-upload.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: [
  ]
})
export class ProfileComponent implements OnInit {

  user: Usuario;
  profileForm: FormGroup;
  image: File;
  imgTemp: any = null;

  constructor(private userService: UserService,
              private fileService: FileUploadService) {
    this.user = userService.user;
  }

  ngOnInit(): void {
    this.profileForm = new FormGroup({
      nombre: new FormControl(this.user.name, Validators.required),
      email: new FormControl(this.user.email, [Validators.required, Validators.email]),
    }
    );
  }

  updateProfile(): void {
    console.log(this.profileForm.value);
    this.userService.updateUser(this.profileForm.value)
      .subscribe( (resp) => {
        const {nombre, email} = this.profileForm.value;
        this.user.name = nombre;
        this.user.email = email;

        Swal.fire('Guardado', 'Guardado exitoso', 'success');

      }, (error) => {
        Swal.fire('Error', error.error.msg, 'error');
      });
  }

  selectImagen(file: File): void {
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

  savePicture(): any {
    this.fileService.updatePhoto(this.image, 'usuarios', this.user.uid)
    .then( img => {
        this.user.img = img;
        Swal.fire('Guardado', 'Imágen guardada', 'success');
      })
      .catch( error => Swal.fire('Error', error.error.msg, 'error'));
  }

}
