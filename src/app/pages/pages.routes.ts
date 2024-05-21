import {Routes} from '@angular/router';
import {PagesComponent} from './pages.component';
import {RoleEnum} from "../shared/enums/role.enum";
import {TaskManagementComponent} from "../features/manager/components/task-management/task-management.component";
import {
  EmployeeTaskListComponent
} from "../features/employee/components/employee-task-list/employee-task-list.component";

export const Pages_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'pages',
    pathMatch: 'full'
  },
  {
    path: '',
    component: PagesComponent,
    children: [
      {
        path: 'task-management',
        component: TaskManagementComponent,
        data: {
          roles: [RoleEnum.manager]
        },
        // canActivate: [ManagerGuard]
      },
      {
        path: 'task-list',
        component: EmployeeTaskListComponent,
        data: {
          roles: [RoleEnum.employee]
        },
      }
    ]
  }
];
