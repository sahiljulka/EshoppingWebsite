import { Router, ActivatedRoute } from '@angular/router';
import { ValidationComponent } from './../../validation/validation.component';
import { AddNewProductServiceService } from './add-new-product-service.service';
import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/take';

@Component({
  selector: 'app-add-new-product',
  templateUrl: './add-new-product.component.html',
  styleUrls: ['./add-new-product.component.css'],
  providers:[ValidationComponent]
})
export class AddNewProductComponent implements OnInit {
 isVisible:boolean=true;
 product={};
 errorMessage:string;
 categories:any;
 selected:any;
 photoURL:string;
 productEditId;
//  private vldtion:ValidationComponent=new ValidationCompone nt();
  constructor(private _addNewProductService:AddNewProductServiceService, private vldtion:ValidationComponent,private _router:Router,private _activatedRoute:ActivatedRoute) { }

  ngOnInit() {
   this._addNewProductService.getCategories().subscribe((data)=>{
      this.categories=data;
   });
    this.productEditId =(this._activatedRoute.snapshot.params.id);
    if(this.productEditId!='add'){
      this._addNewProductService.getProduct(this.productEditId).take(1).subscribe((d)=>{
        this.product=d;
        this.isVisible=false;
      })
    }
  }

  onSubmit(a){
    if(!a.valid){
      this.vldtion.showError("Fields should not be empty");
      return;
    }
    if(this.productEditId==undefined){
        this._addNewProductService.addProduct(a.value).subscribe((data)=>{
            console.log(data);
            if(data.status==200)
              this._router.navigate(['admin/Products']);
            else
              this.vldtion.showError(JSON.stringify(data['body'],null,4));
            },
            (error:Response)=>{
              this.vldtion.showError(JSON.stringify(error,null,4));
            })
    }
    else{
       this._addNewProductService.editProduct(this.product).subscribe((data)=>{
            console.log(data);
            if(data.status==200)
              this._router.navigate(['admin/Products']);
            else
              this.vldtion.showError(JSON.stringify(data['body'],null,4));
       },
        (error:Response)=>{
              this.vldtion.showError(JSON.stringify(error,null,4));
        })
    }
  }

  deleteProduct(product){
    this._addNewProductService.deleteProduct(this.productEditId).subscribe((data)=>{
      console.log(data);
      if(data.status==200)
        this._router.navigate(['admin/Products']);
      else
        this.vldtion.showError(JSON.stringify(data['body'],null,4));
      },
      (error:Response)=>{
        this.vldtion.showError(JSON.stringify(error,null,4));
      });
  }

  onChange(t){
    console.log(t);
  }

}
