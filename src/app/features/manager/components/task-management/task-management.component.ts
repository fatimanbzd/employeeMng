import {Component, OnDestroy, OnInit} from '@angular/core';
import {IActivityModel, IEmployeeModel, IEmployeeOption} from "../../../../shared/models/employee.model";
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
import {PriorityEnum} from "../../../enums/priority.enum";
import {NzInputDirective} from "ng-zorro-antd/input";

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
    NzInputDirective,
  ],
  templateUrl: './task-management.component.html',
  styleUrl: './task-management.component.css'
})

export class TaskManagementComponent implements OnInit, OnDestroy {
  tasks: IActivityModel[] = [];
  editId: string | null = null;
  employeesList: IEmployeeOption[] = [];
  optionList: { value: string, label: string }[] = [];
  priorityFilterList: { value: string, text: string }[] = Object.keys(PriorityEnum)
    .filter((key) => isNaN(Number(key)))
    .map((key) => ({
      value: PriorityEnum[key as keyof typeof PriorityEnum].toString(),
      text: PriorityEnum[PriorityEnum[key as keyof typeof PriorityEnum]]
    }));
  private _destroy = new Subject<void>();

  constructor(private taskService: TaskService,
              private modalService: NgbModal) {
    this.taskService.taskUpdated$.subscribe(() => {
      this.loadData();
    });
  }

  startEdit(id: string): void {
    this.editId = id;
  }

  stopEdit(): void {
    this.editId = null;
  }

  ngOnInit(): void {
    this.optionList = this.taskService.loadPriorityOptions();
    this.loadData();
  }

  loadData() {
    forkJoin({
      employees: this.taskService.employees(),
      activities: this.taskService.activities()
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
    ).subscribe(activities => {
      this.tasks = activities;
    });
  }

  modalTask(task?: IActivityModel) {
    const modal = this.modalService.open(AddTaskDialogComponent);
    modal.componentInstance.data = task;
    modal.componentInstance.lastId = this.tasks[this.tasks.length - 1].id;
  }

  complete(completed: boolean, task: IActivityModel,) {
    const model = !completed;
    this.taskService.markTaskCompleted(model, task)
      .pipe(takeUntil(this._destroy),)
      .subscribe(() =>
        this.loadData()
      );
  }

  setPriority(task: IActivityModel, priority: number) {
    this.taskService.setActivityPriority(task, priority)
      .pipe(takeUntil(this._destroy))
      .subscribe();
  }

  setEmployee(task: IActivityModel, selectedEmployeeId: number) {
    const selectedEmployee = this.employeesList.find(emp => emp.value === selectedEmployeeId);
    if (selectedEmployee && task.assignedEmployee) {
      task.assignedEmployee.id = selectedEmployee.value;
      task.assignedEmployee.name = selectedEmployee.label;
      this.taskService.assignToEmployee(task, selectedEmployeeId)
        .pipe(takeUntil(this._destroy))
        .subscribe();
    }
  }

  ngOnDestroy() {
    this._destroy.next();
    this._destroy.complete();
  }
}
