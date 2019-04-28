import { Component, OnInit } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { LocalStorageService } from '../services/local-storage.service';
import { Router } from '@angular/router';
import { SearchUserService } from '../services/search-user.service';
import { FormGroup, FormBuilder} from '@angular/forms';
import { User } from '../user';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  providers: [LoginComponent]
})
export class NavbarComponent implements OnInit {
  searchText: FormGroup;

  constructor(private sessionService: LocalStorageService, private formBuilder: FormBuilder, private router: Router, private searchServ: SearchUserService) {
  }

  checkForUser(): boolean{
    return this.sessionService.checkUser();
  }

  viewUserInfo(){
    this.sessionService.deleteSearchResult();

    if(this.router.url != "/viewInfo")
      this.router.navigate(["viewInfo"]);
    else
      window.location.reload(true);
  }
  goHome(){
    if(this.sessionService.getUser() != null){
      if(this.router.url == "/home")
      {
        window.location.reload(true);
      }
      else {
        this.router.navigate(["home"]);
      }
    }else{
      if(this.router.url != "/login"){
        this.router.navigate(["login"]);
      } else window.location.reload(true);
    }
  }
  searchByUsername(){ 
    let temp = this.searchServ.searchByUsername(this.searchText.controls.userInput.value)
      .subscribe(
        data => {
          if(data !== null && data !== undefined){
            this.sessionService.saveSearchResult(data as User[]);
            this.router.navigate(["viewSearchResult"]);
          }
        },
        error =>{
          console.log(error);
        }
      );
  }
  logout(){
    this.sessionService.logout();
    this.router.navigate(["login"]);
  }

  ngOnInit() {
    this.searchText = this.formBuilder.group({
        userInput: ['']
    });
  }

}
