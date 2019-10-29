import { Event } from './../../models/event';
import { FirebaseService } from './firebase.service';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(
    // private firebaseService: FirebaseService,
    private firestore: AngularFirestore) { }

  getEvents(idTournament: string) {
    // TODO añadir idTournament a la query
    return new Promise<any>((resolve, reject) => {
      this.firestore.collection('/events').snapshotChanges()
      .subscribe(ret => {
        resolve(ret);
      });
    });
  }

  getEventDetails(idEvent: string) {
    return new Promise<any>((resolve, reject) => {
      this.firestore.collection('/events').doc(idEvent).snapshotChanges()
      .subscribe(ret => {
        resolve(ret);
      });
    });
  }
}
