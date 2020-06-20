import { Item } from './models/item';
import { take } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { Product } from './models/product';
import { Cart } from './models/cart';
import { database } from 'firebase';

@Injectable({
  providedIn: 'root',
})
export class ShoppingCartService {
  constructor(private db: AngularFireDatabase) {}

  private create(): database.ThenableReference {
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime(),
    });
  }

  private getCart(cartId: string): AngularFireObject<Cart> {
    console.log('Get cart ran');
    return this.db.object('/shopping-carts/' + cartId);
  }

  private getItem(cartId: string, productId: string): AngularFireObject<Item> {
    return this.db.object('/shopping-carts/' + cartId + '/items/' + productId);
  }

  private async getOrCreateCartId(): Promise<string> {
    let cartId = localStorage.getItem('cartId');
    if (cartId) return cartId;
    let result = await this.create();
    localStorage.setItem('cartId', result.key);
    return result.key;
  }

  async addToCart(product: Product): Promise<void> {
    let cartId = await this.getOrCreateCartId();
    let itemObservable = this.getItem(cartId, product.id);
    itemObservable
      .snapshotChanges()
      .pipe(take(1))
      .subscribe((item) => {
        const itemValue = item.payload.val() as Item;
        itemObservable.update({
          product: product,
          quantity: ((itemValue && itemValue.quantity) || 0) + 1,
        });
      });
  }
}
