import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {User} from "../../models/User";
import {AuthenticatService} from "../../services/authenticat.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-authenticat',
  templateUrl: './authenticat.component.html',
  styleUrls: ['./authenticat.component.css']
})
export class AuthenticatComponent implements OnInit{

  error!:string
  formGroup!:FormGroup
  user!:User



  constructor(private formBuilder:FormBuilder,private authentication:AuthenticatService,private router:Router) {
  }

  ngOnInit(): void {
    this.formGroup=this.formBuilder.group({
      username:this.formBuilder.control(null),
      password:this.formBuilder.control(null)
    })
  }
  submit() {
    let username=this.formGroup.value.username;
    let pass=this.formGroup.value.password;
    this.authentication.login(username,pass).subscribe({
      next:data=>{
        this.user=data;
        this.authentication.authenticate(this.user).subscribe({
          next:data=>{
            this.router.navigateByUrl("/home")
          },
          error:err => {
            this.error=err
          }
        })
      },
      error:err => this.error=err
    })

  }
}
