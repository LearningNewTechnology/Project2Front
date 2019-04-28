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
  editUrl: string = 'http://localhost:8080/Project2/updateUser.do';
  private currentUserObject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  
  constructor(private httpServ: HttpClient, private localStorage: LocalStorageService) { 
    this.currentUserObject = new BehaviorSubject<User>(JSON.parse(localStorage.getUser()));
    this.currentUser = this.currentUserObject.asObservable();
  }

  public get currentUserValue(){
    return this.currentUserObject.value;
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
      if (user1 !==null && user1 !== undefined){
        if(user1.id > 0)
        this.localStorage.saveUser(user1);
        this.currentUserObject.next(user1);
      }
      return user1;
    }))
  }

  registerNewUser(user: User) {
    const headers = new HttpHeaders({ 'Access-Control-Allow-Origin': '*' }).set("content-type", "application/json");
    var body = {
      username: user.username,
      password: user.password,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email
    };
    console.log(body);
    let temp = this.httpServ.post<string>(this.registerUrl, body, { headers });
    console.log(temp.pipe(map(res => res as String)));
    return temp;
  }

  editUser(editUserBody){
    console.log("in editUser() user " + editUserBody)
    const headers = new HttpHeaders({ 'Access-Control-Allow-Origin': '*' });
    // var body = {
    //   username: JSON.stringify(user.username),
    //   firstName: JSON.stringify(user.firstName),
    //   lastName: JSON.stringify(user.lastName),
    //   email: JSON.stringify(user.email),
    //   password: JSON.stringify(user.password),
    //   id: user.id
    // };
    console.log("body "+ editUserBody);
    console.log(headers)
    let temp = this.httpServ.post<any>(this.editUrl, editUserBody, { headers });
    console.log(temp.pipe(map(res => res as String)));
    return temp;

  }
}
