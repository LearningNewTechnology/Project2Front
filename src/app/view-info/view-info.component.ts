import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { LocalStorageService } from '../services/local-storage.service';

@Component({
  selector: 'app-view-info',
  templateUrl: './view-info.component.html',
  styleUrls: ['./view-info.component.css']
})
export class ViewInfoComponent implements OnInit {
  index: number;
  firstName: string = 'Doan';
  lastName: string = 'Ha';
  email: string = 'dh@mail.com';
  searchResultList: User[];
  constructor(private localStorageServ: LocalStorageService) { }

  ngOnInit() {
    this.index = +(sessionStorage.getItem('searchUserId')) - 1;
    console.log(this.index);
    this.searchResultList = JSON.parse(this.localStorageServ.getSearchResult());
    console.log(this.searchResultList[this.index]);
  }

}
