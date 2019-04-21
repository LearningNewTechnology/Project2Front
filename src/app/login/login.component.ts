import { Component, OnInit } from '@angular/core';
import { UserCredentialService } from '../services/user-credential.service';
import { User } from '../user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserCredentialService]
})
export class LoginComponent implements OnInit {
  public isOnLoginPage: boolean = true;
  userN: string;
  passW: string;
  user: User;
  _message: string = "";
  constructor(private usercredentialservice: UserCredentialService) {
  }
  getIsLoginPage(): boolean{
    return this.isOnLoginPage;
  }

  authenticateUser(){
    console.log("We are here 1" + this.userN);
    this.user.username = this.userN;
    console.log("We are here 2 " + this.passW);
    this.user.password = this.passW;
    
    this.usercredentialservice.authenticate(this.user).then(res =>
     {
       console.log("response id: " + res.id); 
      this.user.id = res.id;
      console.log("response firstName: " + res.firstName);
      this.user.firstName = res.firstName;
      console.log("response lastName: " + res.lastName);
      this.user.lastName = res.lastName;
      console.log("response email: " + res.email);
      this.user.email = res.email;
      console.log("Success here");
      this._message = this.usercredentialservice._message;
      if(this.user.id != null){
        console.log("We are here 5.1 ");
        window.location.assign("home");
      }
      else{
        console.log("We are here 5.2 ")
        window.location.reload(true);
      }
     }
      );
    console.log("AuthenticateUser is finished");
  }
  sendToRegister(){
    window.location.assign("register");
  }
  ngOnInit() {
    this.user = new User();
  }

}
