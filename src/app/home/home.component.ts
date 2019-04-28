import { Component, OnInit } from '@angular/core';
import { SocialPostService } from '../services/social-post.service';
import { Post } from '../post';
import { first, map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  newsFeedList: Post[];
  constructor(private newsFeedServ: SocialPostService) { 
  }
  refresh(){
    window.location.reload(true);
  }
  addNewPost(){
    
  }
  ngOnInit() {
    this.newsFeedServ.getNewFeeds().subscribe(
      data => {
        console.log(data);
        this.newsFeedList =  data;
      },
      error => {
        console.log(error);
      }
    );
  }

}
