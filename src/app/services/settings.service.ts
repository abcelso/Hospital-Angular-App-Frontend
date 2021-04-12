import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  private linkTheme = document.querySelector('#theme');
  private tilde = document.getElementsByClassName('selector');

  constructor() { }

  cambiarTheme( theme: string): void {

    const url = `./assets/css/colors/${theme}.css`;
    this.linkTheme.setAttribute('href', url);

    localStorage.setItem('theme', url);

    this.borrarTilde();

    // Tilde en class selector
    for (const i in this.tilde){
      if ((this.tilde[i].getAttribute('data-theme')) === theme ){
        const pos = Number(this.tilde[i].innerHTML) - 1;
        console.log(pos);
        localStorage.setItem('position', String(pos));
        return this.tilde[i].classList.add('working') ;
      }
    }

  }

  borrarTilde(): void {
    for (let i = 0; i < (this.tilde.length); i++){
      this.tilde[i].classList.remove('working') ;
    }
  }
}
