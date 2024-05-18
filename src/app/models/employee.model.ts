export interface IEmployeeModel {
  id: number;
  name: string;
  activities: IActivityModel[];
}

export interface IActivityModel {
  id: number;
  description: string;
  completed: boolean;
  priority: number;
}
