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

  getJudgesByEvent(eventId: any): Judge[] {

    const judges = [];

    // TODO añadir idEvent a la query
    const promise = new Promise<any>((resolve, reject) => {
      this.firestore.collection('/judges').snapshotChanges()
      .subscribe(ret => {
        resolve(ret);
      });
    }).then(result => {
      result.forEach(j => {
        const jud = new Judge(
          j.payload.doc.data().name,
          j.payload.doc.data().lastName,
          j.payload.doc.data().dni,
          j.payload.doc.data().address,
          j.payload.doc.data().email,
          j.payload.doc.data().certified);
        jud.id = j.payload.doc.id;
        judges.push(jud);
      });
    });
    return judges;
  }
}
