import { Injectable } from '@angular/core';
import { CanActivate, UrlTree, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';

import { AuthService } from './../services/auth.service';
import { User } from 'src/models/user';

import { Observable } from 'rxjs';
import * as firebase from 'firebase/app';
import 'firebase/auth';


@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  user: User;
  
  constructor(
    private authService: AuthService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {

      this.getLoggedInUser();
  
      if ( this.user ) {
        return this.user.userRoles.admin;
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
