import {Component, Input, OnInit} from '@angular/core';
import {IActivityModel} from "../models/employee.model";

@Component({
  selector: 'app-activity-list',
  standalone: true,
  imports: [],
  templateUrl: './activity-list.component.html',
  styleUrl: './activity-list.component.css'
})
export class ActivityListComponent implements OnInit {
  @Input() activities: IActivityModel[] = [];

  constructor() {
    console.log("$%^&890")
    console.log(this.activities)
  }

  ngOnInit(): void {
  }
}
