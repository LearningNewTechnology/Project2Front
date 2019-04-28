import { Component, OnInit } from '@angular/core';
import { UserCredentialService } from '../services/user-credential.service';
import { User } from '../user';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  submitted: boolean = false;
  registerForm: FormGroup;
  message: string = 'failure';
  constructor(private registerServ: UserCredentialService,
    private formBuilder: FormBuilder, private router: Router) { }

  registerUser(){
      this.submitted = true;
      if(this.registerForm.invalid){
        return;
      }
      let temp = new User;
      temp.firstName = ""+this.f.firstName.value;
      temp.username = ""+this.f.username.value;
      temp.password = ""+this.f.password.value;
      temp.lastName = ""+this.f.lastName.value;
      temp.email = ""+this.f.email.value;
      console.log(temp.firstName + " " + temp.lastName + " " + temp.username + " " + temp.password + " " + temp.email);
      this.registerServ.registerNewUser(temp).pipe(first()).subscribe(
        data => {
          this.message = 'success';
          console.log("10  ",data);
        },
        error =>{
          console.log("error 10:  " + error);
        }
      )
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(25)]],
      email: ['', [Validators.required, Validators.email]],
      firstName: ['', [Validators.required]],
      lastName: ['',  [Validators.required]]
    });

  }
  get f() { return this.registerForm.controls; }

}
