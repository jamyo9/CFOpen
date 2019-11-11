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
}
