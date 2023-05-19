import {Component, OnInit} from '@angular/core';
import {InfractionsService} from "../../services/infractions.service";
import {Infraction} from "../../models/Infraction";
import {error} from "@angular/compiler-cli/src/transformers/util";

@Component({
  selector: 'app-infraction',
  templateUrl: './infraction.component.html',
  styleUrls: ['./infraction.component.css']
})
export class InfractionComponent implements OnInit{
  infractionsData:Infraction[]|undefined
  errors!:string

  constructor(private infractionServices:InfractionsService) {
  }
  ngOnInit(): void {
    this.infractionServices.getAllInfraction().subscribe({
        next:(data)=>{
          console.log(data)
          this.infractionsData=data
        },
        error:(er)=>{
          this.errors=er.name;
        }
    })
  }

}
