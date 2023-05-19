import {Component, OnInit} from '@angular/core';
import {VehicleService} from "../../services/vehicle.service";
import {Vehicle, VehiclePage} from "../../models/Vehicle";

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.css']
})
export class VehicleComponent implements OnInit{
  errors!:string
  vehiclesData:Vehicle[]|undefined;
  vehiclePage!:VehiclePage;

  constructor(private vehicleServices:VehicleService) {
  }
  ngOnInit(): void {
    this.vehicleServices.getAllVehicles().subscribe({
      next:(data)=>{
        this.vehiclesData=data;
        this.vehiclePage=this.getVehiclePage(0)
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

}