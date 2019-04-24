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
    this.httpServ.get<any>('http://localhost:8080/logout.do', {headers});
  }
  checkUser() {
    return localStorage.getItem('User');
  }
}
