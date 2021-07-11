import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: [
    './register.component.css'
  ]
})
export class RegisterComponent implements OnInit {

  formSubmitted = false;
  registerForm = this.fb.group({
    name: ['Alejandro', [Validators.required, Validators.minLength(3)]],
    email: ['alejandro@gmail.com', [Validators.required, Validators.email]],
    password: ['123456', Validators.required],
    password2: ['123456', Validators.required],
    terms: [false, Validators.required],
  },
    {
      validators: this.passwordEqual('password', 'password2')
    }
  );

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  createUser(): void {
    this.formSubmitted = true;
    if (this.registerForm.valid && !this.aceptarTerminos()){
      console.log('Registro posteado');
    }else{
      console.log('Formulario no es correcto...');
    }
    console.log(this.registerForm);
  }

  campoNoValido(campo: string): boolean {
    if (this.registerForm.get(campo).invalid && this.formSubmitted){
      return true;
    }else{
      return false;
    }
  }

  PassNotValid(): boolean{
    const pass1 = this.registerForm.get('password').value;
    const pass2 = this.registerForm.get('password2').value;

    if (pass1 !== pass2 && this.formSubmitted) {
      return true;
    }else{
      return false;
    }

  }

  aceptarTerminos(): boolean {
    return !this.registerForm.get('terms').value && this.formSubmitted;
  }

  passwordEqual(pass1Name: string, pass2Name: string): any {
    return (formGroup: FormGroup) => {
      const pass1Control = formGroup.get(pass1Name);
      const pass2Control = formGroup.get(pass2Name);

      pass1Control.value === pass2Control.value ?
        pass2Control.setErrors(null) :
        pass2Control.setErrors({notEqual: true});
    };
  }
}
