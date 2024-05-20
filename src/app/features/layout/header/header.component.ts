import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NzDropDownDirective, NzDropdownMenuComponent} from "ng-zorro-antd/dropdown";
import {NzIconDirective} from "ng-zorro-antd/icon";
import {NzButtonComponent, NzButtonGroupComponent} from "ng-zorro-antd/button";
import {NzMenuDirective, NzMenuItemComponent} from "ng-zorro-antd/menu";
import {AuthService} from "../../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    NzDropDownDirective,
    NzDropdownMenuComponent,
    NzIconDirective,
    NzButtonGroupComponent,
    NzButtonComponent,
    NzMenuDirective,
    NzMenuItemComponent
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent  {
  @Input('isCollapsed') isCollapsed = false;
  @Output() trigger: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private authService:AuthService,
              private router: Router) {

  }

  logout() {
   this.authService.logOut();
   this.router.navigateByUrl('/login')
  }

  headerTrigger() {
    this.isCollapsed = !this.isCollapsed;
    this.trigger.emit(this.isCollapsed);
  }
}
