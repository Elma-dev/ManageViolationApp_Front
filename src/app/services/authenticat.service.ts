import { Injectable } from '@angular/core';
import {User} from "../models/User";
import {UUID} from "angular2-uuid";
import {Observable, of, throwError} from "rxjs";
import {throwErr} from "sweetalert/typings/modules/utils";

@Injectable({
  providedIn: 'root'
})
export class AuthenticatService {
  appUsers:User[]=[]
  authenticatUser:User|undefined

  constructor() {
    this.appUsers.push({userId:UUID.UUID(),username:"user1",password:"1234",roles:["ADMIN","USER"]});
    this.appUsers.push({userId:UUID.UUID(),username:"user2",password:"1234",roles:["USER"]});
    this.appUsers.push({userId:UUID.UUID(),username:"admin",password:"admin",roles:["ADMIN"]});
  }

  //Valid Information Login
  public login(username:string,password:string):Observable<User>{
    let user=this.appUsers.find(u=>{return u.username===username});
    if(user==undefined){
      return throwError(()=>new Error("Some Information Incorrect!"));
    }
    if(user.password!=password){
      return throwError(()=>new Error("Some Information Incorrect!"));
    }
    return of(user)
  }

  //Authenticate
  public authenticate(user:User):Observable<boolean>{
    this.authenticatUser=user;
    localStorage.setItem("user",JSON.stringify({username:user.username,role:user.roles,jwt:"token"}))
    return of(true)
  }

  //getRole
  public hasRole(role:string):boolean{
    return this.authenticatUser!.roles.includes(role)
  }

  //userIs Authenticate
  public isAuthenticate():boolean{
    return (this.authenticatUser!=undefined)
  }

  public logout():Observable<boolean>{
    this.authenticatUser=undefined
    localStorage.removeItem("user")
    return of(true)
  }

}
