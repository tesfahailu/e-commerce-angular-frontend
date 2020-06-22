import { ShoppingCart } from '../models/shopping-cart';
import { ShoppingCartService } from './../shopping-cart.service';
import { switchMap } from 'rxjs/operators';
import { ProductService } from './../product.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Product } from '../models/product';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[];
  paramCategory: string;
  cartObservable: Observable<ShoppingCart>;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private shoppingCartService: ShoppingCartService,
  ) {}

  async ngOnInit(): Promise<void> {
    this.cartObservable = await this.shoppingCartService.getCart();
    this.populateProduct();
  }

  private populateProduct() {
    this.productService
      .getProductsObservable()
      .pipe(
        switchMap((products) => {
          this.products = products;
          return this.route.queryParamMap;
        }),
      )
      .subscribe((params) => {
        this.paramCategory = params.get('category');
        this.applyFilter();
      });
  }

  private applyFilter() {
    this.filteredProducts = this.paramCategory
      ? this.products.filter((p) => p.category === this.paramCategory)
      : this.products;
  }
}
