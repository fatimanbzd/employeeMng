import {Injectable} from '@angular/core';
import {ILoginResponseModel} from "../models/login.model";


@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  tokenInfo = 'token';

  getAccessToken(): ILoginResponseModel | null {
    const tokenValue = localStorage.getItem(this.tokenInfo);
    if (tokenValue)
      return JSON.parse(tokenValue as string) as ILoginResponseModel;
    else
      return null;
  }

  saveAccessToken(auth: ILoginResponseModel) {
    localStorage.setItem(this.tokenInfo, JSON.stringify(auth));
  }

  removeTokens() {
    localStorage.removeItem(this.tokenInfo);
  }
}
