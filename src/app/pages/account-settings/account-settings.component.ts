import { Component, OnInit } from '@angular/core';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: [
  ]
})
export class AccountSettingsComponent implements OnInit {

  linkTheme = document.querySelector('#theme');
  tilde = document.getElementsByClassName('selector');

  constructor(private settingsService: SettingsService) { }

  ngOnInit(): void {
    const url: string = localStorage.getItem('theme');
    this.linkTheme.setAttribute('href', url);

    const pos = Number(localStorage.getItem('position'));
    this.tilde[(pos)].classList.add('working');
  }

  cambiarTheme(theme: string): void {
    this.settingsService.cambiarTheme(theme);
  }


}
