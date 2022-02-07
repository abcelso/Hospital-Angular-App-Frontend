import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { delay } from 'rxjs/operators';

import { Hospital } from 'src/app/models/hospitales.model';
import { Medico } from 'src/app/models/medicos.model';

import { HospitalService } from 'src/app/services/hospital.service';
import { MedicoService } from 'src/app/services/medico.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
})
export class MedicoComponent implements OnInit {

  medicoForm: FormGroup;
  hospitales: Hospital[] = [];
  medicoSeleccionado: Medico;
  hospitalSeleccionado: Hospital;

  constructor(private fb: FormBuilder,
              private hospitalService: HospitalService,
              private medicoService: MedicoService,
              private router: Router,
              private activeRoute: ActivatedRoute) { }

  ngOnInit(): void {

    this.medicoForm = this.fb.group({
      nombre: ['', Validators.required],
      hospital: ['', Validators.required],
    });

    this.cargarHospitales();

    this.medicoForm.get('hospital').valueChanges
      .pipe(
          delay(100)
        )
      .subscribe( (hospitalId: string) => {
        this.hospitalSeleccionado = this.hospitales.find( (hosp: any) => hosp.id === hospitalId);
      } );
    this.activeRoute.params.subscribe( param => this.cargarMedicoById(param.text));
  }

  guardarMedico(): void {
    const {nombre} = this.medicoForm.value;

    console.log(this.medicoForm.value);

    if (this.medicoSeleccionado) {
      const data: Medico = {
        ...this.medicoForm.value,
        id: this.medicoSeleccionado.id
      };

      this.medicoService.updateMedico( data )
        .subscribe( resp => {
          console.log(resp);
          Swal.fire('Médico actualizado', `El médico ${nombre} se actualizó correctamente!!`, 'success');
        });
    }else{
      this.medicoService.createMedico(this.medicoForm.value)
        .subscribe( (data: any) => {
          console.log(data.medico);
          Swal.fire('Médico creado', `El médico ${nombre} se creó correctamente!!`, 'success');
          this.router.navigateByUrl(`/dashboard/medico/${data.medico.id}`);
        });
    }



  }

  cargarMedicoById( id: string ): void {

    if (id === 'nuevo'){
      return;
    }

    this.medicoService.getMedicoById( id )
      .subscribe( (medico: Medico) => {
        // console.log(medico);
        if (!medico) {
          return this.router.navigateByUrl(`/dashboard/medicos/`);
        }
        const {nombre, hospital: {_id}} = medico;
        this.medicoSeleccionado = medico;
        this.medicoForm.setValue({nombre, hospital: _id});
      });
  }

  cargarHospitales(): void {
    this.hospitalService.loadHospital()
      .subscribe( (data: Hospital[]) => {
        // console.log(data);
        this.hospitales = data;
      });
  }

}
