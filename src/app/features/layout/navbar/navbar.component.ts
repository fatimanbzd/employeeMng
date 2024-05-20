import {AfterViewInit, Component, Input} from '@angular/core';
import {AuthService} from "../../../services/auth.service";
import {IMenuModel} from "../menu.model";
import {RoleEnum} from "../../../enums/role.enum";
import {NzMenuDirective, NzMenuItemComponent, NzSubMenuComponent} from "ng-zorro-antd/menu";
import {RouterLink} from "@angular/router";
import {NzIconDirective, NzIconModule} from "ng-zorro-antd/icon";
import {NzLayoutModule} from "ng-zorro-antd/layout";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    NzLayoutModule,
    NzIconDirective,
    NzIconModule,
    NzMenuDirective,
    NzMenuItemComponent,
    NzSubMenuComponent,
    RouterLink,
    NgIf
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements AfterViewInit {
  @Input('isCollapsed') isCollapsed = false;
  public menuList!: IMenuModel[];

  constructor(private authService: AuthService) {
    const currentRole = this.authService.getRole();
    this.constructMenu(currentRole);
  }

  ngAfterViewInit() {


  }

  constructMenu(currentRole: RoleEnum | undefined) {
    this.menuList = [
      {
        label: 'Manager',
        icon: 'home',
        permission: currentRole === RoleEnum.manager,
        children: [
          {
            label:'Task Management',
            route:'/pages/task-management'
          }
        ]
      },
      {
        label: 'Employee',
        icon: 'user',
        permission: currentRole === RoleEnum.employee,
        children: [
          {
            label:'Task List',
            route:'/'
          }
        ]
      },
      // {
      //   label: 'کاربران',
      //   icon: 'team',
      //   permission: currentRole === RoleEnum.admin,
      //   route: '/pages/user',
      //   children: [{
      //     label: 'لیست کاربران',
      //     route: '/pages/user/list'
      //   }]
      // },
      //
      // {
      //   label: 'پذیرندگان',
      //   icon: 'user',
      //   permission: currentRole === UserTypeEnum.vendor,
      //   route: '/pages/vendor',
      //   children: [{
      //     label: 'پروفایل',
      //     route: '/pages/vendor/profile'
      //   }]
      // }
    ];
  }

}
