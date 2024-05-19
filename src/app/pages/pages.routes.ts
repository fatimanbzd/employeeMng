import {Routes} from '@angular/router';
import {PagesComponent} from './pages.component';
import {ManagerPageComponent} from "./manager-page/manager-page.component";
import {RoleEnum} from "../enums/role.enum";
import {TaskManagementComponent} from "../features/manager/components/task-management/task-management.component";

export const Pages_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'manager',
    pathMatch: 'full'
  },
  {
    path: '',
    component: PagesComponent,
    children: [
      {
        path: 'task',
        component: ManagerPageComponent,
        data: {
          roles: [RoleEnum.manager]
        },
        children: [
          {
            path: 'task-management', component: TaskManagementComponent,
            data: {
              roles: [RoleEnum.manager],
            }
          }
        ]
      },
    ]
  }
  //     {
  //       path: 'user',
  //       component: CustomerPageComponent,
  //       canActivate: [AdminGuard],
  //       data: {
  //         breadcrumb: 'مدیریت کاربران',
  //         roles: [UserTypeEnum.admin]
  //       },
  //       children: [
  //         {
  //           path: 'list',
  //           component: CustomerListComponent,
  //           data: {
  //             breadcrumb: 'لیست کاربران',
  //           },
  //         },
  //         {
  //           path: ':id',
  //           component: CustomerDetailPageComponent,
  //           data: {
  //             breadcrumb: 'جزئیات کاربر',
  //           }
  //         }]
  //     },
  //     {
  //       path: 'vendor',
  //       component: VendorProfilePageComponent,
  //       canActivate: [AdminGuard],
  //       data: {
  //         breadcrumb: 'مدیریت پذیرندگان',
  //         roles: [UserTypeEnum.vendor]
  //       },
  //       children: [
  //         {
  //           path: 'profile',
  //           component: VendorProfileComponent,
  //           data: {
  //             breadcrumb: 'پروفایل',
  //           },
  //         },
  //       ]
  //     },
  //     {
  //       path: 'account',
  //       component: AccountPageComponent,
  //       data: {
  //         breadcrumb: 'حساب کاربری',
  //         roles: [UserTypeEnum.vendor, UserTypeEnum.admin]
  //       },
  //       children: [
  //         {
  //           path: 'change-password',
  //           component: ChangePasswordComponent,
  //           data: {
  //             breadcrumb: 'تغییر رمز عبور',
  //           },
  //         },
  //       ]
  //     },
  //   ]
  // },
  // {component: NotFoundComponent, path: "not_found"},
  // {path: "**", redirectTo: "not_found"},
];
