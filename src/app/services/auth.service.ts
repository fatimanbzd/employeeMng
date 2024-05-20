import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ILoginModel, ILoginResponseModel} from "../models/login.model";
import {Observable} from "rxjs";
import {TokenStorageService} from "./token-storage.service";
import {environment} from "../../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  readonly basUrl = environment.url;

  constructor(private http: HttpClient,
              private tokenStorageService: TokenStorageService) {
  }

  login(model: ILoginModel): Observable<ILoginResponseModel[]> {
    return this.http.get<ILoginResponseModel[]>(`${this.basUrl}users?userName=${model.userName}`);
  }

  setToken(user:ILoginResponseModel){
    this.tokenStorageService.saveAccessToken(user);
  }
  getRole() {
    return this.tokenStorageService.getAccessToken()?.role;
  }

  isLoggedIn() {
    return !!this.tokenStorageService.getAccessToken();
  }

  logOut() {
    return this.tokenStorageService.removeTokens();
  }

}
