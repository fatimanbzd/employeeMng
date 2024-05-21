import {Component, OnInit} from '@angular/core';
import {IActivityModel} from "../../shared/models/employee.model";
import {TaskService} from "../services/task.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css'
})
export class EmployeeComponent implements OnInit {
  employeeId!: number;
  activities: IActivityModel[] = [];

  constructor(private route: ActivatedRoute,
              private activityService: TaskService) {
  }

  ngOnInit(): void {
    this.employeeId = Number(this.route.snapshot.paramMap.get('id'));
    this.activityService.taskUpdated$.subscribe(() => {
    });
  }

  markAsCompleted(activityId: number) {
    // this.activityService.markTaskCompleted(activityId);
  }

}
