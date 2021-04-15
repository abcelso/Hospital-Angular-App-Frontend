import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: [
  ]
})
export class PromesasComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

  //   const promise = new Promise(( resolve, reject ) => {
  //     if (false) {
  //       resolve('Hola Mundo');
  //     }else {
  //       reject('Se produjo un error en la promesa');
  //     }
  //   });

  //   promise.then( (resp) => {
  //     console.log(resp);
  //   })
  //   .catch(error => console.log(error) );

  //   console.log('Fin del onInit');
  // }

    this.getUsers()
      .then( resp => console.log(resp));
  }

  getUsers(): Promise<any> {

    const promise = new Promise( (resolve, reject) => {
      fetch('https://reqres.in/api/users')
        .then( resp => resp.json())
        .then( body => resolve(body.data));
    });

    return promise;
  }
}
