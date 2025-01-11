import { ResolveFn } from "@angular/router";
import { CategoryService } from "../Service/Categories/Category.service";
import { inject } from "@angular/core";

export const GetCategoriesResolver : ResolveFn<string[]> = () => {
  let categoryService = inject(CategoryService);

  return categoryService.GetCategories();
}
