import {Routes} from '@angular/router';
import {AuthGuard} from "./guards/auth.guard";
import {NoAuthGuardGuard} from "./guards/no-auth-guard.guard";
import {RoleEnum} from "./enums/role.enum";

export const routes: Routes = [
  {path: '', redirectTo: '/manager', pathMatch: 'full'},
  {
    path: 'manager',
    loadComponent: () => import('./manager/manager.component').then(m => m.ManagerComponent),
    canActivate: [AuthGuard],
    data: { roles: [RoleEnum.manager] }
  },
  {
    path: 'employee',
    loadComponent: () => import('./employee/employee.component').then(m => m.EmployeeComponent),
    canActivate: [AuthGuard],
    data: { roles: [RoleEnum.employee] }
  },
  {
    path: 'login',
    canActivate: [NoAuthGuardGuard],
    loadComponent: () => import('./login/login.component').then(m => m.LoginComponent)
  }
];
