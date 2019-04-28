import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { ResetUserService } from '../services/reset-user.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.css']
})
export class ResetComponent implements OnInit {

  submitted: boolean = false;
  resetForm: FormGroup;
  message: string = 'failure';
  constructor(private resetServ: ResetUserService,
    private formBuilder: FormBuilder, private router: Router) { }

  resetPass(){
      this.submitted = true;
      if(this.resetForm.invalid){
        return;
      }
      
      this.resetServ.resetPass(this.resetForm.value).pipe(first()).subscribe(
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
    this.resetForm = this.formBuilder.group({ 
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });

  }
  get f() { return this.resetForm.controls; }


}
