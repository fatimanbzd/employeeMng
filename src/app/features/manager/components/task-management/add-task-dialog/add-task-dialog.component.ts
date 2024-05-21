import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {NgbActiveModal, NgbTooltip} from "@ng-bootstrap/ng-bootstrap";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Subject, takeUntil} from "rxjs";
import {NgClass} from "@angular/common";
import {TaskService} from "../../../../services/task.service";
import {NzFormControlComponent, NzFormDirective, NzFormItemComponent, NzFormLabelComponent} from "ng-zorro-antd/form";
import {NzButtonComponent} from "ng-zorro-antd/button";
import {NzColDirective, NzRowDirective} from "ng-zorro-antd/grid";
import {NzOptionComponent, NzSelectComponent} from "ng-zorro-antd/select";
import {NzInputDirective} from "ng-zorro-antd/input";
import {IActivityAddModel, IEmployeeModel, IEmployeeOption} from "../../../../../shared/models/employee.model";

@Component({
  selector: 'app-add-task-dialog',
  standalone: true,
  imports: [
    NgClass,
    ReactiveFormsModule,
    NgbTooltip,
    NzFormItemComponent,
    NzFormControlComponent,
    NzButtonComponent,
    NzFormDirective,
    NzRowDirective,
    NzColDirective,
    NzFormLabelComponent,
    NzSelectComponent,
    NzInputDirective,
    NzOptionComponent
  ],
  templateUrl: './add-task-dialog.component.html',
  styleUrl: './add-task-dialog.component.css'
})
export class AddTaskDialogComponent implements OnInit, OnDestroy {
  addTaskForm!: FormGroup;
  optionList: { value: string, label: string }[] = [];
  employeesList: IEmployeeOption[] = [];
  submitted: boolean = false;
  private _destroy = new Subject<void>();

  @Input() employeeId!: number;
  @Input() lastId!: number;

  constructor(private fb: FormBuilder,
              public activeModal: NgbActiveModal,
              private taskService: TaskService,) {
  }

  ngOnInit() {
    this.optionList = this.taskService.loadPriorityOptions();
    console.log(this.optionList)
    this.initForm();
    this.getEmployee();
  }

  initForm() {
    this.addTaskForm = this.fb.group({
      title: [null, Validators.required],
      priority: [null],
      completed: [false, Validators.required],
      employeeId: [null]
    });
  }

  getEmployee() {
    this.taskService.employees()
      .pipe(takeUntil(this._destroy))
      .subscribe(em =>
        this.employeesList = em.map((m: IEmployeeModel) => ({
          label: m.name,
          value: m.id
        })))
  }

  submit(form: any) {
    const model: IActivityAddModel = {
      completed: false,
      title: form.value.title,
      priority: form.value.priority,
      id: (+this.lastId + 1).toString(),
      employeeId: form.value.employeeId
    }
    this.taskService.addTask(model)
      .pipe(takeUntil(this._destroy))
      .subscribe(() => {
        this.taskService.setActivity();
        this.taskService.setActivity();
        this.activeModal.close();
      });
  }

  ngOnDestroy() {
    this._destroy.next();
    this._destroy.complete();
  }
}
