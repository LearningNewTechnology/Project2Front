import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { LocalStorageService } from '../services/local-storage.service';
import { Post } from '../post';

@Component({
  selector: 'app-view-info',
  templateUrl: './view-info.component.html',
  styleUrls: ['./view-info.component.css']
})
export class ViewInfoComponent implements OnInit {
  user: User;
  index: number;
  // username: string;
  // firstName: string;
  // lastName: string;
  // email: string;
  // postList: Post[];
  constructor(private localStorageServ: LocalStorageService) { }

  ngOnInit() {
    if(this.localStorageServ.getSearchResult() != null){
      let searchResultList = JSON.parse(this.localStorageServ.getSearchResult());
      this.index = +(sessionStorage.getItem('searchUserId')) - 1;
      let userToBeViewed = searchResultList[this.index];

         this.user = userToBeViewed;
      // this.firstName = userToBeViewed.firstName;
      // this.lastName = userToBeViewed.lastName;
      // this.email = userToBeViewed.email;
      // this.username = userToBeViewed.username;
      // this.postList = userToBeViewed.postList;
    }
    else {
      let user = JSON.parse(this.localStorageServ.getUser());
      this.user = user;
      // this.firstName = user.firstName;
      // this.lastName = user.lastName;
      // this.email = user.email;
      // this.postList = user.postList;
      // this.username = user.username;
    }

  }

}
