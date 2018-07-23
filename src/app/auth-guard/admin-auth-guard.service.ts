import { SignupService } from '../signup/signup.service';
import { Observable } from 'rxjs/Rx';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class AdminAuthGuard implements CanActivate {
 
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    if(this._authService.CurrentUser().isAdmin)
      return true;
    this.router.navigate(['/']);
  }
 
  private router: Router;
 
  constructor(private _authService:SignupService) { }

}
