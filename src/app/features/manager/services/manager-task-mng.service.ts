import {Injectable} from '@angular/core';
import {IActivityModel, IEmployeeModel} from "../../../models/employee.model";
import {BehaviorSubject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {PriorityEnum} from "../../enums/priority.enum";


@Injectable({
  providedIn: 'root'
})
export class ManagerTaskManagementService {

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

  addTask(employeeId: number, activity: IActivityModel) {
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

  setActivityPriority(activity: IActivityModel, priority: PriorityEnum) {
    const model = {
      employeeId: activity.employeeId,
      id: activity.id,
      priority: priority,
      completed: false,
      description: activity.description
    }

    return this.http.put(`${this.basUrl}tasks/${activity.id}`, model);
  }
  assignToEmployee(task: IActivityModel, selectedEmployeeId: number) {
    const model = {
      employeeId: selectedEmployeeId,
      id: task.id,
      priority: task.priority,
      completed: false,
      description: task.description
    }

    return this.http.put(`${this.basUrl}tasks/${task.id}`, model);

  }
}
