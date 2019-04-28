import { Component, OnInit } from '@angular/core';
import { UserCredentialService } from '../services/user-credential.service';
import { User } from '../user';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { LocalStorageService } from '../services/local-storage.service';

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
    private router: Router, private route: ActivatedRoute, private localStorageServ: LocalStorageService) {
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
    console.log("We are here 1");
    this.submitted = true;
    this.user.username = this.f.username.value;
    console.log("we are here 2");
    this.user.password = this.f.password.value;
    console.log("we are here 3");
    if(this.loginForm.invalid){
      return;
    }
    this.usercredentialservice.login(this.user.username, this.user.password).pipe(first()).subscribe(
      data => {
        console.log("2:  " + data);
        if(data !== null && data.id > 0)
          {
            this.router.navigate(["home"]);
          }
        else console.log("No user");
      },
      error => {
        console.log(error);
      }
    )
  }
}
