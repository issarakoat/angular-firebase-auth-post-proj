import { Component, OnInit } from '@angular/core';
import { BehavierSubjectService } from './behavier-subject.service';

@Component({
  selector: 'app-behavier-subject',
  templateUrl: './behavier-subject.component.html',
  styleUrls: ['./behavier-subject.component.css']
})
export class BehavierSubjectComponent implements OnInit {
  someText = '';
  constructor(public behavierService: BehavierSubjectService) { }

  ngOnInit(): void {
    this.someText = '';
  }
  onClick1(){
    this.someText = this.behavierService.getMessage1()

  }
  onClick2(){
    this.someText = this.behavierService.getMessage2()
  }
  onClick3(){
    this.someText = this.behavierService.getMessage3()
  }
  onClear(){
    this.someText = '';
  }

}
