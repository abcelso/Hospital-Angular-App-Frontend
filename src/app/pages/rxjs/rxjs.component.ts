import { Component, OnInit, OnDestroy } from '@angular/core';
import { interval, Observable, Subscription } from 'rxjs';
import { filter, map, retry, take } from 'rxjs/operators';


@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ]
})
export class RxjsComponent implements OnInit, OnDestroy {

  public intervaloUnsubs: Subscription;

  constructor() { }

  ngOnDestroy(): void {
    this.intervaloUnsubs.unsubscribe();
  }

  ngOnInit(): void {

    // this.conteo().pipe(
    //   retry()
    // ).subscribe(
    //   valor => console.log('Observer', valor),
    //   error => console.warn(error),
    //   () => console.log('El conteo se completó')

    //   );

    this.intervaloUnsubs = this.intervalo().subscribe(console.log);
    }

    intervalo(): Observable<number> {
      return interval(100)
              .pipe(
                // take(10),
                map( valor => valor + 1),
                filter( valor => valor % 2 === 0),
              );
    }

    conteo(): Observable<number> {

      let i = -1;

      const obs$ = new Observable<number>( observer => {

        const intervalo = setInterval(() => {
          i++;
          observer.next(i
            );
          if (i === 4){
            clearInterval(intervalo);
            observer.complete();
          }
          if (i === 2){
            observer.error('Se produjo un error en el conteo');
          }
        }, 1000);
      });

      return obs$;
  }

}
