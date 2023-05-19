import {Owner} from "./Owner";

export interface Vehicle{
  registrationNumber:string;
  brand:string;
  model:number;
  fiscalPower:number;
  owner:Owner;
}

export interface VehiclePage{
  data:Vehicle[];
  page:number;
  size:number;
  nbrTotal:number;
}

