import { Observable } from 'rxjs/Rx';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpModule,Http,RequestOptions,Headers } from '@angular/http';
import { HttpClientModule } from '@angular/common/http'
import 'rxjs/add/operator/map';
@Injectable()
export class AddNewProductServiceService {

  constructor(private _http:Http,private _router:Router) { }

  public getCategories(){
    return this._http.get("http://localhost:3000/getCategories")
       .map(res=>JSON.parse(res['_body']));
  }

  public addProduct(prod){
    console.log(prod);
     let headers = new Headers({ 'Content-Type': 'application/json' });
     let options = new RequestOptions({ headers: headers });
     return this._http.post("http://localhost:3000/addProduct",JSON.stringify(prod),options);
  }

  public  getProducts(){
    return this._http.get("http://localhost:3000/getProducts")
       .map(res=>JSON.parse(res['_body']));
  }

  public getProduct(product){
    return this._http.get("http://localhost:3000/getProduct/"+product)
    .map(res=>JSON.parse(res['_body']));
  }

  public editProduct(product){
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this._http.put("http://localhost:3000/editProduct",JSON.stringify(product),options);
  }
  
  public deleteProduct(productEditId){
    return this._http.delete("http://localhost:3000/deleteProduct/"+productEditId);
  }

}
