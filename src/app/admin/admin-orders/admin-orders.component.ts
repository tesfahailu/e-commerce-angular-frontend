import { Order } from './../../models/order';
import { OrderService } from './../../order.service';
import { Component } from '@angular/core';

@Component({
  selector: 'admin-orders',
  templateUrl: './admin-orders.component.html',
})
export class AdminOrdersComponent {
  ordersObservable;

  constructor(private orderService: OrderService) {
    this.ordersObservable = orderService.getOrders().valueChanges();
  }
}
