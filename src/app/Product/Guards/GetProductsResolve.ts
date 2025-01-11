import { inject, Injectable } from "@angular/core";
import { ResolveFn } from "@angular/router";
import { ProductService } from "../Service/Products/product.service";
import { IProduct } from "../Models/IProduct";

export const GetProductsResolve : ResolveFn<IProduct[]> = () => {

  let service = inject(ProductService);

  return service.GetProducts();

}
