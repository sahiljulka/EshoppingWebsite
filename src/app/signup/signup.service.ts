import { Injectable } from '@angular/core';
import { HttpModule,Http,RequestOptions,Headers } from '@angular/http';
import { HttpClientModule } from '@angular/common/http'
import {Router} from '@angular/router';
import 'rxjs/add/operator/do';
import {User} from '../user';
import {JwtHelper } from 'angular2-jwt';
import { CookieService } from 'ngx-cookie-service';
import {JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class SignupService {
  jwtHelper: JwtHelperService = new JwtHelperService();
  constructor(private _http:Http,private _router:Router,private _cookieService:CookieService) { }
 
  public login(user){
    console.log(user);
     let headers = new Headers({ 'Content-Type': 'application/json' });
     let options = new RequestOptions({ headers: headers });
     return this._http.post("http://localhost:3000/login",JSON.stringify(user),options);
  }

  public signUp(user){
    console.log(user);
     let headers = new Headers({ 'Content-Type': 'application/json' });
     let options = new RequestOptions({ headers: headers });
     return this._http.post("http://localhost:3000/signup",JSON.stringify(user),options);
  }

  public isLoggedIn(){
    var token=this._cookieService.get('token');
    // console.log(token);

    if(!token)
      return false;

    var d=this.jwtHelper.isTokenExpired(token);
    return d;
  }

  public CurrentUser(){
    var token=this._cookieService.get('token');
    // console.log(token);
    if(!token)
      return false;
    // console.log(this.jwtHelper.decodeToken(token));
    return this.jwtHelper.decodeToken(token);
  }
}
