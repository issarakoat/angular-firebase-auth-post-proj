import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  active = 8;
  rootNum: number = 0;
  message;
  constructor(private http: HttpClient) {}

  ngOnInit() {}
  OnFiredIncrementNum(num: number){
    this.rootNum = num;
  }
  onFiredMessage(message: string){
    this.message = message;
  }

}
