import { Observable } from 'rxjs';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { AuthService } from 'shared/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { AppUser } from 'shared/models/app-user';
import { ShoppingCart } from 'shared/models/shopping-cart';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.scss'],
})
export class BsNavbarComponent implements OnInit {
  appUser: AppUser;
  cartObservable: Observable<ShoppingCart>;

  constructor(
    private auth: AuthService,
    private shoppingCartService: ShoppingCartService,
  ) {}

  async ngOnInit() {
    this.auth.appUserObservable.subscribe(
      (appUser) => (this.appUser = appUser),
    );

    this.cartObservable = await this.shoppingCartService.getCart();
  }

  logout() {
    this.auth.logout();
  }
}