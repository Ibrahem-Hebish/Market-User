import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IProduct } from '../../Models/IProduct';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:HttpClient) { }

  GetProduct(id:number){
    return this.http.get<IProduct>(`https://fakestoreapi.com/products/${id}`);
  }
  GetProducts(){
    return this.http.get<IProduct[]>('https://fakestoreapi.com/products');
  }
  FilterByCategory(cat:string){
    return this.http.get<IProduct[]>(`https://fakestoreapi.com/products/category/${cat}`);
  }
}
