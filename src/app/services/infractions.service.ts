import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class InfractionsService {

  constructor(private httpClient:HttpClient) { }

  public getAllInfraction():Observable<any>{
    return this.httpClient.get("http://localhost:8888/INFRACTION-MS/infractions")
  }
}
