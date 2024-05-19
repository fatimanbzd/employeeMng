import {Injectable} from '@angular/core';
import {IActivityModel, IEmployeeModel} from "../../../models/employee.model";
import {BehaviorSubject, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {PriorityEnum} from "../../enums/priority.enum";


@Injectable({
  providedIn: 'root'
})
export class ManagerTaskManagementService {
  private employeesUrl = 'assets/data/employees.json';
  private activitiesUrl = 'assets/data/activities.json';

  private employeesSubject = new BehaviorSubject<IActivityModel[]>([]);
  employees$ = this.employeesSubject.asObservable();

  readonly basUrl = environment.url;

  constructor(private http: HttpClient) {
    this.loadEmployees();
  }

  private loadEmployees() {
  }

  setActivity(activities: IActivityModel[]) {
    this.employeesSubject.next(activities)
  }

  employees() {
    return this.http.get<IEmployeeModel[]>(`${this.basUrl}employees`);
  }

  activities() {
    return this.http.get<IActivityModel[]>(`${this.basUrl}tasks`);
  }

  addActivity(employeeId: number, activity: IActivityModel) {
    // // this.http.post('')
    // const employees = this.employeesSubject.getValue();
    // const employee = employees.find(emp => emp.id === employeeId);
    // if (employee) {
    //   employee.activities.push(activity);
    //   this.employeesSubject.next(employees);
    // }
  }

  // markActivityCompleted(employeeId: number, activityId: number) {
  //   const employees = this.employeesSubject.getValue();
  //   const employee = employees.find(emp => emp.id === employeeId);
  //   if (employee) {
  //     const activity = employee.activities.find(act => act.id === activityId);
  //     if (activity) {
  //       activity.completed = true;
  //       this.employeesSubject.next(employees);
  //     }
  //   }
  // }

  setActivityPriority(employeeId: number, taskId: number, priority: PriorityEnum) {
    const model = {
      employeeId: employeeId,
      activityId: taskId,
      priority: priority
    }

    return this.http.put(`${this.basUrl}tasks/${taskId}`, model);

  }
}
