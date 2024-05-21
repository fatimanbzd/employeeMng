export enum RoleEnum {
  manager = 1,
  employee
}

export const RoleLabel: { [key in RoleEnum]: string } = {
  [RoleEnum.manager]: 'Manager',
  [RoleEnum.employee]: 'Employee',
}
