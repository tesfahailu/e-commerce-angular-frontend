import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from 'shared/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(route, state: RouterStateSnapshot): Observable<boolean> {
    return this.auth.userObservable.pipe(
      map((user) => {
        if (user) return true;
        this.router.navigate(['/login'], {
          queryParams: { returnUrl: state.url },
        });
        return false;
      }),
    );
  }
}
