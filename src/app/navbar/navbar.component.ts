import { CartService } from './../services/shoppingCart/cart.service';
import { Router } from '@angular/router';
import { SignupService } from './../signup/signup.service';
import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  userName:any;
  constructor(private _cookieService:CookieService,private _signupService:SignupService,private _router:Router,private _cartService:CartService) {
   this.userName= this._signupService.CurrentUser;
  }

  ngOnInit() {
  }

  logout(){
    this._cookieService.delete('token');
    this._router.navigate(["/"]);
  }

}
