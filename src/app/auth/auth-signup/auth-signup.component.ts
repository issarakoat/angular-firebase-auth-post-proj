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
  isLoading = false;
  isLoginMode = false;
  isLogin = false;
  user = new BehaviorSubject<User>(null);
  private tokenExpirationTimer: any;
  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.autoLogin();
  }
  private handleAuthentication(
    email: string,
    userId: string,
    token: string,
    expiresIn: number
  ) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 10000);
    const user = new User(email, userId, token, expirationDate);
    this.user.next(user);
    // this.autoLogout(expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(user));
  }
  OnSubmit(){
    if(this.isLoginMode){
      this.login();
    }
    else{
      this.signUp();
    }
  }
  onSwitchMode(){
    this.isLoginMode = !this.isLoginMode;
  }
  signUp(){
    console.log(this.signUpForm.value.email)
    this.isLoading = true;
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
          resData.email,
          resData.localId,
          resData.idToken,
          +resData.expiresIn
        );
      })
    )
    .subscribe(
      resData => {
        console.log(resData);
        this.signUpForm.reset();
        this.isLoading = false;
        this.meEmail = resData.email;
        this.meIdToken = resData.idToken
        // this.router.navigate(['/recipes']);
      },
      errorMessage => {
        alert(errorMessage);
        // this.error = errorMessage;
        // this.isLoading = false;
      }
    );
  }
  login(){
    this.http
    .post<AuthResponseData>(
      environment.firebase.login + environment.firebase.apiKey,
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
          resData.email,
          resData.localId,
          resData.idToken,
          +resData.expiresIn
        );
      })
    )
    .subscribe(
      resData => {
        console.log(resData);
        this.isLoading = false;
        this.isLoginMode = true;
        this.isLogin = true;
        this.meEmail = resData.email;
        this.meIdToken = resData.idToken
        // this.router.navigate(['/recipes']);
      })
    }
    logout() {
      this.user.next(null);
      this.isLogin = false;
      // this.router.navigate(['/auth']);
      localStorage.removeItem('userData');
      if (this.tokenExpirationTimer) {
        clearTimeout(this.tokenExpirationTimer);
      }
      this.tokenExpirationTimer = null;
    }

    autoLogin() {
      const userData: {
        email: string;
        id: string;
        _token: string;
        _tokenExpirationDate: string;
      } = JSON.parse(localStorage.getItem('userData'));
      if (!userData) {
        return;
      }
      this.isLogin = true;
      const loadedUser = new User(
        userData.email,
        userData.id,
        userData._token,
        new Date(userData._tokenExpirationDate)
      );

      if (loadedUser.token) {
        this.user.next(loadedUser);
        const expirationDuration =
          new Date(userData._tokenExpirationDate).getTime() -
          new Date().getTime();
        // this.autoLogout(expirationDuration);
      }
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
    alert(errorMessage);
    return throwError(errorMessage);
  }
}
