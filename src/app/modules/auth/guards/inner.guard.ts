import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { LoggingService } from 'src/app/modules/core';
import { AuthenticationService } from 'src/app/modules/auth/services';

@Injectable({
  providedIn: 'root'
})
export class InnerGuard implements CanActivate {

  constructor(
    private router: Router,
    private logger: LoggingService,
    private auth: AuthenticationService,
  ) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if(this.auth.isLoggedIn) {
      this.logger.trace("Cannot activate");
      this.router.navigate(['/'])
    }

    return true;
  }

}
