import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {NgbActiveModal, NgbTooltip} from "@ng-bootstrap/ng-bootstrap";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Subject} from "rxjs";
import {NgClass} from "@angular/common";
import {ManagerTaskManagementService} from "../../../services/manager-task-mng.service";

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
              private activityService: ManagerTaskManagementService,) {
  }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.form = this.fb.group({
      title: [null, Validators.required],
      description: [null],
      priority: [null],
      completed: [null, Validators.required]
    });
  }

  submit() {
    this.activityService.addTask(this.employeeId, this.form.value);
  }

  ngOnDestroy() {
    this._destroy.next();
    this._destroy.complete();
  }
}
