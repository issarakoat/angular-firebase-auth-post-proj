import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BehavierSubjectService {
  bSubject = new BehaviorSubject(null);
  text = '';
  constructor() { }
  getMessage1(){
    this.bSubject.next('hello')
    this.bSubject.subscribe((val)=>{
      this.text = val
    })
    return this.text;
  }
  getMessage2(){
    this.bSubject.next('I love you')
    this.bSubject.subscribe((val)=>{
      this.text = val
    })
    return this.text;
  }
  getMessage3(){
    this.bSubject.next('Fuck you')
    this.bSubject.subscribe((val)=>{
      this.text = val
    })
    return this.text;
  }

}
