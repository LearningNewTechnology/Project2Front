import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from './user';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private httpServ: HttpClient) { }

    getAll() {
        return this.httpServ.get<User[]>(`url`);
    }

    getById(id: number) {
        return this.httpServ.get(`url`);
    }

    register(newUser: any) {

        let httpOptions = {
            headers: new HttpHeaders({
              'Content-Type':  'application/json',
              'Access-Control-Allow-Origin':'*'
            })
          };
        // let body = JSON.stringify(newUser);
    
       
        console.log(newUser)
        const headers = new HttpHeaders({'Access-Control-Allow-Origin':'*'}).set('content-type','application/json');
        // return this.httpServ.post(`http://localhost:8080/Project2/register.do`, newUser, {headers});
        return this.httpServ.post<User>('http://localhost:8080/Project2/register.do', newUser, {headers})

    }

    update(user: User) {
        return this.httpServ.put(`url`, user);
    }

    delete(id: number) {
        return this.httpServ.delete(`url`);
    }
}
