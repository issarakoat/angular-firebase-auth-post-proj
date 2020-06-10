import { Component, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { PostModel } from "../post.model";
import { environment } from "../../../environments/environment";

import { HttpClient } from "@angular/common/http";
import { PostService } from "../post.service";
import { map } from "rxjs/operators";

@Component({
  selector: "app-post",
  templateUrl: "./post.component.html",
  styleUrls: ["./post.component.css"],
})
export class PostComponent implements OnInit {
  @ViewChild("postForm", { static: false }) meForm: NgForm;
  filterTitle='';
  loadedPosts: PostModel[] = [];
  isFetching = false;
  isUpdate = false;
  isDelete = false;
  isDetail = false;
  dataId = "";
  currentTitle = "";
  currentContent = "";
  test: PostModel;
  constructor(private http: HttpClient, private postService: PostService) {}

  ngOnInit() {
    this.onFetchPosts();
  }

  onCreatePost(postData: PostModel) {
    this.postService.onCreate(postData).subscribe((resPonseData) => {
      this.meForm.reset();
      this.onFetchPosts();
    });
  }

  onFetchPosts() {
    this.isFetching = true;
    this.postService
      .onFetching()
      .pipe(
        map((responsData) => {
          const postsAarray: PostModel[] = [];
          for (const key in responsData) {
            if (responsData.hasOwnProperty(key)) {
              postsAarray.push({ ...responsData[key], id: key });
            }
          }
          return postsAarray;
        })
      )
      .subscribe((responseData) => {
        this.loadedPosts = responseData;
        console.log(responseData);
        this.isFetching = false;
        this.dataId = "";
      });
    // Send Http request
  }
  onClearPosts() {
    // Send Http request
    this.postService.onClear().subscribe((resPonseData) => {
      console.log(resPonseData);
      this.loadedPosts = [];
      this.meForm.reset();
      this.isUpdate = false;
      this.isDelete = false;
      this.isDetail = false;
    });
  }
  onSelect(post: PostModel, index: number) {
    this.currentTitle = post.title;
    this.currentContent = post.content;
    this.isUpdate = true;
    this.isDelete = true;
    this.isDetail = true;
    //path the form
    this.meForm.form.patchValue({
      title: post.title,
      content: post.content,
    });
    //show id for debugging
    this.dataId = post.id;
  }
  onGetDetail() {
    this.http
      .get<{ title: string; content: string }>(
        environment.firebase.databaseURL + "/posts/" + this.dataId + ".json"
      )
      .subscribe((responseData) => {
        console.log("yo");
        console.log("the title is " + responseData.title);
        console.log("this content is " + responseData.content);
        this.isFetching = false;
        this.dataId = "";
      });
  }
  onUpdate() {
    this.postService
      .onUpdate(
        this.dataId,
        this.meForm.form.value.title,
        this.meForm.value.content
      )
      .subscribe((responseData) => {
        console.log(responseData);
        this.isUpdate = false;
        this.isDetail = false;
        this.isDelete = false;
        this.meForm.reset();
        this.onFetchPosts();
      });
  }
  onDelete() {
    this.postService.onDelete(this.dataId).subscribe((responseData) => {
      console.log(responseData);
      this.isDelete = false;
      this.isUpdate = false;
      this.isDelete = false;
      this.meForm.reset();
      this.currentTitle = "";
      this.currentContent = "";
      this.onFetchPosts();
    });
  }
}
