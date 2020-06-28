import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MaUser } from './MaUser.model';

@Component({
  selector: 'app-observable',
  templateUrl: './observable.component.html',
  styleUrls: ['./observable.component.css']
})
export class ObservableComponent implements OnInit {
  userObserv: Observable<MaUser>;
  user: MaUser;
  constructor() { }

  ngOnInit(): void {
    this.user = new MaUser(1, 'Tom', 'Hello')
    this.userObserv = new Observable( s => {
      s.next(this.user);
      s.next(new MaUser(2, 'Tom1', 'Hello1'));
    })
    this.userObserv.subscribe(s => {
      console.log(s);
    })
  }
  doSomething(){
    this.userObserv = new Observable( s => {
      s.next(new MaUser(3, 'Tom2', 'Hello2'))
    })
    this.userObserv.subscribe(s => {
      console.log(s);
    })

}}
