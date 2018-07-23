import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: 'app-validation',
  templateUrl: './validation.component.html',
  styleUrls: ['./validation.component.css']
})
export class ValidationComponent implements OnInit {

  constructor(@Inject(MatSnackBar) public snackBar: MatSnackBar) { }

  ngOnInit() {
       
  }

  showError(message){
     if(message.status==0){
        message="Not able to connect to Server";
      }
      this.snackBar.open(message, "Dismiss", {
        duration: 2000,
      });
  }

}
