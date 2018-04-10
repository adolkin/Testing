import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from './../shared/shared.module';

import { AboutComponent } from './components/about/about.component';
import { BannerComponent } from './components/banner/banner.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { LightSwitchComponent } from './components/light-switch/light-switch.component';

import { TwainService } from './services/twain.service';
import { MasterService } from './services/master.service';
import { ValueService } from './services/value.service';
import { HeroService } from './services/hero.service';
import { UserService } from './services/user.service';
import { BannerInitialComponent } from './components/banner-initial/banner-initial.component';
import { BannerBindingComponent } from './components/banner-binding/banner-binding.component';
import { BannerExternalComponent } from './components/banner-external/banner-external.component';
import { TwainComponent } from './components/twain/twain.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  declarations: [
    AboutComponent,
    BannerComponent,
    WelcomeComponent,
    LightSwitchComponent,
    BannerInitialComponent,
    BannerBindingComponent,
    BannerExternalComponent,
    TwainComponent
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
