import { Component } from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {ManagerComponent} from "./manager/manager.component";
import {EmployeeComponent} from "./employee/employee.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ManagerComponent, EmployeeComponent, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'EmployeeManagement';
}
