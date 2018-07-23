import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/shoppingCart/cart.service';
import { Product } from '../Models/Product';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  cart: any;
  products: Product[];
  isVisible:boolean;
  isClicked:boolean;
  constructor(private _cartService: CartService) {
   
  }

  async ngOnInit() {
    this.isVisible=true;
    await this.setProducts();
    this.isVisible=false;
  }



  async setProducts() {
    this.cart = await this._cartService.getOrCreateCart(true);
  }



  async onAddToCart(product) {
    this.isVisible=true;
    this.isClicked=true;
    var d = await this._cartService.addToCart(product, true);
    console.log(d);
    // this.products.filter((prod) => {
    //   return prod["_id"] == product._id
    // })
    //   .map((prod) => {
    //     prod.quantity = (prod.quantity ? prod.quantity : 0) + 1;
    //   });
    // this._cartService.nProducts += 1;
    await this.setProducts();
    this.isVisible=false;
    this.isClicked=false;
    
  }

  async onSubtractFromCart(product) {
    this.isVisible=true;
    this.isClicked=true;
    var d = await this._cartService.addToCart(product, false);
    console.log(d);
    // this.products.filter((prod) => {
    //   return prod["_id"] == product._id
    // })
    //   .map((prod) => {
    //     prod.quantity -= 1;
    //   });
    // this._cartService.nProducts -= 1;
    await this.setProducts();
    this.isVisible=false;
    this.isClicked=false;
  }
}
