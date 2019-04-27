import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Post } from '../post';

@Injectable({
  providedIn: 'root'
})
export class SocialPostService {

  constructor(private httpServ: HttpClient) { }
  getNewFeeds() {
    const headers = new HttpHeaders({ 'Access-Control-Allow-Origin': ['*', 'localhost:8080'] }).set('content-type', 'application/json');
    console.log(headers);
    let a = this.httpServ.get<Post[]>('http://localhost:8080/Project2/getPosts.do', {headers});
    if(a != null && a != undefined)
      {console.log("here" + a); }
    return a;
  }
}
