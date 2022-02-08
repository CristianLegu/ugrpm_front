import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MatDrawerMode } from '@angular/material/sidenav';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-bar',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.scss']
})
export class BarComponent implements OnInit {

  isLoggedIn$!: Observable<boolean>;
  showFiller = false;
  mode: MatDrawerMode = 'side';

  rol: string;
  admin = true;
  user: string;


  constructor(
    //private authService: AuthService,
    private router: Router
  ) {
    this.rol = 'admin';
    this.user = 'ramon';
  }

  ngOnInit(): void {
  }

  logout() {
    this.router.navigateByUrl('');
  }

  openNavMenu() {
    // es mobile
    if (window.matchMedia('(max-width:576px)').matches) {
      //Si ya está abierto y se va a cerrar
      if (this.showFiller) {
        this.mode = 'side';
      }
      //Si se va a abrir
      else {
        this.mode = 'over';
      }
    }
    else {
      //Si ya está abierto y se va a cerrar
      if (this.showFiller) {
        this.mode = 'side';
      }
      //Si se va a abrir
      else {
        this.mode = 'over';
      }
    }

    this.showFiller = !this.showFiller;

  }

}
