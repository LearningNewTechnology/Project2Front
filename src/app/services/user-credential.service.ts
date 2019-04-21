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

  constructor(private httpServ: HttpClient, private localStorage: LocalStorageService) { }
  getUser(): Observable<User> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Accept': 'application/json'
      })
    }
    return this.httpServ.get('localhost:4200/home', httpOptions).pipe(map(res => res as User));
  }
  authenticate(user: User): Promise<User>{
    console.log("We are here 3");
    console.log("user.username " + user.username);
    console.log("user.password "  + user.password );
    let httpOptions = {
      headers: new HttpHeaders({'Access-Control-Allow-Origin':'*'}).set(
        'content-type', 'application/json'
      ),
      'body': {
        "username": user.username,
        "password": user.password
      }
    }
    console.log("We are here 4");
    console.log("httpOptions username " + httpOptions.body.username);
    console.log("httpOptions passowrd " + httpOptions.body.password);
    return this.httpServ.post<User>('http://localhost:8080/Project2/login.do', httpOptions).pipe(map(res => res as User)).toPromise().catch(this.handleError);
  }
  private handleError(error: Response){
    console.log("error");
    return Promise.reject("error link");
  }
}
