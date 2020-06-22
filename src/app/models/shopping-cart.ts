import { ShoppingCartItem } from './shopping-cart-item';
import { Product } from './product';
export class ShoppingCart {
  dateCreated: number;
  items: ShoppingCartItem[] = [];

  constructor(public itemsMap: { [productId: string]: ShoppingCartItem }) {
    this.itemsMap = itemsMap || {};
    for (let productId in itemsMap) {
      let item = itemsMap[productId];
      this.items.push(new ShoppingCartItem({ ...item, id: productId }));
    }
  }

  getQuantity(product: Product) {
    let item = this.itemsMap[product.id];
    return item ? item.quantity : 0;
  }

  get totalItemsCount(): number {
    let count = 0;
    for (let productId in this.items) count += this.items[productId].quantity;
    return count;
  }

  get totalPrice(): number {
    let sum = 0;
    for (let productId in this.items) {
      sum += this.items[productId].totalPrice;
    }
    return sum;
  }
}
