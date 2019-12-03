import { AuthService } from './auth.service';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import * as firebase from 'firebase/app';
import 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  private loggedIn: boolean = false;

  constructor(
    private router: Router,
    private authService: AuthService,
  ) {
    this.authService.getAuthentication().subscribe((value: boolean) => {
      this.loggedIn = value;

      if (this.loggedIn) {
        this.router.navigate(['/']);
      } else {
        this.router.navigate(['login']);
      }
    });
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
