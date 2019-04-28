import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../services/local-storage.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { User } from '../user';
import { Router } from '@angular/router';
import { UserCredentialService } from '../services/user-credential.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  editForm : FormGroup;
  user : User;
  public data: any;
  selectedFile: File = null;

  constructor(private _editService: UserCredentialService, private localStorageServ: LocalStorageService, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.data = JSON.parse(this.localStorageServ.getUser());
    
    console.log(this.data);
    console.log(this.data.id);
    

    this.editForm = this.formBuilder.group({
      username: [''],
      email: [''],
      firstName: [''],
      lastName: [''],
      profilePic :[''],
      password: ['']
    });
    

  }
  onSubmit() {
    console.log(this.editForm.value);

    // let editUser = {
    //   "username" : this.editForm.value["username"],
    //   "email" : this.editForm.value["email"],
    //   "firstName" : this.editForm.value["firtName"],
    //   "lastName" : this.editForm.value["lastName"]

    // }
    // let jsonEditUser = JSON.stringify(editUser);
    // console.log("editUser = " + JSON.stringify(editUser));
    // console.log(editUser)
    const formData = new FormData();
    if (this.editForm.value["username"] != ""){
      formData.append('username', this.editForm.get('username').value);
    }

    if (this.editForm.value["email"] != ""){
      formData.append('email', this.editForm.get('email').value);
    }

    if (this.editForm.value["firstName"] != ""){
      formData.append('firstName', this.editForm.get('firstName').value);
    }

    if (this.editForm.value["lastName"] != ""){
      formData.append('lastName', this.editForm.get('lastName').value);
    }
    if (this.editForm.value["password"] != ""){
      formData.append('password', this.editForm.get('password').value);
    }

    if (this.editForm.value["profilePic"] != ""){
      formData.append('file', this.selectedFile, this.selectedFile.name);
    }
    
    formData.append('id', this.data.id);
    console.log( "console logging" + formData);


    this._editService.editUser(formData)
    .subscribe((response) => {console.log(response)}, (error) => {console.log(error)});

    this._editService.editUser(formData).subscribe(
      data => {
        if(data !== null)
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

  fileSelected(event) {
    this.selectedFile =<File> event.target.files[0];
  }

}
