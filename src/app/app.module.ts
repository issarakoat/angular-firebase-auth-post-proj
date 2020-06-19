import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { PostComponent } from './post/post/post.component';
import { AuthSignupComponent } from './auth/auth-signup/auth-signup.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UploadImagesComponent } from './upload-images/upload-images.component';
import { FilteredTitlePipe } from './post/filtered-title.pipe';
import { ReversePipe } from './post/reverse.pipe';
import { ParentComponent } from './input-output/parent/parent.component';
import { ChildComponent } from './input-output/child/child.component';
import { ViewChildCompComponent, Pane } from './view-child-comp/view-child-comp.component';
import { BehavierSubjectComponent } from './behavier-subject/behavier-subject.component';
import { BehaveChildComponent } from './behavier-subject/behave-child/behave-child.component';
import { DirectivesComponent } from './directives/directives.component';
import { BgHighlightDirective } from './directives/bg-highlight.directive';

@NgModule({
  declarations: [
    AppComponent,
    PostComponent,
    AuthSignupComponent,
    UploadImagesComponent,
    FilteredTitlePipe,
    ReversePipe,
    ParentComponent,
    ChildComponent,
    ViewChildCompComponent,
    Pane,
    BehavierSubjectComponent,
    BehaveChildComponent,
    DirectivesComponent,
    BgHighlightDirective],
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
