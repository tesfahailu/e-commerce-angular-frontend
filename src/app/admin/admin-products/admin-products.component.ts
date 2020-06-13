import { ProductService } from './../../product.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  products: any[];
  filteredProducts: any[];
  subscription: Subscription;

  constructor(private productService: ProductService) {
    this.subscription = this.productService
      .getAll()
      .subscribe(
        (products) => (this.filteredProducts = this.products = products),
      );
  }

  filter(query: string) {
    this.filteredProducts = query
      ? this.products.filter(({ data: { title } }) =>
          title.toLowerCase().includes(query.toLowerCase()),
        )
      : this.products;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  ngOnInit() {}
}
