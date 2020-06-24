import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ShoppingCart } from 'shared/models/shopping-cart';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';

@Component({
  selector: 'shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss'],
})
export class ShoppingCartComponent implements OnInit {
  cartObservable: Observable<ShoppingCart>;
  constructor(private shoppingCartService: ShoppingCartService) {}

  async ngOnInit(): Promise<void> {
    this.cartObservable = await this.shoppingCartService.getCart();
  }

  clearCart(): void {
    this.shoppingCartService.clearCart();
  }
}
