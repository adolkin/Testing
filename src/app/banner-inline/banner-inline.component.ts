import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-banner-inline',
  templateUrl: './banner-inline.component.html',
  styleUrls: ['./banner-inline.component.css']
})
export class BannerInlineComponent implements OnInit {

  title = 'Test Tour of Heroes';

  constructor() { }

  ngOnInit() {
  }

}
