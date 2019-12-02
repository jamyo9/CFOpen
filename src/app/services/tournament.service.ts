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
    const tournaments = [];
    new Promise<any>((resolve, reject) => {
      this.firestore.collection('/tournaments').snapshotChanges()
      .subscribe(snapshots => {
        resolve(snapshots);
      });
    }).then(result => {
      result.forEach(t => {
        const tournament = new Tournament(
          t.payload.doc.data().name,
          t.payload.doc.data().startDate,
          t.payload.doc.data().endDate,
          t.payload.doc.data().page
        );
        tournament.id = t.payload.doc.id;
        tournaments.push(tournament);
      });
    });
    return tournaments;
  }

  getTournamentDetails(idTournament: any): Tournament {
    const tournament = new Tournament('', '', '', '');
    new Promise<any>((resolve, reject) => {
      this.firestore.collection('/tournaments').doc(idTournament).snapshotChanges()
      .subscribe(ret => {
        resolve(ret);
      });
    })
    .then(result => {
      tournament.id = idTournament;
      tournament.name = result.payload.data().name;
      tournament.page = result.payload.data().page;
      tournament.startDate = result.payload.data().startDate;
      tournament.endDate = result.payload.data().endDate;
    });
    return tournament;
  }

  getTournamentName(idTournament: any): string {
    let tournamentName = '';
    new Promise<any>((resolve, reject) => {
      this.firestore.collection('/tournaments').doc(idTournament).snapshotChanges()
      .subscribe(ret => {
        resolve(ret);
      });
    })
    .then(result => {
      tournamentName = result.payload.data().name;
    });

    return tournamentName;
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
