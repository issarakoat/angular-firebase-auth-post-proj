import { Component, OnInit,ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { map } from 'rxjs/operators';
import { PostModule } from './post/post.module';
import { NgForm } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @ViewChild('postForm', { static: false }) meForm: NgForm;
  loadedPosts: PostModule[] = [];
  isFetching = false;
  isUpdate = false;
  isDelete = false;
  isDetail = false;
  dataId = '';
  currentIndex: number;
  currentTitle = '';
  currentContent = '';
  update: PostModule;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.onFetchPosts();
  }

  onCreatePost(postData: PostModule) {
    // Send Http request
    this.http
      .post<{ name: string }>(
        environment.firebase.databaseURL + '/posts.json',
        postData
      )
      .subscribe(responseData => {
        console.log(responseData);
        this.loadedPosts.push(postData);
        this.meForm.reset();
      });
  }

  onFetchPosts() {
    this.isFetching = true;
    // Send Http request
    this.http
    .get<{ name: string }>(
      environment.firebase.databaseURL + '/posts.json',
    )
    .pipe(
      map(responsData => {
      const postsAarray: PostModule[] = [];
      for (const key in responsData) {
        if (responsData.hasOwnProperty(key)) {
          postsAarray.push({ ...responsData[key] , id: key});
        }
      }
      return postsAarray;
    }))
    .subscribe(responseData => {

      this.loadedPosts = responseData;
      console.log(responseData);
      this.isFetching = false;
      this.dataId = '';
    });
  }

  onClearPosts() {
    // Send Http request
    this.http.delete(
      environment.firebase.databaseURL + '/posts.json'
    ).subscribe(resPonseData => {
      console.log(resPonseData);
      this.loadedPosts = [];
      this.meForm.reset();
      this.isUpdate = false;
      this.isDelete = false;
      this.isDetail = false;
    });

  }
  onSelect(post: PostModule, index: number) {
    this.currentIndex = index;
    this.currentTitle = post.title;
    this.currentContent = post.content;
    this.isUpdate = true;
    this.isDelete = true;
    this.isDetail = true;
    //path the form
    this.meForm.form.patchValue({
      title: post.title,
      content: post.content,
    })
    //show id for debugging
    this.dataId = post.id;
  }
  onGetDetail() {
    this.http
    .get<{ name: string }>(
      'https://asp-firebase-okta.firebaseio.com/posts/' + this.dataId + '.json',
    )
    .subscribe(responseData => {
      console.log(responseData);
      this.isFetching = false;
      this.dataId = '';
    });
  }
  onUpdate() {
    this.http.put(
      environment.firebase.databaseURL + '/posts/' + this.dataId + '.json',
      {
        title: this.meForm.form.value.title,
        content: this.meForm.form.value.content
      }
    )
    .subscribe(responseData => {
      console.log(responseData);
      this.isUpdate = false;
      this.isDetail = false;
      this.isDelete = false;
      this.meForm.reset();
      this.onFetchPosts();
    });
  }
  onDelete() {
    this.http.delete(
      environment.firebase.databaseURL + '/posts/' + this.dataId + '.json' ,
    )
    .subscribe(responseData => {
      console.log(responseData);
      this.isDelete = false;
      this.isUpdate = false;
      this.isDelete = false;
      this.meForm.reset();
      this.currentIndex = null;
      this.currentTitle = '';
      this.currentContent = '';
      // this.loadedPosts.splice(this.currentIndex, 1);
      this.onFetchPosts();
    });
  }
}
