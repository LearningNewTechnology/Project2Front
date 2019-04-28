import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../services/local-storage.service';
import { User } from '../user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-search-result',
  templateUrl: './view-search-result.component.html',
  styleUrls: ['./view-search-result.component.css']
})
export class ViewSearchResultComponent implements OnInit {
  searchResult: User[];
  constructor(private sessionService: LocalStorageService, private router: Router) { }

  ngOnInit() {
    this.searchResult = JSON.parse(this.sessionService.getSearchResult());
  }
  showDetail(){
    var inputValue = (<HTMLInputElement>document.getElementById("view-detail")).value;
    sessionStorage.setItem('searchUserId', inputValue);
    this.router.navigate(["viewInfo"]);
  }
}
