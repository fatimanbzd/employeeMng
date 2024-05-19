import {ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {inject} from "@angular/core";
import {Observable} from "rxjs";
import {RoleEnum} from "../enums/role.enum";
import {AuthService} from "../services/auth.service";

export const AuthGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
):
  Observable<boolean | UrlTree>
  | Promise<boolean | UrlTree>
  | boolean
  | UrlTree => {
  if (! inject(AuthService).isLoggedIn()) {
    return inject(Router).navigate(['/login'], {queryParams: {returnUrl: state.url}})
  }
  return true
};
