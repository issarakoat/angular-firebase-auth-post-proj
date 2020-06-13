import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styles: [
  ]
})
export class ChildComponent implements OnInit {
  @Input() number: number;
  @Output() fireSendMessage = new EventEmitter<string>();
  childMessage: string ='';
  constructor() { }

  ngOnInit(): void {
  }
  onSendMessage(){
    this.fireSendMessage.emit(this.childMessage);
  }

}
