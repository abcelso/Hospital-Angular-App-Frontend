import { Component, OnInit } from '@angular/core';
import { delay } from 'rxjs/operators';
import { Hospital } from 'src/app/models/hospitales.model';
import { HospitalService } from 'src/app/services/hospital.service';
import { ModalImageService } from 'src/app/services/modal-image.service';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: [
  ]
})
export class HospitalesComponent implements OnInit {

  hospitales: Hospital[] = [];
  loading = false;
  imgSubscription: Subscription;

  constructor(private hospitalService: HospitalService, private modalImageService: ModalImageService,
              private searchService: SearchService) { }

  ngOnInit(): void {
    this.loadHospitales();
    this.imgSubscription = this.modalImageService.imgEmit
      .pipe(
        delay(200)
      )
      .subscribe( () => {
        this.loadHospitales();
      });
  }

  loadHospitales(): void {
    this.loading = true;
    this.hospitalService.loadHospital()
    .pipe(delay(1000))
    .subscribe( (resp: Hospital[]) => {
        console.log(resp);
        this.loading = false;
        this.hospitales = resp;
      });
  }

  createHospital(): void {
    Swal.fire({
      title: 'Create new Hospital',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonText: 'Save',
      showLoaderOnConfirm: true,
      allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Everything OK',
          text: `${result.value} hospital was created`,
        });
        this.hospitalService.createHospital(result.value)
        .subscribe( () => this.loadHospitales() );
      }
    });
  }

  saveChanges(hospital: Hospital): void {
    // console.log(hospital.id);
    this.hospitalService.updateHospital(hospital._id, hospital.nombre)
      .subscribe( () => {
        Swal.fire('Update', 'The update its OK', 'success');
      } );
  }

  deleteHospital(hospital: Hospital): void {

    this.hospitalService.deleteHospital(hospital._id)
      .subscribe( () => {
        Swal.fire({
          title: 'Are you sure?',
          text: `You won't be able to revert this!`,
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire(
              'Deleted!',
              `${ hospital.nombre } hospital has been deleted.`,
              'success'
            );
          }
        });
        this.loadHospitales();
      });
  }

  openModal( hospital: Hospital ): void {
    // console.log(hospital);
    this.modalImageService.openModal('hospitales', hospital._id, hospital.img);
  }

  searchHospital( name: string = '' ): void {
    // console.log(name);
    if (name.length > 0){
      this.searchService.search('hospitales', name)
        .subscribe( (resp: Hospital[]) => {
              this.hospitales =  resp;
          } );
    }else {
      this.loadHospitales();
    }
  }

}
