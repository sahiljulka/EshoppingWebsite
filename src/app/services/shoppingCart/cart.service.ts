import { forEach } from '@angular/router/src/utils/collection';
import { Injectable } from '@angular/core';
import { HttpModule,Http,RequestOptions,Headers } from '@angular/http';

@Injectable()
export class CartService {

  constructor(private _http:Http) { }
  nProducts:number=0;

  async addToCart(product,addOrRemove){
    let shoppingCartId=await this.getOrCreateCart(false);
    return this.updateCart(shoppingCartId,product,addOrRemove);
  }

  private updateCart(shoppingCartId,product,addOrRemove){
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });
      return this._http.put("http://localhost:3000/addProductToCart",JSON.stringify({shoppingCartId,product,addOrRemove}),options)
      .map(res=>JSON.parse(res['_body']))
      .toPromise();
  }

  private getCart(cartId){
     return this._http.get("http://localhost:3000/getCart/"+cartId)
      .map(res=>JSON.parse(res['_body']))
      .toPromise();
  }
   
  private createCart(){
     let headers = new Headers({ 'Content-Type': 'application/json' });
     let options = new RequestOptions({ headers: headers });
     return this._http.post("http://localhost:3000/addCart",JSON.stringify({"dateCreated":new Date().getTime()}),options)
     .map(res=>JSON.parse(res['_body']))
     .toPromise();
  }

  public  async getOrCreateCart(getCart:boolean){
      let cartId=localStorage.getItem('cartId');
      if(cartId){
        if(!getCart)
          return cartId;
        let cart=await this.getCart(cartId);
        this.nProducts=0;
        cart.items.forEach(a=>{
          this.nProducts+=a.quantity;
        });
        return cart;
      }
      else{
          console.log("not present in localstorage");
          let cart=await this.createCart();
          localStorage.setItem('cartId',cart["_id"]);
          return getCart?cart:cart["_id"];
      }
  }
}
