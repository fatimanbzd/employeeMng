export interface IEmployeeModel {
  id: number;
  name: string;
}

export interface IActivityModel {
  id: number;
  description: string;
  completed: boolean;
  priority: number;
  employeeId: number;
  assignedEmployee:IEmployeeModel
}

export interface IEmployeeOption {
  label: string;
  value: number;
}
