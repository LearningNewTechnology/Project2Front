import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { User } from '../user';
import { map } from 'rxjs/operators';
import { LocalStorageService } from './local-storage.service';
import { Executor } from 'selenium-webdriver';
@Injectable({
  providedIn: 'root'
})
export class UserCredentialService {
  loginUrl: string = 'http://localhost:8080/Project2/login.do';
  registerUrl: string = 'http://localhost:8080/Project2/register.do';
  private currentUserObject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  
  constructor(private httpServ: HttpClient, private localStorage: LocalStorageService) { 
    this.currentUserObject = new BehaviorSubject<User>(JSON.parse(localStorage.checkUser()));
    this.currentUser = this.currentUserObject.asObservable();
  }

  login(usernameInput: string, passwordInput: string) {
    const headers = new HttpHeaders({ 'Access-Control-Allow-Origin': '*' }).set('content-type', 'application/json');
    var body =
    {
      username: usernameInput,
      password: passwordInput
    };
    return this.httpServ.post<any>(this.loginUrl, body, {headers})
    .pipe(map(user1 =>{
      if (user1 && user1.token){
        this.localStorage.saveUser(user1);
        this.currentUserObject.next(user1);
      }
      return user1;
    }))
  }

  // authenticate(user: User): Promise<User> {
  //   console.log("We are here 3");
  //   console.log("user.username " + user.username);
  //   console.log("user.password " + user.password);
  //   const headers = new HttpHeaders({ 'Access-Control-Allow-Origin': '*' }).set('content-type', 'application/json');
  //   var body =
  //   {
  //     username: user.username,
  //     password: user.password
  //   };
  //   console.log("We are here 4");
  //   console.log("body username " + body.username);
  //   console.log("body passowrd " + body.password);
  //   return this.httpServ.post<User>(this.loginUrl, body, { headers }).pipe(map(res => res as User)).toPromise();
  // }
  registerNewUser(user: User) {
    console.log("We are here 8");
    console.log("user.username " + user.username);
    console.log("user.password " + user.password);
    const headers = new HttpHeaders({ 'Access-Control-Allow-Origin': '*' }).set("content-type", "application/json");
    var body = {
      username: JSON.stringify(user.username),
      password: JSON.stringify(user.password),
      firstName: JSON.stringify(user.firstName),
      lastName: JSON.stringify(user.lastName),
      email: JSON.stringify(user.email)
    };
    var body2 = user;
    let temp = this.httpServ.post<string>(this.registerUrl, body2, { headers });
    console.log(temp.pipe(map(res => res as String)));
    return temp;
  }
}
