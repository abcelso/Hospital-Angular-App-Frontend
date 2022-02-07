import { Component, OnInit, OnDestroy } from '@angular/core';

import { delay } from 'rxjs/operators';
import { Subscription } from 'rxjs';

import { MedicoService } from '../../../services/medico.service';
import { ModalImageService } from 'src/app/services/modal-image.service';
import { SearchService } from 'src/app/services/search.service';

import { Medico } from './../../../models/medicos.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: [],
})
export class MedicosComponent implements OnInit, OnDestroy {
  medicos: Medico[] = [];
  loading = false;
  imgSubscription: Subscription;

  constructor(
    private medicoService: MedicoService,
    private modalImageService: ModalImageService,
    private searchService: SearchService,
  ) {}

  ngOnInit(): void {
    this.loadMedicos();
    this.imgSubscription = this.modalImageService.imgEmit
      .pipe(delay(200))
      .subscribe(() => {
        this.loadMedicos();
      });
  }

  ngOnDestroy(): void {
    this.imgSubscription.unsubscribe();
  }

  loadMedicos(): void {
    this.loading = true;
    this.medicoService
      .loadMedicos()
      .pipe(delay(1000))
      .subscribe((resp: Medico[]) => {
        console.log(resp);
        this.loading = false;
        this.medicos = resp;
      });
  }

  createMedico(): void {
    Swal.fire({
      title: 'Create new doctor',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off',
      },
      showCancelButton: true,
      confirmButtonText: 'Save',
      showLoaderOnConfirm: true,
      allowOutsideClick: () => !Swal.isLoading(),
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Everything OK',
          text: `${result.value} doctor was created`,
        });
        this.medicoService
          .createMedico(result.value)
          .subscribe(() => this.loadMedicos());
      }
    });
  }

  // saveChanges(medico: Medico): void {
  //   // console.log(medico.id);
  //   this.medicoService.updateMedico(medico).subscribe(() => {
  //     Swal.fire('Update', 'The update its OK', 'success');
  //   });
  // }

  deleteMedico(medico: Medico): void {
    this.medicoService.deleteMedico(medico.id).subscribe(() => {
      Swal.fire({
        title: 'Are you sure?',
        text: `You won't be able to revert this!`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            'Deleted!',
            `${medico.nombre} doctor has been deleted.`,
            'success'
          );
        }
      });
      this.loadMedicos();
    });
  }

  openModal(medico: Medico): void {
    // console.log(hospital);
    this.modalImageService.openModal('medicos', medico.id, medico.img);
  }

  searchMedico(name: string = ''): void {
    // console.log(name);
    if (name.length > 0) {
      this.searchService
        .search('medicos', name)
        .subscribe((resp: Medico[]) => {
          this.medicos = resp;
        });
    } else {
      this.loadMedicos();
    }
  }
}
