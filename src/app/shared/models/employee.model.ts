export interface IEmployeeModel {
  id: number;
  name: string;
}

export interface IActivityModel {
  id: string;
  title: string;
  completed: boolean;
  priority: number;
  employeeId: number;
  assignedEmployee: IEmployeeModel
}

export interface IActivityAddModel {
  id: string;
  title: string;
  completed: boolean;
  priority?: number;
  employeeId?: number;
}
export interface IEmployeeOption {
  label: string;
  value: number;
}
