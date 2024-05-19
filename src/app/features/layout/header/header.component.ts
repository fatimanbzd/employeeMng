import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NzDropDownDirective, NzDropdownMenuComponent} from "ng-zorro-antd/dropdown";
import {NzIconDirective} from "ng-zorro-antd/icon";
import {NzButtonComponent, NzButtonGroupComponent} from "ng-zorro-antd/button";
import {NzMenuDirective, NzMenuItemComponent} from "ng-zorro-antd/menu";

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

  constructor() {

  }

  logout() {
   // this.authService.logout();
  }

  headerTrigger() {
    this.isCollapsed = !this.isCollapsed;
    this.trigger.emit(this.isCollapsed);
  }
}
