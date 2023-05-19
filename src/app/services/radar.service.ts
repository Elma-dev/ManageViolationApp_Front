import { Injectable } from '@angular/core';
import {Radar} from "../models/Radar";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RadarService {
  radars!:Radar[];
  constructor(private httpClient:HttpClient) { }

  public getAllRadars():Observable<any>{

    return this.httpClient.get("http://localhost:8888/RADAR-MS/radars");
  }
}
