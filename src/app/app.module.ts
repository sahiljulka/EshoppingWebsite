import { CartService } from './services/shoppingCart/cart.service';
import { AddNewProductServiceService } from './admin/add-new-product/add-new-product-service.service';
import { AdminAuthGuard } from './auth-guard/admin-auth-guard.service';
import { AuthActualGuard } from './auth-guard/auth-actual-guard.service';
import { SignupAuthGuard } from './auth-guard/auth-guard.service';
import { CustomMaterialModuleModule } from './custom-material-module/custom-material-module.module';
import { SignupService } from './signup/signup.service';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http'
import { HttpModule } from '@angular/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { NavbarComponent } from './navbar/navbar.component';
import { CookieService } from 'ngx-cookie-service';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { AddNewProductComponent } from './admin/add-new-product/add-new-product.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { ValidationComponent } from './validation/validation.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { SearchProdPipe } from './admin/admin-products/search-prod.pipe';
import { Angular2FontawesomeModule } from 'angular2-fontawesome/angular2-fontawesome';
import { AllProductsComponent } from './all-products/all-products.component';
import { CardComponent } from './card/card.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { CartProductComponent } from './cart-product/cart-product.component'

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    NavbarComponent,
    MyOrdersComponent,
    CheckoutComponent,
    AddNewProductComponent,
    AdminProductsComponent,
    ValidationComponent,
    SpinnerComponent,
    SearchProdPipe,
    AllProductsComponent,
    CardComponent,
    ShoppingCartComponent,
    CartProductComponent
  ],
  imports: [
    HttpModule,
    HttpClientModule,
    BrowserModule,
    FormsModule,
    Angular2FontawesomeModule,
    CustomMaterialModuleModule,
    RouterModule.forRoot([
        {path:'',component:AllProductsComponent},
        {path:'signup',component:SignupComponent,canActivate:[SignupAuthGuard]},
        {path:'my-orders',component:MyOrdersComponent,canActivate:[AuthActualGuard]},  
        {path:'checkout',component:CheckoutComponent,canActivate:[AuthActualGuard]},  
        {path:'admin/Products',component:AdminProductsComponent,canActivate:[AdminAuthGuard]},                    
        {path:'admin/Products/new',component:AddNewProductComponent,canActivate:[AdminAuthGuard]},
        {path:'admin/Products/:id',component:AddNewProductComponent,canActivate:[AdminAuthGuard]},  
        {path:'Cart',component:ShoppingCartComponent},  
        
    ])
  ],
  providers: [CartService,
              SignupService,
              CookieService,
              SignupAuthGuard,
              AdminAuthGuard,
              AuthActualGuard,
              AddNewProductServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
