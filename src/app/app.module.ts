import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { CoreModule } from './core/core.module';

import { AppComponent } from './app.component';
import { LightSwitchComponent } from './demo/light-switch/light-switch.component';



@NgModule({
  declarations: [
    AppComponent,
    LightSwitchComponent
  ],
  imports: [
    BrowserModule,
    SharedModule,
    CoreModule,
    DashboardModule,  
    AppRoutingModule  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
