import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  
  login: FormGroup;
  loading = false;

  constructor() {
    this.login = new FormGroup({
      nombreusuario: new FormControl("", [Validators.required]),
      password: new FormControl("", [Validators.required])
    });
   }

  ngOnInit(): void {
  }

  ingresar(){
    
  }

}
