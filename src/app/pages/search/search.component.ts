import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Hospital } from 'src/app/models/hospitales.model';
import { Medico } from 'src/app/models/medicos.model';
import { Usuario } from 'src/app/models/usuarios.model';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: [
  ]
})
export class SearchComponent implements OnInit {

  medicos: Medico[] = [];
  hospitales: Hospital[] = [];
  usuarios: Usuario[] = [];

  constructor(private activatedRoute: ActivatedRoute,
              private searchService: SearchService) { }

  ngOnInit(): void {
    this.activatedRoute.params
      .subscribe( ({termino}) => {
        this.searchService.globalSearch(termino)
          .subscribe( resp => {
            console.log(resp);
            this.medicos = resp.medicos;
            this.hospitales = resp.hospitales;
            this.usuarios = resp.usuarios;
          });
      } );
  }

}
