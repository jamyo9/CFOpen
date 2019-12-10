import { User } from 'src/models/user';
import { Judge } from './../../models/judge';
import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JudgeService {
  
  constructor(private firestore: AngularFirestore) {

  }

  getJudgeById(judgeId: string) {
    const a = new Judge('', '', '', '', '', false);
    new Promise<any>((resolve, reject) => {
      this.firestore.collection('judges').doc(judgeId).snapshotChanges()
      .subscribe(ret => {
        resolve(ret);
      });
    }).then(athlete => {
      a.name = athlete.payload.data().name;
      a.id = judgeId;
      a.lastName = athlete.payload.data().lastName;
      a.dni = athlete.payload.data().dni;
      a.address = athlete.payload.data().address;
      a.email = athlete.payload.data().email;
      a.certified = athlete.payload.data().certified;
    });
    return a;
  }

  getJudgesByTournament(tournamentId: any) {

    const judges = [];

    this.firestore.collection('judges')
      .ref.where('tournamentId', '==', tournamentId)
      .get().then(
        (result => {
          result.forEach(j => {
            const jud = new Judge(
              j.data().name,
              j.data().lastName,
              j.data().dni,
              j.data().address,
              j.data().email,
              j.data().certified);
            jud.id = j.id;
            judges.push(jud);
          });
        }));
    return judges;
  }

  generateNewJudge(userId: any): Judge {
    let judge: Judge = new Judge('', '', '', '', '', false);  
    new Promise<any>((resolve, reject) => {
      this.firestore.collection('/users').doc(userId).snapshotChanges()
      .subscribe(ret => {
        resolve(ret);
      });
    })
    .then(result => {
      judge.name = result.payload.data().name;
      judge.email = result.payload.data().email;
      judge.userId = result.payload.data().id;
    });
    return judge;
  }

  saveJudge(judge: Judge) {
    return new Promise<any>((resolve, reject) => {
      if (judge.id != null) {
        // save tournament
        this.firestore.doc<Judge>('/judges/' + judge.id).update(JSON.parse(JSON.stringify(judge)));
        return judge.id;
      } else {
        // add new tournament
        const id = this.firestore.createId();
        judge.id = id;
        this.firestore.doc<Judge>('/judges/' + id).set(JSON.parse(JSON.stringify(judge)));
        return id;
      }
    });
  }

  async deleteJudge(judgeId: string) {
    return await this.firestore.doc<any>('/judges/' + judgeId).delete();
  }

  async deleteJudgesByTournament(tournamentId: string) {
    this.firestore.collection('judges')
      .ref.where('tournamentId', '==', tournamentId)
      .get().then(
        (result => {
          result.forEach(doc => {
            doc.ref.delete();
          });
      }));
  }
}
