import { User } from 'src/models/user';
import { Injectable } from '@angular/core';
import { CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';

import { AuthService } from './../services/auth.service';

import { Observable } from 'rxjs';

import * as firebase from 'firebase/app';
import 'firebase/auth';


@Injectable({
  providedIn: 'root'
})
export class JudgeGuard implements CanActivate {

  user: User;

  constructor(
    private authService: AuthService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {

    this.getLoggedInUser();

    if ( this.user ) {
      return this.user.userRoles.judge;
    }
    return false;
  }

  async getLoggedInUser() {
    await firebase.auth().onAuthStateChanged((fierbasUser: firebase.User) => {
      if (fierbasUser) {
        this.user = this.authService.getUser(fierbasUser.uid);
      }
    });
  }
}
