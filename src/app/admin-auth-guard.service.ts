import { UserService } from 'shared/services/user.service';
import { AuthService } from 'shared/services/auth.service';
import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminAuthGuard implements CanActivate {
  constructor(private auth: AuthService, private userService: UserService) {}

  canActivate(): Observable<boolean> {
    return this.auth.appUserObservable.pipe(map((appUser) => appUser.isAdmin));
  }
}
