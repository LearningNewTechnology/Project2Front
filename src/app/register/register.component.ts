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
      this.registerServ.registerNewUser(this.registerForm.value).pipe(first()).subscribe(
        data => {
          this.message = 'success';
          console.log(data);
        },
        error =>{
          console.log("1:  " + error);
        }
      )
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(25)]],
      email: ['', [Validators.required, Validators.email]],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required]
    });

  }
  get f() { return this.registerForm.controls; }

}
