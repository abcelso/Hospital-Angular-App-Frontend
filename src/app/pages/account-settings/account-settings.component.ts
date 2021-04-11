import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: [
  ]
})
export class AccountSettingsComponent implements OnInit {

  public linkTheme = document.querySelector('#theme');
  public tilde = document.getElementsByClassName('selector');

  constructor() { }

  ngOnInit(): void {
  }

  cambiarTheme( theme: string): void {
    const url = `./assets/css/colors/${theme}.css`;
    this.linkTheme.setAttribute('href', url);

    localStorage.setItem('theme', url);

    this.borrarTilde();

    // Tilde en class selector
    for (const i in this.tilde){
      if ((this.tilde[i].getAttribute('data-theme')) === theme ){
        const pos = this.tilde[i].innerHTML;
        localStorage.setItem('position', pos);
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
