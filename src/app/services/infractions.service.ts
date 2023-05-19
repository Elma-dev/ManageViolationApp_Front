import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, of, throwError} from "rxjs";
import {Infraction, InfractionPage} from "../models/Infraction";

@Injectable({
  providedIn: 'root'
})
export class InfractionsService {
  private infractions:Infraction[]|any;
  private infractionPage!:InfractionPage;

  constructor(private httpClient:HttpClient) { }

  public getAllInfraction():Observable<any>{
    return this.httpClient.get("http://localhost:8888/INFRACTION-MS/infractions");
  }

  public getInfractionPage(page:number,size:number):Observable<InfractionPage>{
    return of(this.infractions)

  }
  // public getCustomerPage(page:number,size:number):Observable<CustomerPages>{
  //   let nbrTotalePages=~~(this.customers.length/size);
  //   nbrTotalePages=this.customers.length%size==0?nbrTotalePages:nbrTotalePages+1;
  //   let customerPage=this.customers.slice(page*size,page*size+size);
  //   return of({customerPage:customerPage,page:page,size:size,totalNbrPages:nbrTotalePages})
  // }
}
