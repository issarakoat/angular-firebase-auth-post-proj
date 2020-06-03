import { Injectable } from '@angular/core';
import { PostModule } from './post.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class PostService {
  loadedPosts: PostModule[] = [];
  constructor(private http: HttpClient) { }

  onFetching() {
    return this.http
    .get<{ name: string }>(
      environment.firebase.databaseURL + '/posts.json',
    );

  }
  onCreate(postData: PostModule) {
    return this.http
    .post<{ name: string }>(
      environment.firebase.databaseURL + '/posts.json',
      postData
    );
  }
  onDelete() {

  }
  onUpdate() {

  }
  onClear() {

  }
}
