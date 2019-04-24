import { Component, OnInit } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { LocalStorageService } from '../services/local-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  providers: [LoginComponent]
})
export class NavbarComponent implements OnInit {
  private isLoggedIn: boolean;
  
  constructor(private sessionService: LocalStorageService, private router: Router) {
  }

  checkForUser(): boolean{
    this.isLoggedIn = this.sessionService.checkUser() != null || this.sessionService.checkUser() != undefined;
    return this.isLoggedIn;
  }

  logout(){
    this.sessionService.logout();
    this.router.navigate(["login"]);
  }

  ngOnInit() {
  }

}
