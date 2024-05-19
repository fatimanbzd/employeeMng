import {Component, Input, OnInit} from '@angular/core';
import {IActivityModel} from "../../models/employee.model";
import {ActivityService} from "../../services/activity.service";
import {ActivatedRoute} from "@angular/router";
import {HttpClientModule} from "@angular/common/http";

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
              private activityService: ActivityService) {
  }

  ngOnInit(): void {
    this.employeeId = Number(this.route.snapshot.paramMap.get('id'));
    this.activityService.employees$.subscribe(employees => {
      const employee = employees.find(emp => emp.id === this.employeeId);
      if (employee) {
        this.activities = employee.activities;
      }
    });
  }

  markAsCompleted(activityId: number) {
    this.activityService.markActivityCompleted(this.employeeId, activityId);
  }

}
