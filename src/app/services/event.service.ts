import { Score } from './../../models/score';
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

  getClassificationEvent(category: string, idEvent: string) {
    return new Promise<any>((resolve, reject) => {
      // TODO añadir idEvent y category a la query
      // this.firestore.collection('/scores').doc(idEvent).snapshotChanges()
      this.firestore.collection('/scores').snapshotChanges()
      .subscribe(ret => {
        resolve(ret);
      });
    });
  }

  getScore(idScore: any) {
    return new Promise<any>((resolve, reject) => {
      this.firestore.collection('/scores').doc(idScore).snapshotChanges()
      .subscribe(ret => {
        resolve(ret);
      });
    });
  }

  deleteScore(score: Score) {
    console.log('DELETE SCORE');
    return new Promise<any>((resolve, reject) => {});
    // TODO uncomment next lines to call API to delete score
    // return this.firestore.doc<any>('/scores/' + score.id).delete();
  }

  saveScore(score: Score) {
    console.log('SAVE SCORE');
    // TODO uncomment next lines to call API to save score
    return new Promise<any>((resolve, reject) => {});
    /*
    if (score.id != null) {
      // save score
      return this.firestore.doc<any>('/scores/' + score.id).update(score);
    } else {
      // add new score
      return this.firestore.collection<any>('/scores').add(score);
    }
    */
  }

}
