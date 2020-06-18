import { switchMap } from 'rxjs/operators';
import { Category } from './../models/category';
import { Observable } from 'rxjs';
import { CategoryService } from './../category.service';
import { ProductService } from './../product.service';
import { Component } from '@angular/core';
import { Product } from '../models/product';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
})
export class ProductsComponent {
  products: Product[] = [];
  filteredProducts: Product[];
  categoriesObservable: Observable<Category[]>;
  paramCategory: string;

  constructor(
    route: ActivatedRoute,
    productService: ProductService,
    categoryService: CategoryService,
  ) {
    productService
      .getProductsObservable()
      .pipe(
        switchMap((products) => {
          this.products = products;
          return route.queryParamMap;
        }),
      )
      .subscribe((params) => {
        this.paramCategory = params.get('category');
        this.filteredProducts = this.paramCategory
          ? this.products.filter((p) => p.category === this.paramCategory)
          : this.products;
      });
    this.categoriesObservable = categoryService.getCategoriesObservable();
  }
}
