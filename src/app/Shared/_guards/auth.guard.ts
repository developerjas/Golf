import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';

import { UserService } from '../_services';
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private UserService: UserService
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    router: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Promise<boolean | UrlTree>
    | Observable<boolean | UrlTree> {
    return this.UserService.user.pipe(
      take(1),
      map(user => {
        const isAuth = !!user;
        if (isAuth) {
          return true;
        }
          return this.router.createUrlTree(['/login']);
      }),
       //tap(isAuth => {
       //  if (!isAuth) {
       //      this.router.navigate(['/login']);
       //  }
       //})
    );
  }
}
