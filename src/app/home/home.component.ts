import { Component, OnInit } from '@angular/core';
import { SocialPostService } from '../services/social-post.service';
import { Post } from '../post';
import { first, map } from 'rxjs/operators';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  newsFeedList: Post[];
  newPost: FormGroup;
  constructor(private newsFeedServ: SocialPostService, private formBuilder: FormBuilder) { 
  }
  refresh(){
    window.location.reload(true);
  }
  addNewPost(){
    
  }
  ngOnInit() {
    this.newPost = this.formBuilder.group({
      description: [''],
      picture: ['']
    });

    this.newsFeedServ.getNewFeeds().subscribe(
      data => {
        this.newsFeedList =  data;
      },
      error => {
        console.log(error);
      }
    );
  }

}
