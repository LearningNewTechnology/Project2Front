import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../user';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SearchUserService {

  searchByUsernameUrl = "http://localhost:8080/searchUsers.do";
  private currentUserObject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  constructor(private httpServ: HttpClient) { }
  searchByUsername(usernameInput: string){
    const headers = new HttpHeaders({ 'Access-Control-Allow-Origin': '*' }).set('content-type', 'application/json');
    var body =
    {
      username: usernameInput
    };
    return this.httpServ.post<any>(this.searchByUsernameUrl, body, {headers})
    .pipe(map(userList =>{
      console.log(userList);
      return userList;
    }))
  }
}
