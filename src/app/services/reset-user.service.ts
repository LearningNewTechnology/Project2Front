import { Injectable } from '@angular/core';
import { User } from '../user';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { LocalStorageService } from './local-storage.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ResetUserService {
  resetUrl: string = 'http://localhost:8080/Project2/reset_request.do';

  private currentUserObject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  
  constructor(private httpServ: HttpClient, private localStorage: LocalStorageService) { 
    this.currentUserObject = new BehaviorSubject<User>(JSON.parse(localStorage.getUser()));
    this.currentUser = this.currentUserObject.asObservable();
  }

  public get currentUserValue(){
    return this.currentUserObject.value;
  }

  resetPass(user: User) {
    const headers = new HttpHeaders({ 'Access-Control-Allow-Origin': '*' }).set("content-type", "application/json");
    var body = {
      username: user.username,
      email: user.email
    };
    console.log(body);
    let temp = this.httpServ.post<string>(this.resetUrl, body, { headers });
    console.log(temp.pipe(map(res => res as String)));
    return temp;
  }
}
