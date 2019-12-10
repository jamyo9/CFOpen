import { Box } from './../../models/box';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from 'src/models/user';

import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // starting app default as unauthorised
  // user: User = new User('','');
  // userID = this.fAuth.auth.currentUser.uid;

  user: BehaviorSubject<User> = new BehaviorSubject(null);

  constructor(
    private fAuth: AngularFireAuth,
    private db: AngularFireDatabase,
    private firestore: AngularFirestore) {
      this.fAuth.authState.pipe(switchMap(auth => {
        if (auth) {
          // signed in
          return this.db.object<User>('/users/' + auth.uid).valueChanges();
        } else {
          /// not signed in
          return of(null)
        }
      })).subscribe(user => {
        this.user.next(user)
      });
  }

  async registerUser(user: User, password: string, box: Box) {
    const boxId: string = this.getBoxIdByNameAndCode(box);
    if (boxId){
      this.fAuth.auth
        .createUserWithEmailAndPassword(user.email, password)
        .then(async userTmp => {
          user.id = userTmp.user.uid;
          user.boxId = boxId;
          await firebase.firestore().doc('/users/' + userTmp.user.uid).set(JSON.parse(JSON.stringify(user)));
          return user;
        })
        .catch(err => {
          console.log('Something went wrong:',err.message);
          return null;
        });
    } else {
      return null;
    }
  }

  async loginUser(email: string, password: string): Promise<User> {
    var userCredential:firebase.auth.UserCredential = await firebase.auth().signInWithEmailAndPassword(email, password);
    var user:User = this.getUser(userCredential.user.uid);
    this.user = new BehaviorSubject(user);
    return user;
  }

  googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider()
    return this.fAuth.auth.signInWithPopup(provider)
      .then(credential =>  {
          this.updateUser(this.getUser(credential.user.uid), credential.user.uid);
      })
  }

  logout() {
    return firebase.auth().signOut().then(result => {
      this.user = new BehaviorSubject(null);
    });
  }
  
  saveUser(user: User) {
    return new Promise<any>((resolve, reject) => {
      if (user.id != null) {
        // save user
        this.firestore.doc<User>('/users/' + user.id).update(JSON.parse(JSON.stringify(user)));
        return user.id;
      } else {
        // add new user
        const id = this.firestore.createId();
        user.id = id;
        this.firestore.doc<User>('/users/' + id).set(JSON.parse(JSON.stringify(user)));
        return id;
      }
    });
  }

  //// Update user data ////
  // updates database with user info after login
  // only runs if user role is not already defined in database
  private updateUser(user: User, id: string) {
    const ref = this.db.object('users/' + id);
    ref.valueChanges()
        .subscribe(user => {
        if (!user) {
          ref.update(user)
        }
    });
  }

  getUser(userId: string): User {
    const user = new User('', '');
    new Promise<any>((resolve, reject) => {
      this.firestore.collection('/users').doc(userId).snapshotChanges()
      .subscribe(ret => {
        resolve(ret);
      });
    })
    .then(result => {
      user.userRoles = result.payload.data().userRoles;
      user.email =  result.payload.data().email;
      user.name = result.payload.data().name;
      user.boxId = result.payload.data().boxId;
    });
    return user;
  }

  getBoxId(): string {
    return this.user.getValue().boxId;
  }

  isAdmin(): boolean {
    return this.user.getValue().userRoles.admin;
  }

  isJudge(): boolean {
    return this.user.getValue().userRoles.judge;
  }

  registerBox(box: Box) {
    // add new score
    const id = this.firestore.createId();
    box.id = id;
    return this.firestore.doc<Box>('/boxes/' + id).set(JSON.parse(JSON.stringify(box)));
  }

  getBoxIdByNameAndCode(box: Box): string {
    let boxId: string = '';
    this.firestore.collection('scores')
      .ref.where('name', '==', box.name).where('registerCode', '==', box.registerCode)
      .get().then(
        (result => {
          result.forEach(b => {
            box.id = b.id;
          });
      }));
    return box.id;
  }
}
