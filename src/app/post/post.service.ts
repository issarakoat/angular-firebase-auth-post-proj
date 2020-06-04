import { Injectable } from '@angular/core';
import { PostModel } from './post.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class PostService {
  loadedPosts: PostModel[] = [];
  constructor(private http: HttpClient) { }

  onFetching() {
    return this.http
    .get<{ name: string }>(
      environment.firebase.databaseURL + '/posts.json',
    );

  }
  onCreate(postData: PostModel) {
    return this.http
    .post<{ name: string }>(
      environment.firebase.databaseURL + '/posts.json',
      postData
    );
  }
  onDelete(id: string) {
    return this.http.delete(
      environment.firebase.databaseURL + '/posts/' + id + '.json');
  }
  onUpdate(id: string, title: string, content: string) {
    return this.http.put(
      environment.firebase.databaseURL + '/posts/' + id + '.json',
      {
        title: title,
        content: content
      }
    )
  }
  onClear() {
    return this.http.delete(
      environment.firebase.databaseURL + '/posts.json');
  }
}
