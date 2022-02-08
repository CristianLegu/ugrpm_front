import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { ApiUrl } from 'src/app/common/globals';

@Injectable()
export class AuthService {

  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  token: any;

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  constructor(
    private router: Router,
    private http: HttpClient,
  ) { }

  login(user: FormGroup): Promise<any> {

    return new Promise((ok, error) => {
      this.http.post(ApiUrl + 'autenticacion', '',
        {
          responseType: 'json',
          params: {
            'nombreusuario': user.get('nombreusuario')?.value,
            'password': user.get('password')?.value
          }
        })
        .toPromise()
        .then(response => {
          ok(response);
          this.token = response;
          localStorage.setItem('usr', user.value.nombreusuario);
          localStorage.setItem('tkn', this.token.token);
          localStorage.setItem('role', this.token.rol);
          this.loggedIn.next(true);
          this.router.navigate(['/herramientas']);
        })
        .catch(err => {
          error(err);
        })
    });

  }

  carga() {
    this.loggedIn.next(true);
  }

  logout() {
    this.loggedIn.next(false);
    localStorage.removeItem('usr');
    localStorage.removeItem('tkn');
    localStorage.removeItem('role');
  }
}