export enum RoleEnum {
  manager,
  employee
}

export const RoleLabel: { [key in RoleEnum]: string } = {
  [RoleEnum.manager]: 'Manager',
  [RoleEnum.employee]: 'Employee',
}
