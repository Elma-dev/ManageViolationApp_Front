import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RadarComponent } from './components/radar/radar.component';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import { InfractionComponent } from './components/infraction/infraction.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    RadarComponent,
    InfractionComponent
  ],

  imports: [
    BrowserModule,
    NgbModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
