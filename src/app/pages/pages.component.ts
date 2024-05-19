import {Component, Input} from '@angular/core';
import {NavbarComponent} from "../features/layout/navbar/navbar.component";
import {NzContentComponent, NzHeaderComponent, NzLayoutComponent, NzSiderComponent} from "ng-zorro-antd/layout";
import {RouterLink, RouterOutlet} from "@angular/router";
import {NzIconDirective} from "ng-zorro-antd/icon";
import {NzMenuDirective, NzMenuItemComponent, NzSubMenuComponent} from "ng-zorro-antd/menu";
import {HeaderComponent} from "../features/layout/header/header.component";

@Component({
  selector: 'app-pages',
  standalone: true,
  imports: [
    NavbarComponent,
    NzContentComponent,
    NzLayoutComponent,
    NzSiderComponent,
    RouterOutlet,
    NzHeaderComponent,
    NzIconDirective,
    NzMenuDirective,
    NzMenuItemComponent,
    NzSubMenuComponent,
    RouterLink,
    HeaderComponent
  ],
  templateUrl: './pages.component.html',
  styleUrl: './pages.component.css'
})
export class PagesComponent {
  @Input() isCollapsed = false;

  constructor() {
  }

  getLastTrigger(is: boolean) {
    this.isCollapsed = is;
  }
}
