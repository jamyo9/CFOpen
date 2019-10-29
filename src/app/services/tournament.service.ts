import { Tournament } from './../../models/tournament';
import { FirebaseService } from './firebase.service';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class TournamentService {

  constructor(
    private firebaseService: FirebaseService,
    private firestore: AngularFirestore) {
  }

  getTournaments() {
    return new Promise<any>((resolve, reject) => {
      this.firestore.collection('/tournaments').snapshotChanges()
      .subscribe(snapshots => {
        resolve(snapshots);
      });
    });
  }

  addTournament(tournament: Tournament) {
    this.firestore.collection('/tournaments/').add(tournament);
  }

  removeTournament(id: number) {
    this.firestore.doc('/tournaments/' + id).delete();
  }

  updateTournament(tournament: Tournament) {
    this.firestore.doc('/tournaments/' + tournament.id).update(tournament);
  }
}
