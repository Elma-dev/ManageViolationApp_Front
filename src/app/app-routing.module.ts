import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RadarComponent} from "./components/radar/radar.component";
import {InfractionComponent} from "./components/infraction/infraction.component";
import {VehicleComponent} from "./components/vehicle/vehicle.component";
import {HomeComponent} from "./components/home/home.component";
import {AuthenticatComponent} from "./components/authenticat/authenticat.component";
import {NavbarComponent} from "./components/navbar/navbar.component";
import {AuthGuard} from "./guards/auth.guard";
import {AlreadyAuthGuard} from "./guards/already-auth.guard";

const routes: Routes = [
  {path:"login",component:AuthenticatComponent},
  {path:"",component:NavbarComponent,canActivate:[AuthGuard],children:[

      // {path:"",component:HomeComponent},
      {path:'home',component:HomeComponent},
      {path:'radars',component:RadarComponent},
      {path:'vehicles',component:VehicleComponent},
      {path:'infractions',component:InfractionComponent},
    ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
