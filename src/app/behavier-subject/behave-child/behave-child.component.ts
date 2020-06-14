import { Component, OnInit } from '@angular/core';
import { BehavierSubjectService } from '../behavier-subject.service';

@Component({
  selector: 'app-behave-child',
  templateUrl: './behave-child.component.html',
  styleUrls: ['./behave-child.component.css']
})
export class BehaveChildComponent implements OnInit {

  constructor(public behavierService: BehavierSubjectService) { }

  ngOnInit(): void {
  }

}
