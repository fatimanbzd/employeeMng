import {Injectable} from '@angular/core';
import {IActivityModel, IEmployeeModel} from "../models/employee.model";
import {BehaviorSubject, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ActivityService {
  private employeesUrl = 'assets/data/employees.json';
  private activitiesUrl = 'assets/data/activities.json';

  private employeesSubject = new BehaviorSubject<IEmployeeModel[]>([]);
  employees$ = this.employeesSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadEmployees();
  }

  private loadEmployees() {
  }

  setActivity(employees: IEmployeeModel[]) {
    this.employeesSubject.next(employees)
  }

  employees() {
    return this.http.get<IEmployeeModel[]>(this.employeesUrl);
  }

  activities() {
    return this.http.get<IActivityModel[]>(this.activitiesUrl);
  }

  addActivity(employeeId: number, activity: IActivityModel) {
    const employees = this.employeesSubject.getValue();
    const employee = employees.find(emp => emp.id === employeeId);
    if (employee) {
      employee.activities.push(activity);
      this.employeesSubject.next(employees);
    }
  }

  markActivityCompleted(employeeId: number, activityId: number) {
    const employees = this.employeesSubject.getValue();
    const employee = employees.find(emp => emp.id === employeeId);
    if (employee) {
      const activity = employee.activities.find(act => act.id === activityId);
      if (activity) {
        activity.completed = true;
        this.employeesSubject.next(employees);
      }
    }
  }

  setActivityPriority(employeeId: number, activityId: number, priority: number) {
    const employees = this.employeesSubject.getValue();
    const employee = employees.find(emp => emp.id === employeeId);
    if (employee) {
      const activity = employee.activities.find(act => act.id === activityId);
      if (activity) {
        activity.priority = priority;
        this.employeesSubject.next(employees);
      }
    }
  }
}
