import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RadarComponent } from './components/radar/radar.component';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import { InfractionComponent } from './components/infraction/infraction.component';
import { VehicleComponent } from './components/vehicle/vehicle.component';
import { HomeComponent } from './components/home/home.component';
import {ReactiveFormsModule} from "@angular/forms";
import { AuthenticatComponent } from './components/authenticat/authenticat.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    RadarComponent,
    InfractionComponent,
    VehicleComponent,
    HomeComponent,
    AuthenticatComponent
  ],

  imports: [
    BrowserModule,
    NgbModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
