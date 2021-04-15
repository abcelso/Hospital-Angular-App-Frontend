import { Component, OnDestroy } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-breadcrums',
  templateUrl: './breadcrums.component.html',
  styles: [
  ]
})
export class BreadcrumsComponent implements OnDestroy {

  pageName: string;
  routeUnsubs$: Subscription;

  constructor(private router: Router) {

      this.routeUnsubs$ = this.getPageName()
      .subscribe(({pageName}) => {
        this.pageName = pageName;
        document.title = `Admin Pro - ${pageName}`;
      } );

  }

  getPageName(): Observable<any> {
    return this.router.events
    .pipe(
      filter(event => event instanceof ActivationEnd),
      filter( (event: ActivationEnd) => event.snapshot.firstChild === null ),
      map( (event: ActivationEnd) => event.snapshot.data )
    );
  }

  ngOnDestroy(): void {
    this.routeUnsubs$.unsubscribe();
  }


}
