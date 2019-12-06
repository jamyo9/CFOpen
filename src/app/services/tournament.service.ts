import { EventService } from './event.service';
import { Tournament } from './../../models/tournament';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class TournamentService {

  constructor(
    private firestore: AngularFirestore,
    private eventService: EventService) {
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

  getTournamentDetails(tournamentId: any): Tournament {
    const tournament = new Tournament('', '', '', '');
    new Promise<any>((resolve, reject) => {
      this.firestore.collection('/tournaments').doc(tournamentId).snapshotChanges()
      .subscribe(ret => {
        resolve(ret);
      });
    })
    .then(result => {
      tournament.id = tournamentId;
      tournament.name = result.payload.data().name;
      tournament.startDate = result.payload.data().startDate;
      tournament.endDate = result.payload.data().endDate;
      tournament.description = result.payload.data().description;
    });
    return tournament;
  }

  saveTournament(tournament: Tournament) {
    return new Promise<any>((resolve, reject) => {
      if (tournament.id != null) {
        // save tournament
        return this.firestore.doc<Tournament>('/tournaments/' + tournament.id).update(JSON.parse(JSON.stringify(tournament)));
      } else {
        // add new tournament
        const id = this.firestore.createId();
        tournament.id = id;
        return this.firestore.doc<Tournament>('/tournaments/' + id).set(JSON.parse(JSON.stringify(tournament)));

        // return this.firestore.collection<Tournament>('/tournaments').add(JSON.parse(JSON.stringify(tournament)));
        // there is an id property generated and it is set to ''
      }
    });
  }
  
  deleteTournament(tournament: Tournament) {
    // Call API to delete score
    this.eventService.deleteEventsByTournament(tournament.id);
    return this.firestore.doc<any>('/tournaments/' + tournament.id).delete();
  }
}
