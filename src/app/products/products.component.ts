import { switchMap } from 'rxjs/operators';
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
  paramCategory: string;

  constructor(route: ActivatedRoute, productService: ProductService) {
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
  }
}
