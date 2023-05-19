import {Component, OnInit} from '@angular/core';
import {RadarService} from "../../services/radar.service";
import {Radar, RadarPage} from "../../models/Radar";

@Component({
  selector: 'app-radar',
  templateUrl: './radar.component.html',
  styleUrls: ['./radar.component.css']
})

export class RadarComponent implements OnInit{

  radarData:Radar[]|undefined
  radarPages!:RadarPage
  indxPages!:number[]
  error!:String
  constructor(private radarServices:RadarService) {
  }

  ngOnInit(): void {
    console.log("yes")
    this.radarServices.getAllRadars().subscribe({
      next:(data)=>{
        this.radarData=data;
        this.radarPages=this.getRadarPages(0);
        this.indxPages=Array(this.radarPages.nbrTotal).fill(1).map((v,k)=>k)
      },
      error:(er)=>{
        this.error=er.name
      }
    })
  }

  public getRadarPages(page:number):any {
    if(this.radarData!=undefined){
      let size=7
      let nbrTotalePages=~~(this.radarData.length/size);
      nbrTotalePages=this.radarData.length%size==0?nbrTotalePages:nbrTotalePages+1;
      let radarPage=this.radarData.slice(page*size,page*size+size);
      return {data:radarPage,page:page,size:size,totalNbrPages:nbrTotalePages}
    }
  }

  public changePage(page:number){
    this.radarPages=this.getRadarPages(page);
  }


}
