import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RadarComponent} from "./components/radar/radar.component";

const routes: Routes = [
  {path:'radars',component:RadarComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
