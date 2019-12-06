import { Judge } from './../../models/judge';
import { Athlete } from './../../models/athlete';
import { Score } from './../../models/score';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireDatabase } from '@angular/fire/database';

import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class ScoreService {

  constructor(
    public afDatabase: AngularFireDatabase,
    private firestore: AngularFirestore) { }

  getClassificationEvent(category: string, eventId: string) {

    let classificationRet = [];

    this.firestore.collection('scores')
      .ref.where('eventId', '==', eventId).where('category', '==', category)
      .get().then(
        (result => {
          result.forEach(score => {
            let s = new Score('', null, null, '', '', '', false, '', '', 0);
            let athlete = new Athlete('', '', '', '', '', '');

            if (score.data().athlete) {
              athlete.id = score.data().athlete.id;
              athlete.name = score.data().athlete.name;
              athlete.lastName = score.data().athlete.lastName;
              athlete.dni = score.data().athlete.dni;
              athlete.address = score.data().athlete.address;
              athlete.email = score.data().athlete.email;
              athlete.category = score.data().athlete.category;
            }
            s.athlete = athlete;
            s.eventId = eventId;
            s.date = score.data().date;
            s.imgUrl = score.data().imgUrl;
            s.scaled = score.data().scaled;
            s.location = score.data().location;
            s.timeScored = score.data().timeScored;
            s.score = score.data().score;
            s.category = category;
            s.id = score.id;

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
      let athlete = new Athlete('', '', '', '', '', '');
      if (result.payload.data().athlete) {
        athlete.id = result.payload.data().athlete.id;
        athlete.name = result.payload.data().athlete.name;
        athlete.lastName = result.payload.data().athlete.lastName;
        athlete.dni = result.payload.data().athlete.dni;
        athlete.address = result.payload.data().athlete.address;
        athlete.email = result.payload.data().athlete.email;
        athlete.category = result.payload.data().athlete.category;
      }

      // obtain the details of the judge asigned to the score
      let judge = new Judge('', '', '', '', '', true);
      if (result.payload.data().judge) {
        judge.id = result.payload.data().judge.id;
        judge.name = result.payload.data().name;
        judge.lastName = result.payload.data().lastName;
        judge.dni = result.payload.data().dni;
        judge.address = result.payload.data().address;
        judge.email = result.payload.data().email;
        judge.certified = result.payload.data().certified;
      }        

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

  async deleteScore(score: Score) {
    // Call API to delete score
    return await this.firestore.doc<any>('/scores/' + score.id).delete();
  }

  async deleteScoresByEvent(eventId: string) {

    this.firestore.collection('scores')
      .ref.where('eventId', '==', eventId)
      .get().then(
        (result => {
          result.forEach(doc => {
            doc.ref.delete();
          });
      }));
  }

  saveScore(score: Score) {
    return new Promise<any>((resolve, reject) => {
      if (score.id != null) {
        // save score
        return this.firestore.doc<Score>('/scores/' + score.id).update(JSON.parse(JSON.stringify(score)));
      } else {
        // add new score
        const id = this.firestore.createId();
        score.id = id;
        return this.firestore.doc<Score>('/scores/' + id).set(JSON.parse(JSON.stringify(score)));
      }
    });
  }
}
