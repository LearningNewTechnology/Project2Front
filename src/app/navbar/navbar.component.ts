import { Component, OnInit } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { LocalStorageService } from '../services/local-storage.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  providers: [LoginComponent]
})
export class NavbarComponent implements OnInit {
  private loginComp: LoginComponent;
  private isLoggedIn: boolean;
  
  constructor(private sessionService: LocalStorageService) {
    this.isLoggedIn = sessionService.checkUser();;
  }
  checkForUser(): boolean{
    return this.isLoggedIn;
  }
  ngOnInit() {
  }

}
