import {
  FormBuilder,
  Validators,
  FormGroup,
  AbstractControl,
} from '@angular/forms';
import { Component, OnInit } from '@angular/core';

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
export class CheckOutComponent implements OnInit {
  label: typeof Label = Label;
  error: typeof Error = Error;
  placeOrderButtonText: string = PLACE_ORDER_BUTTON_TEXT;
  shippingForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

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

  placeOrder() {}

  ngOnInit(): void {
    this.shippingForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      addressLine1: ['', Validators.required],
      addressLine2: ['', Validators.required],
      city: ['', Validators.required],
    });
  }
}
