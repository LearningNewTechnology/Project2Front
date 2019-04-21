import { Injectable } from '@angular/core';
import { User } from '../user';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }
  saveUser(userInfo: User){
    localStorage.setItem('User', JSON.stringify(userInfo));
  }
  logout(){
    localStorage.removeItem('User');
  }
  checkUser(): boolean{
    if(localStorage.getItem('User') !== null)
      return true;
    return false;
  }
}
