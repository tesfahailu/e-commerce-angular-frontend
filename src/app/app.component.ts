import { UserService } from './user.service';
import { AuthService } from './auth.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  constructor(
    private userService: UserService,
    private auth: AuthService,
    router: Router,
  ) {
    auth.user$.subscribe((user) => {
      if (user) {
        userService.save(user);
      }
    });
  }
}
