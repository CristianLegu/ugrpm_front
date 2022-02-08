import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  login: FormGroup;
  loading = false;

  constructor(
    private router: Router
  ) {
    this.login = new FormGroup({
      nombreusuario: new FormControl("", [Validators.required]),
      password: new FormControl("", [Validators.required])
    });
  }

  ngOnInit(): void {
  }

  ingresar() {
    this.router.navigate(['ugrpm/usuarios'], { replaceUrl: true });
  }


}
