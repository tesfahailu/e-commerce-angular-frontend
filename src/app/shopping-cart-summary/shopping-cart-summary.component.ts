import { Component, OnInit, Input } from '@angular/core';
import { ShoppingCart } from '../models/shopping-cart';

@Component({
  selector: 'shopping-cart-summary',
  templateUrl: './shopping-cart-summary.component.html',
})
export class ShoppingCartSummaryComponent {
  @Input('cart') cart: ShoppingCart;
}
