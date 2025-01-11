import { Injectable } from '@angular/core';
import { ICart } from '../Models/Cart';
import { IBoughtProduct } from '../Models/boughtProduct';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartItems:ICart = {} as ICart;

  constructor(private httpClient:HttpClient) {

   }

  getCartItems(){
    return this.cartItems.products;
  }

  addToCart(product: IBoughtProduct){
    if(this.cartItems.products){
      let boughtProduct = this.cartItems.products.find(p => p.productId === product.productId)
      if(boughtProduct !== undefined){
          boughtProduct.quantity += product.quantity;
          return;
    }
    this.cartItems.products.push(product);
  }
    else{
      this.cartItems.products = [product];
      this.cartItems.userId = 1;
      this.cartItems.date = new Date();
    }
  }

  ClearCart(){
    this.cartItems = {} as ICart;
  }
  RemoveItem(id: number){
    this.cartItems.products = this.cartItems.products.filter(p => p.productId!== id);
  }

  AddNewCart(cart: ICart){
    return this.httpClient.post(`https://fakestoreapi.com/carts`, JSON.stringify(cart))
  }


}
