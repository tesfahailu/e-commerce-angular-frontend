import { Component } from '@angular/core';
import { OrderService } from 'shared/services/order.service';

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
