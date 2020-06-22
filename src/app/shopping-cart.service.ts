import { documentToDomainObject } from './util/documentToDomainObject';
import { ShoppingCartItem } from './models/shopping-cart-item';
import { take, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { Product } from './models/product';
import { ShoppingCart } from './models/shopping-cart';
import { database } from 'firebase';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ShoppingCartService {
  constructor(private db: AngularFireDatabase) {}

  async getCart(): Promise<Observable<any>> {
    let cartId = await this.getOrCreateCartId();
    return this.db
      .object('/shopping-carts/' + cartId)
      .valueChanges()
      .pipe(map((action: any) => new ShoppingCart(action.items)));
  }

  async addToCart(product: Product): Promise<void> {
    this.updateItem(product, 1);
  }

  async removeFromCart(product: Product): Promise<void> {
    this.updateItem(product, -1);
  }

  async clearCart() {
    let cartId = await this.getOrCreateCartId();
    this.db.object('/shopping-carts/' + cartId + '/items').remove();
  }

  private create(): database.ThenableReference {
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime(),
    });
  }

  private getItem(
    cartId: string,
    productId: string,
  ): AngularFireObject<ShoppingCartItem> {
    return this.db.object('/shopping-carts/' + cartId + '/items/' + productId);
  }

  private async getOrCreateCartId(): Promise<string> {
    let cartId = localStorage.getItem('cartId');
    if (cartId) return cartId;
    let result = await this.create();
    localStorage.setItem('cartId', result.key);
    return result.key;
  }

  private async updateItem(product: Product, change: number): Promise<void> {
    let cartId = await this.getOrCreateCartId();
    let itemObservable = this.getItem(cartId, product.id);
    itemObservable
      .valueChanges()
      .pipe(take(1))
      .subscribe((item) => {
        let quantity = ((item && item.quantity) || 0) + change;
        if (quantity === 0) itemObservable.remove();
        else
          itemObservable.update({
            title: product.title,
            imageUrl: product.imageUrl,
            price: product.price,
            quantity,
          });
      });
  }
}
