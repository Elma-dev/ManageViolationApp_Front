import {Component, OnInit} from '@angular/core';
import {InfractionsService} from "../../services/infractions.service";
import {Infraction, InfractionPage} from "../../models/Infraction";
// @ts-ignore
import pdfMake from "node_modules/pdfmake/build/pdfmake";
// @ts-ignore
import pdfFonts from "node_modules/pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;


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

  public changePage(i: number) {
    this.infractionPage=this.getInfractionPage(i);
  }

  public downloadAsPDF(i:number){
    let infr=this.infractionsData?.find(e=>e.id==i)
    let docDefinition = {
      header:"  Infraction : "+infr!.id
      ,
      content: [
        // Previous configuration
        {

          text: 'Customer Details:\n\n'+
            '\tVehicle Registration Number : '+infr!.registrationNumber+
            '\nModel : '+infr!.vehicle.model+'\n' +
            'Owner : '+infr!.vehicle.owner.name+'\n\n' +
            'Radar Details:\n\n'+
            'Radar Id : '+infr!.radar.id+"\n"+
            'Vehicle Speed : '+~~(infr!.vehicleSpeed)+'\n\n'+
            'Amount : '+infr!.amount
          ,
          style: 'sectionHeader'
        }
      ],
      styles: {
        sectionHeader: {
          fontSize: 14,
          margin: [0, 15, 0, 15]
        }
      }
    }
    pdfMake.createPdf(docDefinition).open();
  }
}
