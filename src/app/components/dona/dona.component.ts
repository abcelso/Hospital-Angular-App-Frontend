import { Component, Input } from '@angular/core';
import { MultiDataSet, Label, Color  } from 'ng2-charts';

@Component({
  selector: 'app-dona',
  templateUrl: './dona.component.html',
  styles: [
  ]
})
export class DonaComponent {

  @Input() titulo = 'Título';
  @Input() doughnutChartLabels: Label[] = ['Algo', 'Algo', 'Algo'];
  @Input() doughnutChartData: MultiDataSet = [
    [350, 450, 100],
  ];
  @Input() colors: Color[] = [
     { backgroundColor: ['red', 'cyan', 'lightgreen']}
    ];

}
