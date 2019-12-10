import { AthleteService } from './athlete.service';
import { User } from './../../models/user';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private firestore: AngularFirestore,
    private athleteService: AthleteService
  ) {}
  
  getUserById(userId: string): User {
    const u = new User('', '');
    new Promise<any>((resolve, reject) => {
      this.firestore.collection('users').doc(userId).snapshotChanges()
      .subscribe(ret => {
        resolve(ret);
      });
    }).then(user => {
      u.name = user.payload.data().name;
      u.id = userId;
      u.lastName = user.payload.data().lastName;
      u.dni = user.payload.data().dni;
      u.address = user.payload.data().address;
      u.email = user.payload.data().email;
      u.category = user.payload.data().category;
      u.boxId = user.payload.data().boxId;
      u.userRoles = user.payload.data().userRoles;
    });
    return u;
  }
  
  saveUser(user: User) {
    return new Promise<User>((resolve, reject) => {
      if (user.id != null) {
        // save tournament
        this.firestore.doc<User>('/users/' + user.id).update(JSON.parse(JSON.stringify(user)));
        return user.id;
      } else {
        // add new tournament
        const id = this.firestore.createId();
        user.id = id;
        this.firestore.doc<User>('/users/' + id).set(JSON.parse(JSON.stringify(user)));
        return id;
      }
    });
  }

  async deleteAthlete(athleteId: string) {
    return await this.firestore.doc<any>('/athletes/' + athleteId).delete();
  }

  getUsersByBoxId(boxId: string): User[] {
    const users = [];
    this.firestore.collection('users')
      .ref.where('boxId', '==', boxId)
      .get().then(
        (result => {
          result.forEach(u => {
            if (!this.athleteService.exists(u.id)) {
              const user = new User(
                u.data().name,
                u.data().email);
              user.id = u.id;
              user.lastName = u.data().lastName;
              user.category = u.data().category;
              user.dni = u.data().dni;
              user.address = u.data().address;
              user.userRoles = u.data().userRoles;
              user.boxId = u.data().boxId;
              users.push(user);
            }
          });
        }));
    return users;
  }
  
  async deleteUser(userId: string) {
    return await this.firestore.doc<any>('/users/' + userId).delete();
  }
}
