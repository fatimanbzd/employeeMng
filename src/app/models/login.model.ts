import {RoleEnum} from "../enums/role.enum";

export interface ILoginModel {
  userName: string;
  password: string;
}

export interface ILoginResponseModel {
  userName: string;
  password: string;
  fullName: string;
  role: RoleEnum;
}


