import {Component, OnInit} from '@angular/core';
import {RadarService} from "../../services/radar.service";
import {Radar} from "../../models/Radar";

@Component({
  selector: 'app-radar',
  templateUrl: './radar.component.html',
  styleUrls: ['./radar.component.css']
})

export class RadarComponent implements OnInit{

  radarData:Radar[]|undefined
  error!:String;
  constructor(private radarServices:RadarService) {
  }

  ngOnInit(): void {
    console.log("yes")
    this.radarServices.getAllRadars().subscribe({
      next:(data)=>{
        console.log(data)

        this.radarData=data
      },
      error:(er)=>{
        this.error=er
      }
    })
  }


}
