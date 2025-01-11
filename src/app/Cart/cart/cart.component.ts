import { Component, ViewChild } from '@angular/core';
import { IBoughtProduct } from '../Models/boughtProduct';
import { CartService } from '../Service/cart.service';
import { IProduct } from '../../Product/Models/IProduct';
import { ProductService } from '../../Product/Service/Products/product.service';
import { IShownProduct } from '../Models/ShownProduct';
import { CommonModule, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule,FormsModule,NgFor],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
boughtProducts: IBoughtProduct[] = [];

allProducts:IProduct[] = [];

shownProducts:IShownProduct[] = [];

totalPrice: number = 0;

confirmedOrder:boolean = false;

disabledOrder:boolean = true;

constructor(private cartService: CartService,private productService: ProductService){
  this.boughtProducts = this.cartService.getCartItems();

  if(this.boughtProducts?.length > 0){
    this.productService.GetProducts().subscribe(products =>{
      this.allProducts = products;

      this.boughtProducts.forEach(product => {
        let exsistedProduct = this.allProducts.find(p => p.id === product.productId);
        if(exsistedProduct !== undefined){

          this.shownProducts.push({
            productId : product.productId,
            productImage : exsistedProduct.image,
            productName: exsistedProduct.title,
            productPrice: exsistedProduct.price,
            productQuantity: product.quantity
            });
            this.totalPrice += exsistedProduct.price * product.quantity;
        }
      })
     console.log(this.shownProducts);
    });
  }
}
removeProduct(product:IShownProduct){
  this.shownProducts = this.shownProducts.filter(p => p.productId !== product.productId);

  this.cartService.RemoveItem(product.productId);

  this.totalPrice -= product.productPrice * product.productQuantity;
}

ClearCart(){
  this.shownProducts = [];
  this.cartService.ClearCart();
  this.totalPrice = 0;
}
ConfirmOrder(){
  console.log(1)
  this.confirmedOrder = true;
  setTimeout(() => {
    this.cartService.AddNewCart(this.cartService.cartItems);
    this.shownProducts = [];
    this.cartService.ClearCart();
    this.totalPrice = 0;
    this.confirmedOrder = false;
  }, 2000);

}
UpdateProduct(quantity: number,id:number){
  if(quantity > 0){
    this.disabledOrder = true;
    this.totalPrice = 0;
    this.shownProducts.forEach((product) =>{
       this.totalPrice += product.productPrice * product.productQuantity
    })
    return
  }
  this.totalPrice = 0;
    this.shownProducts.forEach((product) =>{
       this.totalPrice += product.productPrice * product.productQuantity
    })
  this.disabledOrder = false;
}
}
