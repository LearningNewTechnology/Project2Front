import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Post } from '../post';

@Injectable({
  providedIn: 'root'
})
export class SocialPostService {

  constructor(private httpServ: HttpClient) { }
  getNewFeeds() {
    const headers = new HttpHeaders({ 'Access-Control-Allow-Origin': '*' }).set('content-type', 'application/json');

    return this.httpServ.get<Post[]>('http://localhost:8080/Project2/getPosts.do', {headers});
  }
  addNewPost(formData){
    const headers = new HttpHeaders({ 'Access-Control-Allow-Origin': '*' });
    return this.httpServ.post<any>('http://localhost:8080/Project2/addPost.do', formData, {headers});
  }
  likeAPost(likeForm){
    const headers = new HttpHeaders({ 'Access-Control-Allow-Origin': '*' }).set("content-type", "application/json");
    var body = {
      id: likeForm.postId,
      userId: likeForm.userId,
    };
    console.log(body);
    let temp = this.httpServ.post<string>('http://localhost:8080/Project2/like.do', body, { headers });
    
    return temp;

  }
}
