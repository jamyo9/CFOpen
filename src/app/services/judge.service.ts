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
    return new Promise<any>((resolve, reject) => {
      this.firestore.collection('/judges').doc(judgeId).snapshotChanges()
      .subscribe(ret => {
        resolve(ret);
      });
    });
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
}
