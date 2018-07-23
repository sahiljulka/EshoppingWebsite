import { ValidationComponent } from '../validation/validation.component';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { SignupService } from './signup.service';
import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: 'app-login',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  providers:[ValidationComponent],
  encapsulation:ViewEncapsulation.None
})
export class SignupComponent implements OnInit {
  hideError:boolean;
   isVisible:boolean;
   errorMessage:any;
  constructor(private route:ActivatedRoute,private _loginService:SignupService,public snackBar: MatSnackBar,private _router:Router,private validtion:ValidationComponent) {
    this.isVisible=false;
    this.hideError=true;
    this.errorMessage="";
   }

  ngOnInit() {
  }

  onSubmit(email,password,name){
    console.log("SignuP");
    console.log(email+" "+password);
    if(email.length ==0 || password.length ==0 )
    {
      this.validtion.showError("Field should not be empty");
      return;
    }   
    this.errorMessage="";
    this.hideError=true;
    this.isVisible=true;
    this._loginService.signUp({"email":email,"password":password,"profile":{"name":name}})
    .subscribe(
        res=>{
          console.log("response");
          console.log(res);
          if(res.status==200){
            let returnUrl=this.route.snapshot.queryParamMap.get('returnUrl');
            this._router.navigate([returnUrl || ""]);
          }
          this.isVisible=false;
        },
        (err:Response)=>{
          console.log("error");
          if(err.status==404)
           this.validtion.showError("User with same Email already exists");
          else
            this.validtion.showError(err);
          this.isVisible=false;
          return;
       }
    )
  }

  onSubmitLogin(email,password){
    if(email.length ==0 || password.length ==0 )
    {
      this.validtion.showError("Field should not be empty");
      return;
    }   
    this.errorMessage="";
    this.hideError=true;
    this.isVisible=true;
    this._loginService.login({"email":email,"password":password})
    .subscribe(
        res=>{
          console.log("response");
          console.log(res);
          if(res.status==200){
            let returnUrl=this.route.snapshot.queryParamMap.get('returnUrl');
            this._router.navigate([returnUrl || ""]);
          }
          this.isVisible=false;
        },
        err=>{
          this.validtion.showError(err);
          this.isVisible=false;
          return;
       }
    )
  }
}
