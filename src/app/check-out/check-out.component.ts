import { Order } from './../models/order';
import { AuthService } from './../auth.service';
import { OrderService } from './../order.service';
import { ShoppingCart } from './../models/shopping-cart';
import { ShoppingCartService } from './../shopping-cart.service';
import {
  FormBuilder,
  Validators,
  FormGroup,
  AbstractControl,
} from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

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
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
})
export class CheckOutComponent implements OnInit, OnDestroy {
  label: typeof Label = Label;
  error: typeof Error = Error;
  placeOrderButtonText: string = PLACE_ORDER_BUTTON_TEXT;
  shippingForm: FormGroup;
  cart: ShoppingCart;
  userId: string;
  cartSubscription: Subscription;
  userSubscription: Subscription;

  constructor(
    private router: Router,
    private authService: AuthService,
    private orderService: OrderService,
    private formBuilder: FormBuilder,
    private shoppingCartService: ShoppingCartService,
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

  async ngOnInit(): Promise<void> {
    this.shippingForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      addressLine1: ['', Validators.required],
      addressLine2: ['', Validators.required],
      city: ['', Validators.required],
    });
    let cartObservable = await this.shoppingCartService.getCart();
    this.cartSubscription = cartObservable.subscribe(
      (cart) => (this.cart = cart),
    );
    this.userSubscription = this.authService.userObservable.subscribe(
      (user) => (this.userId = user.uid),
    );
  }

  ngOnDestroy(): void {
    this.cartSubscription.unsubscribe();
    this.userSubscription.unsubscribe();
  }

  async placeOrder(): Promise<void> {
    let order = new Order(this.userId, this.shippingForm.value, this.cart);
    let result = await this.orderService.placeOrder(order);
    this.router.navigate(['/order-success', result.key]);
  }
}
