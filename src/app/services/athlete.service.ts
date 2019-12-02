import { Athlete } from 'src/models/athlete';
import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AthleteService {

  constructor(private firestore: AngularFirestore) {

  }

  getAthletesByEvent(idEvent: string): Athlete[] {

    const athletes = [];

    // TODO añadir idEvent a la query
    new Promise<any>((resolve, reject) => {
      this.firestore.collection('/athletes').snapshotChanges()
      .subscribe(ret => {
        resolve(ret);
      });
    }).then(result => {
      result.forEach(a => {
        const ath = new Athlete(
          a.payload.doc.data().name,
          a.payload.doc.data().lastName,
          a.payload.doc.data().dni,
          a.payload.doc.data().address,
          a.payload.doc.data().email,
          a.payload.doc.data().category);
        ath.id = a.payload.doc.id;
        athletes.push(ath);
      });
    });
    return athletes;
  }

  getAthleteById(athleteId: string) {
    const a = new Athlete('', '', '', '', '', '');
    new Promise<any>((resolve, reject) => {
      this.firestore.collection('/athletes').doc(athleteId).snapshotChanges()
      .subscribe(ret => {
        resolve(ret);
      });
    }).then(athlete => {
      a.id = athleteId;
      a.name = athlete.payload.data().name;
      a.lastName = athlete.payload.data().lastName;
      a.dni = athlete.payload.data().dni;
      a.address = athlete.payload.data().address;
      a.email = athlete.payload.data().email;
      a.category = athlete.payload.data().category;
    });
    return a;
  }

}
