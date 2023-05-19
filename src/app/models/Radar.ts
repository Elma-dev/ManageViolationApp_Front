
export interface Radar{
  id:number;
  vitessMax:number;
  courdonnees:number[];
}

export interface RadarPage{
  data:Radar[];
  page:number;
  size:number;
  nbrTotal:number;
}
