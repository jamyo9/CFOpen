import { Platform } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from 'src/models/user';

import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // starting app default as unauthorised
  authenticated: BehaviorSubject<boolean> = new BehaviorSubject(false); 
  currentUser: User;

  constructor(
    private platform: Platform) {
  }

  loginUser(email: string, password: string): Promise<firebase.auth.UserCredential> {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  }

  logout() {
    firebase.auth().signOut();
    return Observable.create(observer => {
      this.currentUser = null;
      observer.next(true);
      observer.complete();
    });
  }

  public getAuthentication(): Observable<boolean> {
    return this.authenticated.asObservable();
  }
}
