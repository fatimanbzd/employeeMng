import {Component, Input} from '@angular/core';
import {TaskManagementComponent} from "../../features/manager/components/task-management/task-management.component";
import {RouterOutlet} from "@angular/router";
import {NzContentComponent, NzLayoutComponent, NzSiderComponent} from "ng-zorro-antd/layout";
import {NavbarComponent} from "../../features/layout/navbar/navbar.component";

@Component({
  selector: 'app-manager-page',
  standalone: true,
  imports: [
    TaskManagementComponent,
    RouterOutlet,
    NzLayoutComponent,
    NzSiderComponent,
    NavbarComponent,
    NzContentComponent
  ],
  templateUrl: './manager-page.component.html',
  styleUrl: './manager-page.component.css'
})
export class ManagerPageComponent {
  @Input() isCollapsed = false;

  constructor() {
  }

  getLastTrigger(is: boolean) {
    this.isCollapsed = is;
  }
}
