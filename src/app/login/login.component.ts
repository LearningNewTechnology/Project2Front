import { Component, OnInit } from '@angular/core';
import { UserCredentialService } from '../services/user-credential.service';
import { User } from '../user';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';

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
  loginForm: FormGroup;
  submitted: boolean = false;
  returnUrl: string;

  constructor(private usercredentialservice: UserCredentialService, private formBuilder: FormBuilder,
    private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.user = new User();
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '';
  }

  get f() {return this.loginForm.controls;}

  getIsLoginPage(): boolean {
    return this.isOnLoginPage;
  }

  onLogin(){
    this.submitted = true;
    this.user.username = this.f.username.value;
    this.user.password = this.f.password.value;
    if(this.loginForm.invalid){
      return;
    }
    this.usercredentialservice.login(this.user.username, this.user.password).pipe(first()).subscribe(
      data => {
        if(data !== null && data.id > 0)
        {
            this.router.navigate(["home"]);
        }
        else {
          console.log("No user");
          alert("Sorry. Invalid username or password combination.")
      
      }
      },
      error => {
        console.log(error);
      }
    )
  }

  onReset(){}
}
