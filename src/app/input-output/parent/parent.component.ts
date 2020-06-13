import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styles: [
  ]
})
export class ParentComponent implements OnInit {
  number: number = 0;
  @Output() FiredIncrementNum = new EventEmitter<number>();
  @Input() messageFromChild;
  interval;
  constructor() { }

  ngOnInit(): void {
  }
  onClick(){
    this.interval = setInterval(()=>{
      this.FiredIncrementNum.emit(this.number + 1);
      this.number++;
      console.log(this.number);
    }, 1000);
  }
  onStop(){
    this.interval = clearInterval(this.interval);
  }

}
