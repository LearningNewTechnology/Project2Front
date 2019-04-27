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

    return this.httpServ.get<Post[]>('http://localhost:8080/getPosts.do', {headers});
  }
}
