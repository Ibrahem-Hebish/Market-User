import { Routes } from '@angular/router';
import { AllproductsComponent } from './Product/allproducts/allproducts.component';
import { CartComponent } from './Cart/cart/cart.component';
import { NotFoundComponent } from './Shared/NotFound/NotFound.component';
import { GetProductsResolve } from './Product/Guards/GetProductsResolve';
import { ProductdetailsComponent } from './Product/productdetails/productdetails.component';
import { GetProductResolve } from './Product/Guards/GetProductResolver';
import { resolve } from 'node:path';
import { GetCategoriesResolver } from './Product/Guards/GetCategoriesResolver';

export const routes: Routes = [
  {path: '', redirectTo:"/Products",pathMatch: "full"},
  {path: 'Products', component: AllproductsComponent},
  // {path: 'Products', component: AllproductsComponent,resolve:{data:GetProductsResolve,categories:GetCategoriesResolver}},
  {path: 'ProductDetails/:id', component: ProductdetailsComponent,resolve:{data:GetProductResolve}},
  {path:"Cart", component : CartComponent},
  {path : "**", component : NotFoundComponent}
];
