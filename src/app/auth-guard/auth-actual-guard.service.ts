import { SignupService } from '../signup/signup.service';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Rx";

@Injectable()
export class AuthActualGuard implements CanActivate {
   

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    if(this._authService.isLoggedIn())
      return true;
    this.router.navigate(['/signup'],{queryParams:{returnUrl:state.url}});
    return false;
  }

  constructor(private _authService:SignupService, private router:Router) { }

}
