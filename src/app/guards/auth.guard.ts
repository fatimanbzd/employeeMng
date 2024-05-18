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
  if (inject(AuthService).isLoggedIn()) {
    debugger
    const expectedRoles: RoleEnum[] = route.data['roles'];
    const userRole: RoleEnum | undefined = inject(AuthService).getRole();
    if (userRole && expectedRoles.some((role) => userRole && userRole === role)) {
      return true;
    } else {
      return inject(Router).createUrlTree(['/login']);
    }
  } else {
    return inject(Router).createUrlTree(['/login']);
  }
};
