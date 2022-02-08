import { Route } from '@angular/compiler/src/core';

export interface NavRoute extends Route {
  path?: string;
  pathMatch?: string;
  redirectTo?: string;
  groupedNavRoutes?: NavRoute[];
}
export const barPath = "ugrpm";

export const barRoutes: NavRoute[] = [
  {
    path: "usuarios",
    loadChildren: () =>
      import("../../components/usuarios/usuarios.module").then(
        (m) => m.UsuariosModule
      )
  },
  {
    path: "asociaciones",
    loadChildren: () =>
      import("../../components/asociaciones/asociaciones.module").then(
        (m) => m.AsociacionesModule
      )
  },

  //Default
  { path: '**', pathMatch: 'full', redirectTo: 'asociaciones' }

];

