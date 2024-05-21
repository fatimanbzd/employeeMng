import {ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {inject} from "@angular/core";
import {AuthService} from "../shared/services/auth.service";
import {RoleEnum} from "../shared/enums/role.enum";
import {Observable} from "rxjs";


export const ManagerGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
):
  Observable<boolean | UrlTree>
  | Promise<boolean | UrlTree>
  | boolean
  | UrlTree => {
  if (inject(AuthService).isLoggedIn()) {
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
}
