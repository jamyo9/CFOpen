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
      tournament.startDate = result.payload.data().startDate;
      tournament.endDate = result.payload.data().endDate;
      tournament.description = result.payload.data().description;
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

  saveTournament(tournament: Tournament) {
    return new Promise<any>((resolve, reject) => {
      if (tournament.id != null) {
        // save score
        return this.firestore.doc<Tournament>('/tournaments/' + tournament.id).update(JSON.parse(JSON.stringify(tournament)));
      } else {
        // add new score
        return this.firestore.collection<Tournament>('/tournaments').add(JSON.parse(JSON.stringify(tournament)));
        // TODO there is an id property generated and it is set to ''
      }
    });
  }
  deleteTournament(tournament: Tournament) {
    // Call API to delete score
    return this.firestore.doc<any>('/tournaments/' + tournament.id).delete();
  }
}
