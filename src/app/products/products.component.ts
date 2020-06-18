import { ProductService } from './../product.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
})
export class ProductsComponent {
  productsObservable;
  constructor(productService: ProductService) {
    this.productsObservable = productService.getProductsObservable();
  }
}
