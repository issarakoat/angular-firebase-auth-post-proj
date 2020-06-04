import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-auth-signup',
  templateUrl: './auth-signup.component.html',
  styleUrls: ['./auth-signup.component.css']
})
export class AuthSignupComponent implements OnInit {
  @ViewChild('postForm', {static: false }) signUpForm: NgForm
  constructor(private http: HttpClient) { }

  ngOnInit() {
  }
  // onSignupPost(postForm.value){

  // }
}
