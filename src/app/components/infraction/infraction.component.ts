import {Component, OnInit} from '@angular/core';
import {InfractionsService} from "../../services/infractions.service";
import {Infraction, InfractionPage} from "../../models/Infraction";
import {error} from "@angular/compiler-cli/src/transformers/util";

@Component({
  selector: 'app-infraction',
  templateUrl: './infraction.component.html',
  styleUrls: ['./infraction.component.css']
})
export class InfractionComponent implements OnInit{
  infractionsData:Infraction[]|undefined
  infractionPage!:InfractionPage;
  pageIndex!:number[];
  errors!:string;



  constructor(private infractionServices:InfractionsService) {
  }
  ngOnInit(): void {
    this.infractionServices.getAllInfraction().subscribe({
        next:(data)=>{
          this.infractionsData=data
          this.infractionPage=this.getInfractionPage(0);
          this.pageIndex=Array(this.infractionPage.totalNbrPages).fill(1).map((v,k)=>k);

        },
        error:(er)=>{
          this.errors=er.name;
        }
    })
  }

  public getInfractionPage(page:number):any {
    if(this.infractionsData!=undefined){
      let size=7
      let nbrTotalePages=~~(this.infractionsData.length/size);
      nbrTotalePages=this.infractionsData.length%size==0?nbrTotalePages:nbrTotalePages+1;
      let infractionPage=this.infractionsData.slice(page*size,page*size+size);
      return {infractionPage:infractionPage,page:page,size:size,totalNbrPages:nbrTotalePages}
    }
  }

  changePage(i: number) {
    this.infractionPage=this.getInfractionPage(i);
  }
}
