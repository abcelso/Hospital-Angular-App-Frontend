import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [
  ]
})
export class PagesComponent implements OnInit {

  linkTheme = document.querySelector('#theme');
  tilde = document.getElementsByClassName('selector');

  constructor() { }

  ngOnInit(): void {
    const url: string = localStorage.getItem('theme');
    this.linkTheme.setAttribute('href', url);

    const pos = Number(localStorage.getItem('position'));
    return this.tilde[(pos - 1)].classList.add('working');
  }

}
