import {Component, OnInit} from '@angular/core';
import {RadarService} from "../../services/radar.service";
import {Radar, RadarPage} from "../../models/Radar";
import {FormBuilder, FormGroup} from "@angular/forms";

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
  formGroup!:FormGroup
  radarNbr!:number;
  radarOn!:number
  constructor(private radarServices:RadarService,private formBuilder:FormBuilder) {
    this.formGroup=this.formBuilder.group({
      keyword:this.formBuilder.control(null)
    })
  }

  ngOnInit(): void {
    console.log("yes")
    this.radarServices.getAllRadars().subscribe({
      next:(data)=>{
        this.radarData=data;
        this.radarPages=this.getRadarPages(0);
        this.indxPages=Array(this.radarPages.nbrTotal).fill(1).map((v,k)=>k)
        this.radarNbr=this.radarData!.length
        this.radarOn=~~(this.radarNbr/2)
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


  searchRadars() {
    let key=this.formGroup.value.keyword;
    let data=this.radarData!.filter(r=> r.id==key)
    //alert(this.radarPages.data.filter(r=>r.id==key).length==0)

    if(data.length!=0){
      this.changePage(this.radarPages.page)
      this.radarPages.data=data
    }
    else {
      this.changePage(this.radarPages.page)
    }

  }
}
