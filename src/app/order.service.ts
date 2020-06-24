import { ShoppingCartService } from './shopping-cart.service';
import { Order } from './models/order';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(
    private db: AngularFireDatabase,
    private shoppingCartService: ShoppingCartService,
  ) {}

  async placeOrder(order: Order): Promise<any> {
    let result = await this.db.list('/orders').push(order);
    this.shoppingCartService.clearCart();
    return result;
  }

  getOrders(): AngularFireList<Observable<Order>> {
    return this.db.list('/orders');
  }

  getOrdersByUser(userId: string): AngularFireList<Observable<Order>> {
    console.log(userId);
    return this.db.list('/orders', (ref) =>
      ref.orderByChild('userId').equalTo(userId),
    );
  }
}
