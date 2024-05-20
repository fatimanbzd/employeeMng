import {Injectable} from '@angular/core';
import {IActivityModel, IEmployeeModel} from "../../models/employee.model";
import {BehaviorSubject, Subject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {PriorityEnum} from "../enums/priority.enum";


@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private employeesSubject = new BehaviorSubject<IActivityModel[]>([]);
  employees$ = this.employeesSubject.asObservable();

  readonly basUrl = environment.url;

  constructor(private http: HttpClient) {
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

  addTask(activity: IActivityModel) {
    this.http.post(`${this.basUrl}tasks`, activity);
  }

  markTaskCompleted(completed: boolean, task: IActivityModel) {
    const model = {
      employeeId: task.employeeId,
      id: task.id,
      priority: task.priority,
      completed: completed,
      description: task.description
    }

    return this.http.put(`${this.basUrl}tasks/${task.id}`, model);
  }

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
