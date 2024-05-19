import {Routes} from '@angular/router';
import {AuthGuard} from "./guards/auth.guard";
import {NoAuthGuardGuard} from "./guards/no-auth-guard.guard";

export const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: '/pages'},
  {
    path: 'pages',
    loadChildren: () => import('./pages/pages.routes').then(m => m.Pages_ROUTES),
    canActivate: [AuthGuard],
  },
  {
    path: 'login',
    canActivate: [NoAuthGuardGuard],
    loadComponent: () => import('./login/login.component').then(m => m.LoginComponent)
  }
];
