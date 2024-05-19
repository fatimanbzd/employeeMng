export interface IMenuModel {
  label: string;
  icon: string,
  permission: boolean;
  route?: string,
  children?: ISubMenuModel[]
}

interface ISubMenuModel {
  label: string;
  route: string,
  children?: ISubMenuModel[]
}
