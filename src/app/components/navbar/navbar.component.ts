import {Component, OnInit} from '@angular/core';
import {AuthenticatService} from "../../services/authenticat.service";
import {Route, Router} from "@angular/router";
import {Observable, of} from "rxjs";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{

  isLogged!:boolean

  constructor(public authenticateUser:AuthenticatService,private router:Router) {

  }

  ngOnInit(): void {
    this.isLogged=this.authenticateUser.isAuthenticate()
    console.log(this.isLogged)
  }

  logout() {
    this.authenticateUser.logout();
    this.router.navigateByUrl("/login")
  }
}
