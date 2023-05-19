import {Owner} from "./Owner";

export interface Vehicle{
  registrationNumber:string;
  brand:string;
  model:number;
  fiscalPower:number;
  owner:Owner;
}

