import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-info',
  templateUrl: './view-info.component.html',
  styleUrls: ['./view-info.component.css']
})
export class ViewInfoComponent implements OnInit {
  firstName: string = 'Doan';
  lastName: string = 'Ha';
  email: string = 'dh@mail.com';
  constructor() { }

  ngOnInit() {
  }

}
