import { ValidationComponent } from '../../validation/validation.component';
import { AddNewProductServiceService } from '../add-new-product/add-new-product-service.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css'],
  providers:[ValidationComponent]
})
export class AdminProductsComponent implements OnInit {
  
  searchText:String;
  isVisible:boolean=true;
  displayedColumns = ['title', 'price', 'category','action'];
  products:any[];
  dataSource;// = new MatTableDataSource<Element>(ELEMENT_DATA);

  constructor(private _addNewProductService:AddNewProductServiceService, private vldtion:ValidationComponent) { }

  ngOnInit() {
    this._addNewProductService.getProducts().subscribe((data)=>{
      this.products=data;
      
      this.dataSource= new MatTableDataSource<Element>(this.products);
      this.isVisible=false;
    },(err)=>{
      this.vldtion.showError(err);
      this.isVisible=false;       
    });
  }

  


}
