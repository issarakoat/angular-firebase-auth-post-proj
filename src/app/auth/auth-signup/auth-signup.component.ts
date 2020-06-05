import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { catchError, tap } from 'rxjs/operators';
import { User } from '../auth-signup/User.model';
import { throwError, BehaviorSubject } from 'rxjs';

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Component({
  selector: 'app-auth-signup',
  templateUrl: './auth-signup.component.html',
  styleUrls: ['./auth-signup.component.css']
})
export class AuthSignupComponent implements OnInit {
  @ViewChild('authForm', {static: false }) signUpForm: NgForm
  meEmail : string;
  meIdToken : string;
  constructor(private http: HttpClient) { }

  ngOnInit() {
  }
  private handleAuthentication(
    email: string,
    userId: string,
    token: string,
    expiresIn: number
  ) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email, userId, token, expirationDate);
    // this.user.next(user);
    // this.autoLogout(expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(user));
  }
  onSignupPost(){
    console.log(this.signUpForm.value.email)
    this.http.post<AuthResponseData>(
      environment.firebase.signUp + environment.firebase.apiKey,
      {
        email: this.signUpForm.value.email,
        password: this.signUpForm.value.password,
        returnSecureToken: true
      }
    )
    .pipe(
      catchError(this.handleError),
      tap(resData => {
        this.handleAuthentication(
          this.meEmail = resData.email,
          resData.localId,
          this.meIdToken = resData.idToken,
          +resData.expiresIn
        );
      })
    )
    .subscribe(
      resData => {
        console.log(resData);
        this.signUpForm.reset();
        // this.isLoading = false;
        // this.router.navigate(['/recipes']);
      },
      errorMessage => {
        alert(errorMessage);
        // this.error = errorMessage;
        // this.isLoading = false;
      }
    );
  }
  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage);
    }
    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email exists already';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'This email does not exist.';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'This password is not correct.';
        break;
    }
    return throwError(errorMessage);
  }
}
