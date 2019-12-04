import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { User } from 'src/models/user';

import * as firebase from 'firebase/app';
import 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  private loggedIn: boolean = false;

  constructor(
    private router: Router,
    private fAuth: AngularFireAuth,
    private db: AngularFireDatabase
  ) {
    this.fAuth.authState.pipe(switchMap(auth => {
      if (auth) {
        // signed in
          this.loggedIn = true;
        return this.db.object<User>('/users/${user.uid}').valueChanges();
      } else {
        /// not signed in
        this.loggedIn = false;
        return Observable.create(null);
      }
    }));

    if (this.loggedIn) {
      this.router.navigate(['/']);
    } else {
      this.router.navigate(['login']);
    }
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    return new Promise((resolve, reject) => {
      firebase.auth().onAuthStateChanged((user: firebase.User) => {
        if (user) {
          resolve(true);
        } else {
          this.router.navigate(['login']);
          resolve(false);
        }
      });
    });
  }

  public getGuardAuthentication(): boolean {
    return this.loggedIn;
  }
}
