import { Component, OnInit } from '@angular/core';
import { SocialPostService } from '../services/social-post.service';
import { Post } from '../post';
import { first, map } from 'rxjs/operators';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserCredentialService } from '../services/user-credential.service';
import { LocalStorageService } from '../services/local-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  postForm: FormGroup;
  likeForm: FormGroup;
  newsFeedList: Post[];
  newPost: FormGroup;
  selectedFile: File = null;
  public data: any;
  constructor(private newsFeedServ: SocialPostService, private formBuilder: FormBuilder, private _postService: UserCredentialService, private _localStorageServ: LocalStorageService, private router: Router) { 
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

    this.data = JSON.parse(this._localStorageServ.getUser());
    console.log(this.data);
    console.log(this.data.id);

    this.postForm = this.formBuilder.group({
      description: [''],
      postPic :[''],
      userId: [this.data.id]
    });

    this.likeForm = this.formBuilder.group({
      postId: [''],
      userId: [this.data.id]
    })


  }
  onSubmit() {
    
    console.log(this.postForm.value)

    const formData = new FormData();
    formData.append('userId', this.postForm.get('userId').value);
    if (this.postForm.value["description"] != ""){
      formData.append('description', this.postForm.get('description').value);
    }
    if (this.postForm.value["postPic"] != ""){
      formData.append('file', this.selectedFile, this.selectedFile.name);
    }
    console.log(formData);

    this.newsFeedServ.addNewPost(formData).pipe(first()).subscribe(
      data => {
        alert("You just created a post!");

      },
      error =>{
        alert("Sorry. There was an error creating your post.")
        console.log(error);
      }
    )
  }
  fileSelected(event) {
    this.selectedFile =<File> event.target.files[0];
  }
  onLike(){
    console.log(this.likeForm.controls.postId.value);
//    this.newsFeedServ.likeAPost(this.likeForm.value)
  }

}
