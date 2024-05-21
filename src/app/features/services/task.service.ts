import {Injectable} from '@angular/core';
import {IActivityAddModel, IActivityModel, IEmployeeModel} from "../../shared/models/employee.model";
import {Subject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {PriorityEnum} from "../enums/priority.enum";


@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private taskUpdatedSubject = new Subject<void>();
  taskUpdated$ = this.taskUpdatedSubject.asObservable();

  readonly basUrl = environment.url;

  constructor(private http: HttpClient) {
  }


  setActivity() {
    this.taskUpdatedSubject.next()
  }

  employees() {
    return this.http.get<IEmployeeModel[]>(`${this.basUrl}employees`);
  }

  activities() {
    return this.http.get<IActivityModel[]>(`${this.basUrl}tasks`);
  }

  addTask(activity: IActivityAddModel) {
   return this.http.post(`${this.basUrl}tasks`, activity);
  }

  markTaskCompleted(completed: boolean, task: IActivityModel) {
    const model:IActivityAddModel = {
      employeeId: task.employeeId,
      id: task.id,
      priority: task.priority,
      completed: completed,
      title: task.title
    }

    return this.http.put(`${this.basUrl}tasks/${task.id}`, model);
  }

  setActivityPriority(activity: IActivityModel, priority: PriorityEnum) {
    const model = {
      employeeId: activity.employeeId,
      id: activity.id,
      priority: priority,
      completed: false,
      description: activity.title
    }

    return this.http.put(`${this.basUrl}tasks/${activity.id}`, model);
  }

  assignToEmployee(task: IActivityModel, selectedEmployeeId: number) {
    const model = {
      employeeId: selectedEmployeeId,
      id: task.id,
      priority: task.priority,
      completed: false,
      description: task.title
    }

    return this.http.put(`${this.basUrl}tasks/${task.id}`, model);

  }

  loadPriorityOptions() {
    return Object.keys(PriorityEnum)
      .filter((key) => isNaN(Number(key)))
      .map((key) => ({
        value: PriorityEnum[key as keyof typeof PriorityEnum].toString(),
        label: PriorityEnum[PriorityEnum[key as keyof typeof PriorityEnum]]
      }));
  }

}
