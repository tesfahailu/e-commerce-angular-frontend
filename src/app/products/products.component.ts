import { Observable } from 'rxjs';
import { CategoryService } from './../category.service';
import { ProductService } from './../product.service';
import { Component } from '@angular/core';
import { Product } from '../models/product';
import { Category } from '../models/category';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
})
export class ProductsComponent {
  productsObservable: Observable<Product[]>;
  categoriesObservable: Observable<Category[]>;

  constructor(
    productService: ProductService,
    categoryService: CategoryService,
  ) {
    this.productsObservable = productService.getProductsObservable();
    this.categoriesObservable = categoryService.getCategoriesObservable();
  }
}
