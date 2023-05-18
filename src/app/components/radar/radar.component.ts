import {Component, OnInit} from '@angular/core';
import {RadarService} from "../../services/radar.service";

@Component({
  selector: 'app-radar',
  templateUrl: './radar.component.html',
  styleUrls: ['./radar.component.css']
})
export class RadarComponent implements OnInit{

  constructor(private radarServices:RadarService) {
  }
  ngOnInit(): void {
  }

}
