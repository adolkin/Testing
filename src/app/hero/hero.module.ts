import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { HeroListComponent } from './hero-list/hero-list.component';
import { routedComponents, HeroRoutingModule } from './hero-routing.module';

@NgModule({
  imports:      [ SharedModule, HeroRoutingModule ],
  declarations: [ routedComponents ]
})
export class HeroModule { }

