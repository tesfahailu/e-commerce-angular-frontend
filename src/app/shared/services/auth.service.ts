import { UserService } from 'shared/services/user.service';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';
import { Observable, of } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { AppUser } from 'shared/models/app-user';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userObservable: Observable<firebase.User>;

  constructor(
    private userService: UserService,
    private afAuth: AngularFireAuth,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.userObservable = afAuth.authState;
  }

  login(): void {
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    this.afAuth
      .signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then(() => this.router.navigateByUrl(returnUrl));
  }

  logout(): void {
    this.afAuth.signOut();
  }

  get appUserObservable(): Observable<AppUser> {
    return this.userObservable.pipe(
      switchMap((user) => {
        if (user) return this.userService.get(user.uid).valueChanges();
        return of(null);
      }),
    );
  }
}
