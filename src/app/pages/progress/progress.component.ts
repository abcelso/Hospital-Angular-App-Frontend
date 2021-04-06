import { Component } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: [ './progress.component.css']
})
export class ProgressComponent {

  progress1 = 50;
  progress2 = 50;


  getProgress(progress: number): string {
    return `${progress}%`;
  }


}
