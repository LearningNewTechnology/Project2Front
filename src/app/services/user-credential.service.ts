import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../user';
import { map } from 'rxjs/operators';
import { LocalStorageService } from './local-storage.service';
import { Executor } from 'selenium-webdriver';
@Injectable({
  providedIn: 'root'
})
export class UserCredentialService {
  loginUrl: string = 'http://localhost:8080/Project2/login.do';
  _message: string = "";
  constructor(private httpServ: HttpClient, private localStorage: LocalStorageService) { }

  authenticate(user: User): Promise<User>{
    console.log("We are here 3");
    console.log("user.username " + user.username);
    console.log("user.password "  + user.password );
    const headers = new HttpHeaders({'Access-Control-Allow-Origin':'*'}).set('content-type','application/json');
    var body = 
  {
    username: user.username,
    password: user.password
  };
    console.log("We are here 4");
    console.log("body username " + body.username);
    console.log("body passowrd " + body.password);
    return this.httpServ.post<User>(this.loginUrl, body, {headers}).pipe(map(res => res as User)).toPromise();
  }
}
