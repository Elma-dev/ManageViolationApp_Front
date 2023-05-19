import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RadarComponent} from "./components/radar/radar.component";
import {InfractionComponent} from "./components/infraction/infraction.component";
import {VehicleComponent} from "./components/vehicle/vehicle.component";

const routes: Routes = [
  {path:'radars',component:RadarComponent},
  {path:'infractions',component:InfractionComponent},
  {path:'vehicles',component:VehicleComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
