import { ScoreService } from './score.service';
import { Event } from './../../models/event';
import { Score } from './../../models/score';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection, QuerySnapshot } from '@angular/fire/firestore';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(
    public afDatabase: AngularFireDatabase,
    private firestore: AngularFirestore,
    private scoreService: ScoreService) { }

  getEvents(tournamentId: string) {
    const events = [];

    this.firestore.collection('events')
      .ref.where('tournamentId', '==', tournamentId)
      .get().then(
        (result => {
          result.forEach(e => {
            const event = new Event(
              tournamentId,
              e.data().code,
              e.data().name,
              e.data().startDate,
              e.data().endDate,
              e.data().description);
            event.id = e.id;
            events.push(event);
          });
        }));
    return events;
  }

  deleteEvent(event: Event) {
    // Delete scores asociated to the event
    this.scoreService.deleteScoresByEvent(event.id);
     // Call API to delete event
     return this.firestore.doc<any>('/events/' + event.id).delete();
  }

  async deleteEventsByTournament(tournamentId: string) {

    await this.firestore
      .collection('events')
      .ref.where('tournamentId', '==', tournamentId).get().then(
        result => {
          result.forEach(doc => {
            // Delete scores asociated to the event
            this.scoreService.deleteScoresByEvent(doc.ref.id);
            // delete the event
            doc.ref.delete();
          });
        });
  }

  saveEvent(event: Event) {
    return new Promise<any>((resolve, reject) => {
      if (event.id != null) {
        // save event
        return this.firestore.doc<Score>('/events/' + event.id).update(JSON.parse(JSON.stringify(event)));
      } else {
        // add new event
        return this.firestore.collection<Score>('/events').add(JSON.parse(JSON.stringify(event)));
        // TODO there is an id property generated and it is set to ''
      }
    });
  }

  getEventDetails(eventId: string): Event {
    const event = new Event('', '', '', '', '', '');
    new Promise<any>((resolve, reject) => {
      this.firestore.collection('/events').doc(eventId).snapshotChanges()
      .subscribe(ret => {
        resolve(ret);
      });
    })
    .then(result => {
      event.id = eventId;
      event.tournamentId = result.payload.data().tournamentId;
      event.code =  result.payload.data().code;
      event.name = result.payload.data().name;
      event.description = result.payload.data().description;
      event.startDate = result.payload.data().startDate;
      event.endDate = result.payload.data().endDate;
    });
    return event;
  }

  
}
