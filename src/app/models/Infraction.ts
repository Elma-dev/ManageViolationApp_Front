import {Radar} from "./Radar";
import {Vehicle} from "./Vehicle";

export interface Infraction{
  id:number;
  date: string;
  idRadar:number;
  registrationNumber:string;
  radar:Radar;
  vehicle:Vehicle;
  vehicleSpeed: number;
  amount: 600;
  payed:boolean ;
}

export interface InfractionPage{
  infractionPage:Array<Infraction> ;
  page : number;
  size: number;
  totalNbrPages: number;


}
