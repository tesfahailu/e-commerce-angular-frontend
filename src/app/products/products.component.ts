import { ShoppingCart } from '../models/shopping-cart';
import { ShoppingCartService } from './../shopping-cart.service';
import { switchMap } from 'rxjs/operators';
import { ProductService } from './../product.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Product } from '../models/product';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
})
export class ProductsComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  filteredProducts: Product[];
  paramCategory: string;
  cart: ShoppingCart;
  subscription: Subscription;

  constructor(
    route: ActivatedRoute,
    productService: ProductService,
    private shoppingCartService: ShoppingCartService,
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
  }

  async ngOnInit(): Promise<void> {
    this.subscription = (await this.shoppingCartService.getCart()).subscribe(
      (cart) => (this.cart = cart),
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
