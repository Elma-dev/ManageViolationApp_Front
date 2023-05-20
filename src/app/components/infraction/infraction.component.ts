import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {InfractionsService} from "../../services/infractions.service";
import {Infraction, InfractionPage} from "../../models/Infraction";
// @ts-ignore
import pdfMake from "node_modules/pdfmake/build/pdfmake";
// @ts-ignore
import pdfFonts from "node_modules/pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import * as JsBarcode from 'jsbarcode';


import Swal from "sweetalert2"
import {FormBuilder, FormGroup} from "@angular/forms";




@Component({
  selector: 'app-infraction',
  templateUrl: './infraction.component.html',
  styleUrls: ['./infraction.component.css']
})
export class InfractionComponent implements OnInit{
  @ViewChild('barcode', { static: true }) barcodeElement!: ElementRef;
  infractionsData:Infraction[]|undefined
  infractionPage!:InfractionPage;
  pageIndex!:number[];
  errors!:string;
  formGroup!:FormGroup
  payed!:number
  infractionNbr!:number



  constructor(private infractionServices:InfractionsService,private formBuilder:FormBuilder) {
    this.formGroup=this.formBuilder.group({
      keyword:this.formBuilder.control(null)
    })
  }
  ngOnInit(): void {
    this.infractionServices.getAllInfraction().subscribe({
        next:(data)=>{
          this.infractionsData=data
          this.infractionPage=this.getInfractionPage(0);
          this.pageIndex=Array(this.infractionPage.totalNbrPages).fill(1).map((v,k)=>k);
          this.payed=this.infractionsData!.filter(d=>d.payed==true).length
          this.infractionNbr=this.infractionsData!.length

        },
        error:(er)=>{
          this.errors=er.name;
        }
    })
  }

  public getInfractionPage(page:number):any {
    if(this.infractionsData!=undefined){
      let size=5
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


  // Generate the barcode image and update the docDefinition
    const barcodeCanvas = document.createElement('canvas');
    JsBarcode(barcodeCanvas, infr!.id.toString(), {
      format: 'CODE128',
      displayValue: false
    });
    const barcodeDataURL = barcodeCanvas.toDataURL();

    let docDefinition = {
      header: {
        columns: [
          {
            text: "Infraction: " + infr!.id,
            style: 'headerText',
            alignment: 'center'
          },
          {
            image: barcodeDataURL,
            fit: [100, 100],
            alignment: 'center'
          }
        ],
        margin: [0, 0, 0, 10]
      },
      content: [
        {
          text: 'Customer Details',
          style: 'sectionHeader',
          border: [false, false, false, true],
          margin: [0, 10, 0, 5]
        },
        {
          columns: [
            {
              text: 'Vehicle Registration Number: ' + infr!.registrationNumber,
              style: 'vehicleDetails',
              border: [true, true, true, false]
            },
            {
              text: 'Owner: ' + infr!.vehicle.owner.name,
              style: 'vehicleDetails',
              border: [true, true, true, false]
            }
          ]
        },
        {
          text: 'Model: ' + infr!.vehicle.model,
          style: 'vehicleDetails',
          border: [false, false, false, true],
          margin: [0, 0, 0, 10]
        },
        {
          text: 'Radar Details',
          style: 'sectionHeader',
          border: [false, false, false, true],
          margin: [0, 10, 0, 5]
        },
        {
          columns: [
            {
              text: 'Radar Id: ' + infr!.radar.id,
              style: 'radarDetails',
              border: [true, true, true, false]
            },
            {
              text: 'Vehicle Speed: ' + ~~(infr!.vehicleSpeed),
              style: 'radarDetails',
              border: [true, true, true, false]
            }
          ]
        },
        {
          text: 'Amount: ' + infr!.amount,
          style: 'amountDetails',
          border: [false, false, false, true],
          margin: [0, 0, 0, 10]
        }
      ],
      styles: {
        header: {
          fontSize: 24,
          bold: true,
          color: '#3366ff',
          margin: [0, 0, 0, 20]
        },
        sectionHeader: {
          fontSize: 18,
          bold: true,
          color: '#6699ff',
          margin: [0, 20, 0, 10]
        },
        vehicleDetails: {
          fontSize: 14,
          margin: [0, 0, 20, 5]
        },
        radarDetails: {
          fontSize: 14,
          margin: [0, 0, 20, 5],
          fillColor: '#f2f2f2'
        },
        amountDetails: {
          fontSize: 14,
          margin: [0, 0, 0, 20],
          fillColor: '#ffffcc'
        }
      }
    };
  //   console.log(barcodeDataURL);
    docDefinition.header.columns[1].image = barcodeDataURL;

      pdfMake.createPdf(docDefinition).open();
    Swal.fire(
      'Good job!',
      'The Violation Has Ben Downloaded !',
      'success'
    )

  }

  setPayed(id: number) {
    Swal.fire(
      'Are you sure?',
      '',
      'question'
    ).then(r=>{
      if(r.value==true){
        this.infractionPage.infractionPage.map(i=>{i.id==id?i.payed=!i.payed:""})
        this.payed=this.infractionsData!.filter(d=>d.payed==true).length
    }})

  }

  searchInfraction() {
    let key=this.formGroup.value.keyword;
    let data=this.infractionsData!.filter(r=> {return (r.id==key||r.amount==key || r.vehicle.brand.includes(key) || r.vehicle.owner.name.includes(key))})
    //alert(this.radarPages.data.filter(r=>r.id==key).length==0)

    if(data.length!=0){
      this.changePage(this.infractionPage.page)
      this.infractionPage.infractionPage=data
    }
    else {
      this.changePage(this.infractionPage.page)
    }
  }
}
