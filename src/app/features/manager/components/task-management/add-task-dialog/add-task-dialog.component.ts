import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {NgbActiveModal, NgbTooltip} from "@ng-bootstrap/ng-bootstrap";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Subject} from "rxjs";
import {NgClass} from "@angular/common";
import {TaskService} from "../../../../services/task.service";
import {IActivityModel} from "../../../../../models/employee.model";

@Component({
  selector: 'app-add-task-dialog',
  standalone: true,
  imports: [
    NgClass,
    ReactiveFormsModule,
    NgbTooltip
  ],
  templateUrl: './add-task-dialog.component.html',
  styleUrl: './add-task-dialog.component.css'
})
export class AddTaskDialogComponent implements OnInit, OnDestroy {
  form!: FormGroup;
  @Input() employeeId!: number;
  submitted: boolean = false;
  private _destroy = new Subject<void>();

  constructor(private fb: FormBuilder,
              public activeModal: NgbActiveModal,
              private activityService: TaskService,) {
  }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.form = this.fb.group({
      description: [null, Validators.required],
      priority: [null],
      completed: [false, Validators.required]
    });
  }

  submit() {
    //
    // const model : IActivityModel={
    //   completed:false,
    // }
    // this.activityService.addTask(this.employeeId,);
  }

  ngOnDestroy() {
    this._destroy.next();
    this._destroy.complete();
  }
}
