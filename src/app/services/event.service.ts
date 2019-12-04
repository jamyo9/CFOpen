import { Event } from './../../models/event';
import { Judge } from './../../models/judge';
import { Athlete } from 'src/models/athlete';
import { JudgeService } from './judge.service';
import { AthleteService } from './athlete.service';
import { Score } from './../../models/score';
import { FirebaseService } from './firebase.service';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  constructor(
    private athleteService: AthleteService,
    private judgeService: JudgeService,
    // private firebaseService: FirebaseService,
    public afDatabase: AngularFireDatabase,
    private firestore: AngularFirestore) { }

  getEvents(idTournament: string) {
    const events = [];
    new Promise<any>((resolve, reject) => {
      this.firestore.collection('/events', ref => ref.where('idTournament','==', idTournament))
      .snapshotChanges().subscribe(ret => {
        resolve(ret);
      });
    }).then((result => {
      result.forEach(e => {
        const event = new Event(
          idTournament,
          e.payload.doc.data().code,
          e.payload.doc.data().name,
          e.payload.doc.data().startDate,
          e.payload.doc.data().endDate,
          e.payload.doc.data().description);
        event.id = e.payload.doc.id;
        events.push(event);
      });
    }));
    return events
  }

  deleteEvent(event: Event) {
     // Call API to delete event
     return this.firestore.doc<any>('/events/' + event.id).delete();
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
  
  getEventDetails(idEvent: string): Event {
    const event = new Event('', '', '', '', '', '');
    new Promise<any>((resolve, reject) => {
      this.firestore.collection('/events').doc(idEvent).snapshotChanges()
      .subscribe(ret => {
        resolve(ret);
      });
    })
    .then(result => {
      event.id = idEvent;
      event.idTournament = result.payload.data().idTournament;
      event.code =  result.payload.data().code;
      event.name = result.payload.data().name;
      event.description = result.payload.data().description;
      event.startDate = result.payload.data().startDate;
      event.endDate = result.payload.data().endDate;
    });
    return event;
  }

  getClassificationEvent(category: string, idEvent: string): Score[] {
        
    const classificationRet = [];

    new Promise<any>((resolve, reject) => {
      this.firestore.collection('/scores', ref => ref.where('eventId','==', idEvent)
      .where('category','==', category))
      .snapshotChanges().subscribe(ret => {
        resolve(ret);
      });
    }).then((result => {
      result.forEach(score => {
        const athlete = new Athlete(
          score.payload.doc.data().athlete.name,
          score.payload.doc.data().athlete.lastName,
          score.payload.doc.data().athlete.dni,
          score.payload.doc.data().athlete.address,
          score.payload.doc.data().athlete.email,
          score.payload.doc.data().athlete.category
        );
        athlete.id = score.payload.doc.data().athlete.id;
        const s = new Score(
          idEvent, athlete, null,
          score.payload.doc.data().category,
          score.payload.doc.data().date,
          score.payload.doc.data().imgUrl,
          score.payload.doc.data().scaled,
          score.payload.doc.data().location,
          score.payload.doc.data().timeScored,
          score.payload.doc.data().score);
        s.category = category;
        s.id = score.payload.doc.id;
        classificationRet.push(s);
      });
    }));
    
    return classificationRet;
  }

  getScore(idScore: any): Score {
    const score = new Score('', null, null, '', '', '', false, '', '', 0);
    new Promise<any>((resolve, reject) => {
      this.firestore.collection('/scores').doc(idScore).snapshotChanges()
      .subscribe(ret => {
        resolve(ret);
      });
    }).then(result => {
      // obtain the details of the athlete asigned to the score
      const athlete = new Athlete(
        result.payload.data().athlete.name,
        result.payload.data().athlete.lastName,
        result.payload.data().athlete.dni,
        result.payload.data().athlete.address,
        result.payload.data().athlete.email,
        result.payload.data().athlete.category
      );
      athlete.id = result.payload.data().athlete.id;

      // obtain the details of the judge asigned to the score
      const judge = new Judge(
        result.payload.data().name,
        result.payload.data().lastName,
        result.payload.data().dni,
        result.payload.data().address,
        result.payload.data().email,
        result.payload.data().certified);
      judge.id = result.payload.data().judge.id;

      score.eventId = result.payload.data().eventId;
      score.date = result.payload.data().date;
      score.imgUrl = result.payload.data().imgUrl;
      score.scaled = result.payload.data().scaled;
      score.location = result.payload.data().location;
      score.timeScored = result.payload.data().timeScored;
      score.score = result.payload.data().score;
      score.category = result.payload.data().category;
      score.id = idScore;
      score.position = result.payload.data().position;

      score.athlete = athlete;
      score.judge = judge;
    });
    return score;
  }

  deleteScore(score: Score) {
    // Call API to delete score
    return this.firestore.doc<any>('/scores/' + score.id).delete();
  }

  saveScore(score: Score) {
    return new Promise<any>((resolve, reject) => {
      if (score.id != null) {
        // save score
        return this.firestore.doc<Score>('/scores/' + score.id).update(JSON.parse(JSON.stringify(score)));
      } else {
        // add new score
        return this.firestore.collection<Score>('/scores').add(JSON.parse(JSON.stringify(score)));
        // TODO there is an id property generated and it is set to ''
      }
    });
  }
}
