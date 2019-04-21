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
  constructor(private usercredentialservice: UserCredentialService) {
  }
  getIsLoginPage(): boolean{
    return this.isOnLoginPage;
  }

  authenticateUser(){
    console.log("We are here 1 " + this.userN);
    this.user.username = this.userN;
    console.log("We are here 2 " + this.passW);
    this.user.password = this.passW;
    
    this.usercredentialservice.authenticate(this.user).then(res =>
     {
       console.log(res.id); 
      this.user.id = res.id;
      console.log(res.firstname);
      this.user.firstname = res.firstname;
      console.log(res.lastname);
      this.user.lastname = res.lastname;
      console.log(res.email);
      this.user.email = res.email;
      console.log("Success here")
     }
      );
    console.log("We are here 5");
    //window.location.replace("home");
  }
  ngOnInit() {
    this.user = new User();
  }

}
