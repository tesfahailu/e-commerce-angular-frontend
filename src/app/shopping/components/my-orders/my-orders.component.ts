import { switchMap } from 'rxjs/operators';
import { AuthService } from 'shared/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { OrderService } from 'shared/services/order.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
})
export class MyOrdersComponent implements OnInit {
  ordersObservable;
  constructor(
    private authService: AuthService,
    private orderService: OrderService,
  ) {}

  async ngOnInit() {
    this.ordersObservable = this.authService.userObservable.pipe(
      switchMap((user) =>
        this.orderService.getOrdersByUser(user.uid).valueChanges(),
      ),
    );
  }
}
