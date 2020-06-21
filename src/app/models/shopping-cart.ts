import { ShoppingCartItem } from './shopping-cart-item';
export class ShoppingCart {
  dateCreated: number;
  items: ShoppingCartItem[] = [];

  constructor(public itemsMap: { [productId: string]: ShoppingCartItem }) {
    for (let productId in itemsMap) {
      this.items.push(itemsMap[productId]);
    }
  }

  get totalItemsCount(): number {
    let count = 0;
    for (let productId in this.items) count += this.items[productId].quantity;
    return count;
  }
}