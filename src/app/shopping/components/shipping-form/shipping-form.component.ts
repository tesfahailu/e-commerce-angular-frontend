import { ShoppingCart } from 'shared/models/shopping-cart';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from 'shared/services/auth.service';
import { OrderService } from 'shared/services/order.service';
import {
  FormBuilder,
  FormGroup,
  AbstractControl,
  Validators,
} from '@angular/forms';
import { Order } from 'shared/models/order';

enum Label {
  NAME = 'Name',
  ADDRESS_LINE_1 = 'Address Line 1',
  ADDRESS_LINE_2 = 'Address Line 2',
  CITY = 'City',
}
enum Error {
  NAME_REQUIRED = 'Name is required.',
  ADDRESS_LINE_1_REQUIRED = 'Address line 1 is required.',
  ADDRESS_LINE_2_REQUIRED = 'Address line 2 is required.',
  CITY_REQUIRED = 'City is required.',
}

const PLACE_ORDER_BUTTON_TEXT = 'Place Order';

@Component({
  selector: 'shipping-form',
  templateUrl: './shipping-form.component.html',
})
export class ShippingFormComponent implements OnInit, OnDestroy {
  @Input('cart') cart: ShoppingCart;
  label: typeof Label = Label;
  error: typeof Error = Error;
  placeOrderButtonText: string = PLACE_ORDER_BUTTON_TEXT;
  userId: string;
  userSubscription: Subscription;
  shippingForm: FormGroup;

  constructor(
    private router: Router,
    private authService: AuthService,
    private orderService: OrderService,
    private formBuilder: FormBuilder,
  ) {}

  get name(): AbstractControl {
    return this.shippingForm.get('name');
  }
  get addressLine1(): AbstractControl {
    return this.shippingForm.get('addressLine1');
  }
  get addressLine2(): AbstractControl {
    return this.shippingForm.get('addressLine2');
  }
  get city(): AbstractControl {
    return this.shippingForm.get('city');
  }

  ngOnInit(): void {
    this.shippingForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      addressLine1: ['', Validators.required],
      addressLine2: ['', Validators.required],
      city: ['', Validators.required],
    });
    this.userSubscription = this.authService.userObservable.subscribe(
      (user) => (this.userId = user.uid),
    );
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }

  async placeOrder(): Promise<void> {
    let order = new Order(this.userId, this.shippingForm.value, this.cart);
    let result = await this.orderService.placeOrder(order);
    this.router.navigate(['/order-success', result.key]);
  }
}
