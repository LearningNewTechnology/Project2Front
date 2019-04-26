import { Injectable } from '@angular/core';
import { User } from '../user';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor(private httpServ: HttpClient) { }
  saveUser(userInfo: User){
    localStorage.setItem('User', JSON.stringify(userInfo));
  }
  logout(){
    const headers = new HttpHeaders({ 'Access-Control-Allow-Origin': '*' });
    localStorage.removeItem('User');
    localStorage.removeItem('searchResult');
    this.httpServ.get<any>('http://localhost:8080/logout.do', {headers});
  }
  checkUser() {
    return localStorage.getItem('User') !== null && localStorage.getItem('User') != undefined;
  }
  getUser() {
    return localStorage.getItem('User');
  }
  saveSearchResult(searchResult: User[]){
    localStorage.setItem('searchResult', JSON.stringify(searchResult));
  }
  getSearchResult(){
    return localStorage.getItem('searchResult');
  }
  deleteSearchResult(){
    localStorage.removeItem('searchResult');
  }
}
