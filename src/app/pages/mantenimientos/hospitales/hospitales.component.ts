import { Component, OnInit } from '@angular/core';
import { delay } from 'rxjs/operators';
import { Hospital } from 'src/app/models/hospitales.model';
import { HospitalService } from 'src/app/services/hospital.service';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: [
  ]
})
export class HospitalesComponent implements OnInit {

  hospitales: Hospital;
  loading = false;

  constructor(private hospitalService: HospitalService) { }

  ngOnInit(): void {
    this.loadHospitales();
  }

  loadHospitales(): void {
    this.loading = true;
    this.hospitalService.loadHospital()
    .pipe(delay(1000))
    .subscribe( hospitales => {
        console.log(hospitales);
        this.loading = false;
        this.hospitales = hospitales;
      });
  }

}
