import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-incremental',
  templateUrl: './incremental.component.html',
  styles: [
  ]
})
export class IncrementalComponent implements OnInit{

  @Input() progress: number;
  @Input() btnClass: string;

  @Output() value: EventEmitter<number> = new EventEmitter();


  ngOnInit(): void{
    this.btnClass = `btn ${this.btnClass}`;
  }

  valueChange(value: number): void {

    this.progress += value;

    if (this.progress >= 100) {
      this.progress = 100;
    }else if (this.progress <= 0) {
      this.progress = 0;
    }

    this.value.emit(this.progress);

  }

}
