import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from './../shared/shared.module';

import { AboutComponent } from './components/about/about.component';
import { BannerComponent } from './components/banner/banner.component';
import { BannerInlineComponent } from './components/banner-inline/banner-inline.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { LightSwitchComponent } from './components/light-switch/light-switch.component';

import { TwainService } from './services/twain.service';
import { MasterService } from './services/master.service';
import { ValueService } from './services/value.service';
import { HeroService } from './services/hero.service';
import { UserService } from './services/user.service';
import { BannerInitialComponent } from './components/banner-initial/banner-initial.component';
import { BannerBindingComponent } from './components/banner-binding/banner-binding.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  declarations: [
    AboutComponent,
    BannerComponent,
    BannerInlineComponent,
    WelcomeComponent,
    LightSwitchComponent,
    BannerInitialComponent,
    BannerBindingComponent
  ],
  exports: [
    BannerComponent,
    WelcomeComponent
  ],
  providers: [
    TwainService,
    UserService,
    HeroService,
    ValueService,
    MasterService
  ]
})
export class CoreModule { }
