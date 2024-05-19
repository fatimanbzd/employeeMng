import {Component, OnInit} from '@angular/core';
import {IActivityModel, IEmployeeModel} from "../../../../models/employee.model";
import {ManagerTaskManagementService} from "../../services/manager-task-mng.service";
import {forkJoin, map} from "rxjs";
import {NzTableComponent, NzTableModule} from "ng-zorro-antd/table";
import {RouterLink} from "@angular/router";
import {NzDividerComponent} from "ng-zorro-antd/divider";
import {NzIconDirective} from "ng-zorro-antd/icon";
import {NzButtonComponent} from "ng-zorro-antd/button";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {AddTaskDialogComponent} from "./add-task-dialog/add-task-dialog.component";
import {NzOptionComponent, NzSelectComponent} from "ng-zorro-antd/select";
import {FormsModule} from "@angular/forms";
import {PriorityEnum, PriorityLabel} from "../../../enums/priority.enum";

@Component({
  selector: 'app-task-management',
  standalone: true,
  imports: [
    NzTableModule,
    NzTableComponent,
    RouterLink,
    NzDividerComponent,
    NzIconDirective,
    NzButtonComponent,
    NzSelectComponent,
    FormsModule,
    NzOptionComponent
  ],
  templateUrl: './task-management.component.html',
  styleUrl: './task-management.component.css'
})
export class TaskManagementComponent implements OnInit {
  employees: IActivityModel[] = [];

  constructor(private activityService: ManagerTaskManagementService,
              private modalService: NgbModal) {
    this.activityService.employees$.subscribe(employees => {
      this.employees = employees;
    });
  }

  ngOnInit(): void {
    this.loadPriorityOptions();
    this.loadData();
  }

  optionList: { value: PriorityEnum, label: string }[] = [];

  loadPriorityOptions() {
    this.optionList = Object.keys(PriorityEnum)
      .filter((key) => isNaN(Number(key)))
      .map((key) => ({
        value: PriorityEnum[key as keyof typeof PriorityEnum],
        label: PriorityLabel[PriorityEnum[key as keyof typeof PriorityEnum]]
      }));
  }


  loadData() {
    forkJoin({
      employees: this.activityService.employees(),
      activities: this.activityService.activities()
    }).pipe(
      map(({employees, activities}) => {
        if (Array.isArray(employees) && Array.isArray(activities)) {
          activities?.forEach(activity => {
            activity.assignedEmployee = employees.find(employee => {
              return (activity.employeeId === employee.id);
            }) as IEmployeeModel;

          });
          return activities;
        } else {
          throw new Error('Expected arrays for employees and activities');
        }
      })
    ).subscribe(employees => {
      this.activityService.setActivity(employees);
    });
  }

  newTask(employeeId: number) {
    const modalRef = this.modalService.open(AddTaskDialogComponent);
    modalRef.componentInstance.employeeId = employeeId;
  }

  setPriority(employeeId: number, activityId: number, priority: number) {
    this.activityService.setActivityPriority(employeeId, activityId, priority);
  }

}
