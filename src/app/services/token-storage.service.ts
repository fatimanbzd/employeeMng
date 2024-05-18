import {Injectable} from '@angular/core';
import {ILoginResponseModel} from "../models/login.model";


@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  tokenInfo = 'token';

  getAccessToken(): ILoginResponseModel {
    const tokenValue = localStorage.getItem(this.tokenInfo);
    return JSON.parse(tokenValue as string) as ILoginResponseModel;
  }

  saveAccessToken(auth: ILoginResponseModel) {
    localStorage.setItem(this.tokenInfo, JSON.stringify(auth));
  }

  removeTokens() {
    localStorage.removeItem(this.tokenInfo);
  }
}
