import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ILoginModel, ILoginResponseModel} from "../models/login.model";
import {filter, map, Observable, tap} from "rxjs";
import {TokenStorageService} from "./token-storage.service";
import {IRoleModel} from "../models/role.model";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly userUrl = 'assets/data/users.json';
  private readonly roleUrl = 'assets/data/roles.json';

  constructor(private http: HttpClient,
              private tokenStorageService: TokenStorageService) {
  }

  login(model: ILoginModel): Observable<ILoginResponseModel> {
    return this.http.post<ILoginResponseModel>(this.userUrl, model)
      .pipe(tap((response) => {
        this.tokenStorageService.saveAccessToken(response);
      }));
  }

  getRole() {
    return this.tokenStorageService.getAccessToken().role;
  }

  isLoggedIn() {
    return !!this.tokenStorageService.getAccessToken();
  }
}
