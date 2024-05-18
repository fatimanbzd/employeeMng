import {Routes} from '@angular/router';
import {EmployeeComponent} from "./employee/employee.component";
import {ActivityListComponent} from "./activity-list/activity-list.component";
import {AuthGuard} from "./guards/auth.guard";
import {NoAuthGuardGuard} from "./guards/no-auth-guard.guard";

export const routes: Routes = [
  {path: '', redirectTo: '/manager', pathMatch: 'full'},
  {
    path: 'manager',
    loadComponent: () => import('./manager/manager.component').then(m => m.ManagerComponent),
    canActivate: [AuthGuard]
  },
  {
    path: 'employee',
    loadComponent: () => import('./employee/employee.component').then(m => m.EmployeeComponent),
    canActivate: [AuthGuard]
  },
  {path: 'ActivityList', component: ActivityListComponent},
  {
    path: 'login',
    canActivate: [NoAuthGuardGuard],
    loadComponent: () => import('./login/login.component').then(m => m.LoginComponent)
  }
];
