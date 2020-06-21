import { ShoppingCartItem } from './shopping-cart-item';
export class ShoppingCart {
  dateCreated: number;

  constructor(public items: ShoppingCartItem[]) {}

  get productIds() {
    return Object.keys(this.items);
  }

  get totalItemsCount(): number {
    let count = 0;
    for (let productId in this.items) count += this.items[productId].quantity;
    return count;
  }
}
