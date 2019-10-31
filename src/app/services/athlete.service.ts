import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AthleteService {
  constructor(private firestore: AngularFirestore) {

  }

  getAthleteById(athleteId: any) {
    return new Promise<any>((resolve, reject) => {
      this.firestore.collection('/athletes').doc(athleteId).snapshotChanges()
      .subscribe(ret => {
        resolve(ret);
      });
    });
  }

}
