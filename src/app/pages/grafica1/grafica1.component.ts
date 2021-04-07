import { Component } from '@angular/core';


@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styles: [
  ]
})
export class Grafica1Component {

  dona1 = {
    chartLabels: ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'],
    chartData: [ [50, 150, 120]],
    colors: [{ backgroundColor: ['red', 'blue', 'lightgreen']}],
    titulo: 'Ventas'
  };
  dona2 = {
    chartLabels: ['Xiaomi', 'Samsung', 'Iphone'],
    chartData: [ [250, 130, 70]],
    colors: [{ backgroundColor: ['yellow', 'gray', 'purple']}],
    titulo: 'Celulares'
  };


}
