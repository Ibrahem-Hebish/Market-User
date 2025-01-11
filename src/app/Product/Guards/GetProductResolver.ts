import { inject, Injectable } from "@angular/core";
import { ActivatedRoute, ResolveFn } from "@angular/router";
import { ProductService } from "../Service/Products/product.service";
import { IProduct } from "../Models/IProduct";

export const GetProductResolve : ResolveFn<IProduct> = (route) => {

  let service = inject(ProductService);

  let id:any = route.paramMap.get("id");

  return service.GetProduct(id);

}
