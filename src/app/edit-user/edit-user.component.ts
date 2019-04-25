import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../services/local-storage.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  editForm = FormGroup;

  constructor(private localStorageServ: LocalStorageService) { }

ngOnInit() {
    let user = this.localStorageServ.getUser();
    console.log(user)

  }
onSubmit(){
  
}
}
