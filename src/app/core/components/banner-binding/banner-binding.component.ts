import { Component } from '@angular/core';

@Component({
  selector: 'app-banner-binding',
  template: '<h1>{{title}}</h1>',
  styles: ['h1 { color: green; font-size: 350%}']
})
export class BannerBindingComponent {

  title = 'Test Tour of Heroes';

}
