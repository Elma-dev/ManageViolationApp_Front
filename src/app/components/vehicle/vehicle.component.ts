import {Component, OnInit} from '@angular/core';
import {VehicleService} from "../../services/vehicle.service";
import {Vehicle, VehiclePage} from "../../models/Vehicle";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.css']
})
export class VehicleComponent implements OnInit{
  errors!:string
  vehiclesData:Vehicle[]|undefined;
  vehiclePage!:VehiclePage;
  indxPage!:number[];
  formGroup!:FormGroup;
  nbrVehicle!:number
  nbrOwners!:number

  constructor(private vehicleServices:VehicleService,private formBuilder:FormBuilder) {
    this.formGroup=formBuilder.group({
      keyword:this.formBuilder.control(null)
    })
  }
  ngOnInit(): void {
    this.vehicleServices.getAllVehicles().subscribe({
      next:(data)=>{
        this.vehiclesData=data;
        this.vehiclePage=this.getVehiclePage(0)
        this.indxPage=Array(this.vehiclePage.nbrTotal).fill(1).map((v,k)=>k)
        this.nbrVehicle=this.vehiclesData!.length
        this.nbrOwners=new Set(this.vehiclesData!.map(value => {
          value.owner.name;
        })).size
      },
      error:(er)=>{
        this.errors=er.name
      }
    })
  }

  public getVehiclePage(page:number):any {
    if(this.vehiclesData!=undefined){
      let size=7
      let nbrTotalePages=~~(this.vehiclesData.length/size);
      nbrTotalePages=this.vehiclesData.length%size==0?nbrTotalePages:nbrTotalePages+1;
      let vehiclePage=this.vehiclesData.slice(page*size,page*size+size);
      return {data:vehiclePage,page:page,size:size,totalNbrPages:nbrTotalePages}
    }
  }

  public changePage(page:number){
    this.vehiclePage=this.getVehiclePage(page);
  }

  searchVehicle() {
    let key=this.formGroup.value.keyword;
    let data=this.vehiclesData!.filter(r=> {return (r.model==key||r.brand.includes(key) || r.owner.name.includes(key) || r.fiscalPower==key || r.registrationNumber.includes(key))})
    //alert(this.radarPages.data.filter(r=>r.id==key).length==0)

    if(data.length!=0){
       this.changePage(this.vehiclePage.page)
       this.vehiclePage.data=data
    }
    else {
       this.changePage(this.vehiclePage.page)
    }

  }
}
