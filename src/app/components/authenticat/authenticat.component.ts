import { Component } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-authenticat',
  templateUrl: './authenticat.component.html',
  styleUrls: ['./authenticat.component.css']
})
export class AuthenticatComponent {
  error!:string
  formGroup!:FormGroup

  constructor(private formBuilder:FormBuilder) {
    this.formGroup=this.formBuilder.group({
      username:this.formBuilder.control(null),
      password:this.formBuilder.control(null)
    })
  }

  submit() {

  }
}
