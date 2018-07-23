import { CartService } from './../services/shoppingCart/cart.service';
import { forEach } from '@angular/router/src/utils/collection';
import { ActivatedRoute } from '@angular/router';
import { Product } from './../Models/Product';
import { ValidationComponent } from '../validation/validation.component';
import { AddNewProductServiceService } from '../admin/add-new-product/add-new-product-service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css'],
  providers:[ValidationComponent]
})
export class AllProductsComponent implements OnInit {

  isDisabled:boolean=false;
  selectedCategory:Number;
  categories:any;
  products:Product[];
  permProducts:Product[];
  isVisible:boolean=true;
  constructor(private _cartService:CartService,private _addNewProductService:AddNewProductServiceService,private vldtion:ValidationComponent,private _activatedRoute:ActivatedRoute) {

        this._addNewProductService.getCategories().subscribe((data)=>{
          this.categories=data;
        });

        this._addNewProductService.getProducts().subscribe((data)=>{
          this.products=data;
          this.permProducts=data;
          this.setProducts();

          this._activatedRoute.queryParamMap.subscribe(params=>{
            this.selectedCategory=parseInt(params.get('category'));
            this.products=this.selectedCategory || this.selectedCategory==0? this.permProducts.filter(a=>a.category === this.selectedCategory):this.permProducts;
            this.isVisible=false;
          });
         
        },
        (err)=>{
          this.vldtion.showError(err);
          this.isVisible=false;      
        })
   }

  async setProducts(){
        let cart=await this._cartService.getOrCreateCart(true); 
        console.log(cart);
        console.log(this.products);
        cart.items.forEach((a)=>{
        this.products.filter((b)=>{
          return b["_id"] == a["product"]._id
        })
        .map((prod)=>
          prod.quantity=a["quantity"]
          );
        });
        console.log(this.products);
   }
  async ngOnInit() {
   
  }

  async onAddToCart(product){
    this.isVisible=true;      
    this.isDisabled=true;
    var d=await this._cartService.addToCart(product,true);
    console.log(d);
    this.products.filter((prod)=>{
      return prod["_id"]==product._id
    })
    .map((prod)=>{
      prod.quantity=(prod.quantity?prod.quantity:0)+1;
    });
    this._cartService.nProducts+=1;
    this.vldtion.showError("Product Added To Cart");
    this.isDisabled=false;
    this.isVisible=false;   
   }

  async onSubtractFromCart(product){
    this.isVisible=true;      
    this.isDisabled=true;
    var d=await this._cartService.addToCart(product,false);
    console.log(d);
    this.products.filter((prod)=>{
      return prod["_id"]==product._id
    })
    .map((prod)=>{
      prod.quantity-=1;
    });
    this._cartService.nProducts-=1;    
    this.vldtion.showError("Product Added To Cart");
    this.isDisabled=false;
    this.isVisible=false;   
   }


}
