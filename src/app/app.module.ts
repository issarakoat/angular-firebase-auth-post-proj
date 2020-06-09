import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { PostComponent } from './post/post/post.component';
import { AuthSignupComponent } from './auth/auth-signup/auth-signup.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UploadImagesComponent } from './upload-images/upload-images.component';

@NgModule({
  declarations: [AppComponent, PostComponent, AuthSignupComponent, UploadImagesComponent],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
