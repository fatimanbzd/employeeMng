import {Component, OnInit} from '@angular/core';
import {IActivityModel, IEmployeeModel} from "../../../../models/employee.model";
import {ActivityService} from "../../../../services/activity.service";
import {forkJoin, map} from "rxjs";
import {NzTableComponent, NzTableModule} from "ng-zorro-antd/table";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-task-management',
  standalone: true,
  imports: [
    NzTableModule,
    NzTableComponent,
    RouterLink
  ],
  templateUrl: './task-management.component.html',
  styleUrl: './task-management.component.css'
})
export class TaskManagementComponent implements OnInit {
  employees: IEmployeeModel[] = [];

  constructor(private activityService: ActivityService) {
    this.activityService.employees$.subscribe(employees => {
      this.employees = employees;
    });
  }

  ngOnInit(): void {
    this.loadData()
  }

  loadData() {
    forkJoin({
      employees: this.activityService.employees(),
      activities: this.activityService.activities()
    }).pipe(
      map(({employees, activities}) => {
        employees.forEach(employee => {
          employee.activities = employee.activities.map((emActivity) => {
            return activities.find(activity => activity.id === emActivity.id) as IActivityModel;
          });
        });
        return employees;
      })
    ).subscribe(employees => {
      //console.log(employees)
      this.activityService.setActivity(employees);
    });
  }

  setPriority(employeeId: number, activityId: number, priority: number) {
    this.activityService.setActivityPriority(employeeId, activityId, priority);
  }

}
