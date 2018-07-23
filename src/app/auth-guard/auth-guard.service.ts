import { Observable } from 'rxjs/Rx';
import { SignupService } from './../signup/signup.service';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class SignupAuthGuard implements CanActivate {
  private router:Router;
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    if(this._authService.isLoggedIn())
      return false;
    return true;
  }

  constructor(private _authService:SignupService) { }

}
