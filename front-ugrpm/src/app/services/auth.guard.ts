import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  user: string;
  token: string;
  rol: string;

  constructor(private authService: AuthService, private router: Router) {
    this.user = localStorage.getItem('usr') || '';
    this.token = localStorage.getItem('tkn') || '';
    this.rol = localStorage.getItem('role') || '';
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    this.user = localStorage.getItem('usr') || '';
    this.token = localStorage.getItem('tkn') || '';
    this.rol = localStorage.getItem('role') || '';
    return this.authService.isLoggedIn.pipe(
      take(1),
      map((isLoggedIn: boolean) => {
        /* if (!isLoggedIn) {
          if (this.user.length == 0 || this.token.length == 0 || this.rol.length == 0) {
            this.router.navigate(['/ingresar']);
            return false;
          }
        } */
        this.authService.carga();
        return true;
      })
    );
  }
}