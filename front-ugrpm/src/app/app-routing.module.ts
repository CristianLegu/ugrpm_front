import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { barPath, barRoutes } from './common/bar/bar-routing.module';
import { BarComponent } from './common/bar/bar.component';
import { BarModule } from './common/bar/bar.module';

const routes: Routes = [
  {
    path: "ingresar",
    loadChildren: () =>
      import("./components/login/login.module").then((m) => m.LoginModule)
  },
  {
    path: barPath,
    component: BarComponent,
    children: barRoutes
  },

  //Default
  { path: '**', pathMatch: 'full', redirectTo: 'ingresar' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
    BarModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
