import { Component, NgModule, ViewChild } from '@angular/core';
import { IProduct } from '../Models/IProduct';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../Service/Products/product.service';
import { IBoughtProduct } from './../../Cart/Models/boughtProduct';
import { CartService } from '../../Cart/Service/cart.service';
import { CategoryService } from '../Service/Categories/Category.service';


@Component({
  selector: 'app-allproducts',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './allproducts.component.html',
  styleUrl: './allproducts.component.css'
})
export class AllproductsComponent {

 products:IProduct[] = [];
 categories:string[] = [];
 selectedCat:string = "All";
 loading:boolean = false;
 showSuccessMessage:boolean = false;

  constructor(
    private route:ActivatedRoute,
    private router:Router,
    private productService:ProductService,
    private cartService:CartService,
    private catService:CategoryService
  )
  {
  this.loading = true;
  this.productService.GetProducts().subscribe(products =>{
   this.loading = false;
   this.products = products
  });

  this.catService.GetCategories().subscribe(categories =>{
  this.categories = categories;
  });
  }

  AddToCart(product:IProduct){
    this.showSuccessMessage = true;
    setTimeout(() => {
      this.showSuccessMessage = false;
    }, 1000);
    let boughtProduct :IBoughtProduct = {
      productId:product.id,
      quantity:1
    }
    this.cartService.addToCart(boughtProduct);

  }

  GoTODetails(id:number){
    this.router.navigate([`/ProductDetails/${id}`]);
  }

  filter(){
    this.loading = true;
    if(this.selectedCat == "All")
        this.productService.GetProducts()
        .subscribe(data => {
          this.products = data
          this.loading = false;
        });

    else
        this.productService.FilterByCategory(this.selectedCat)
        .subscribe(data => {
          this.products = data
          this.loading = false;
        });
      }
}
