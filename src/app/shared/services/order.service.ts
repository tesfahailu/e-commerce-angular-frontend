import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { Order } from 'shared/models/order';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';

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
