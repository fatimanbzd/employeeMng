import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ILoginModel, ILoginResponseModel} from "../models/login.model";
import {map, Observable} from "rxjs";
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

  login(model: ILoginModel): Observable<ILoginResponseModel | null> {
    return this.http.post<ILoginResponseModel>(`${this.basUrl}users`,model).pipe(
      map(user => {
debugger
        if (user) {
          this.tokenStorageService.saveAccessToken(user);
          return user;
        } else {
          return null; // Return null if the user is not found
        }
      })
    );
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
