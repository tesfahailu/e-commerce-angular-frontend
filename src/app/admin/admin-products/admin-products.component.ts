import { Product } from './../../models/product';
import { ProductService } from './../../product.service';
import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

const ADD_PRODUCT_BUTTON_TEXT = 'New Product';
const TABLE_HEADERS = ['Title', 'Price'];
const EDIT_PRODUCT_TEXT = 'Edit';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
})
export class AdminProductsComponent implements OnDestroy {
  addProductButtonText: string = ADD_PRODUCT_BUTTON_TEXT;
  editProductText: string = EDIT_PRODUCT_TEXT;
  filteredProducts: Product[];
  products: Product[];
  tableHeaders: string[] = TABLE_HEADERS;
  subscription: Subscription;

  constructor(private productService: ProductService) {
    this.subscription = this.productService
      .getProductsObservable()
      .subscribe(
        (products) => (this.filteredProducts = this.products = products),
      );
  }

  filter(query: string) {
    this.filteredProducts = query
      ? this.products.filter(({ title }) =>
          title.toLowerCase().includes(query.toLowerCase()),
        )
      : this.products;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
