import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: [ './progress.component.css']
})
export class ProgressComponent implements OnInit {

  progress = 50;

  constructor() { }

  ngOnInit(): void {
  }

  get getProgress(): string {
    return `${this.progress}%`;
  }

  valueChange(value: number): void {

    this.progress += value;

    if (this.progress >= 100) {
      this.progress = 100;
    }else if (this.progress <= 0) {
      this.progress = 0;
    }
  }

}
