import { Hero } from './../../core/models/hero';

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'dashboard-hero',
  templateUrl: './dashboard-hero.component.html',
  styleUrls: ['./dashboard-hero.component.css']
})
export class DashboardHeroComponent implements OnInit {
  @Input() hero: Hero;
  @Output() selected = new EventEmitter<Hero>();
  
  constructor() { }

  ngOnInit() {
  }

  click() { this.selected.emit(this.hero); }
}
