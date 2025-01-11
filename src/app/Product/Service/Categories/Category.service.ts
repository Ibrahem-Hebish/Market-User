import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

constructor(private http:HttpClient) { }

  GetCategories(){
    return this.http.get<any[]>(`https://fakestoreapi.com/products/categories`);
  }

}
