import { SharedModule } from './../shared/shared.module';
import { HeroService } from './services/hero.service';
import { UserService } from './services/user.service';
import { AboutComponent } from './components/about/about.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BannerComponent } from './components/banner/banner.component';
import { BannerInlineComponent } from './components/banner-inline/banner-inline.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { TwainService } from './services/twain.service';


@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  declarations: [
    AboutComponent,
    BannerComponent,
    BannerInlineComponent,
    WelcomeComponent
  ],
  exports: [
    BannerComponent,
    WelcomeComponent
  ],
  providers: [
    TwainService,
    UserService,
    HeroService
  ]
})
export class CoreModule { }
