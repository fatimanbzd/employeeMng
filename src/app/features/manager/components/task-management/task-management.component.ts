import {Component, OnDestroy, OnInit} from '@angular/core';
import {IActivityModel, IEmployeeModel, IEmployeeOption} from "../../../../models/employee.model";
import {TaskService} from "../../../services/task.service";
import {forkJoin, map, Subject, takeUntil} from "rxjs";
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
    NzOptionComponent,
  ],
  templateUrl: './task-management.component.html',
  styleUrl: './task-management.component.css'
})

export class TaskManagementComponent implements OnInit, OnDestroy {
  tasks: IActivityModel[] = [];
  employeesList: IEmployeeOption[] = [];
  private _destroy = new Subject<void>();

  constructor(private activityService: TaskService,
              private modalService: NgbModal) {
    this.activityService.employees$.subscribe(tasks => {
      this.tasks = tasks;
    });
  }

  ngOnInit(): void {
    this.loadPriorityOptions();
    this.loadData();
  }

  optionList: { value: string, label: string }[] = [];

  loadPriorityOptions() {
    this.optionList = Object.keys(PriorityEnum)
      .filter((key) => isNaN(Number(key)))
      .map((key) => ({
        value: PriorityEnum[key as keyof typeof PriorityEnum].toString(),
        label: PriorityLabel[PriorityEnum[key as keyof typeof PriorityEnum]]
      }));
  }


  loadData() {
    forkJoin({
      employees: this.activityService.employees(),
      activities: this.activityService.activities()
    }).pipe(
      takeUntil(this._destroy),
      map(({employees, activities}) => {
        if (Array.isArray(employees) && Array.isArray(activities)) {
          activities?.forEach(activity => {
            activity.assignedEmployee = employees.find(employee => {
              return (activity.employeeId == employee.id);
            }) as IEmployeeModel;

          });

          this.employeesList = employees.map((m: IEmployeeModel) => ({
            label: m.name,
            value: m.id
          }));
          return activities;
        } else {
          throw new Error('Expected arrays for employees and activities');
        }
      })
    ).subscribe(employees => {
      this.activityService.setActivity(employees);
    });
  }

  newTask() {
    this.modalService.open(AddTaskDialogComponent);
  }

  complete(completed: boolean, task: IActivityModel,) {
    const model = !completed;
    this.activityService.markTaskCompleted(model, task)
      .pipe(takeUntil(this._destroy),)
      .subscribe(() =>
        this.loadData()
      );
  }

  setPriority(task: IActivityModel, priority: number) {
    this.activityService.setActivityPriority(task, priority)
      .pipe(takeUntil(this._destroy))
      .subscribe();
  }

  setEmployee(task: IActivityModel, selectedEmployeeId: number) {
    const selectedEmployee = this.employeesList.find(emp => emp.value === selectedEmployeeId);
    if (selectedEmployee) {
      task.assignedEmployee.id = selectedEmployee.value;
      task.assignedEmployee.name = selectedEmployee.label;
      this.activityService.assignToEmployee(task, selectedEmployeeId)
        .pipe(takeUntil(this._destroy))
        .subscribe();
    }
  }

  ngOnDestroy() {
    this._destroy.next();
    this._destroy.complete();
  }
}
