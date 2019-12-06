import { Athlete } from 'src/models/athlete';
import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AthleteService {

  constructor(private firestore: AngularFirestore) {

  }

  getAthletesByTournament(tournamentId: string): Athlete[] {

    const athletes = [];

    this.firestore.collection('athletes')
      .ref.where('tournamentId', '==', tournamentId)
      .get().then(
        (result => {
          result.forEach(a => {
            const ath = new Athlete(
              a.data().name,
              a.data().lastName,
              a.data().dni,
              a.data().address,
              a.data().email,
              a.data().category);
            ath.id = a.id;
            athletes.push(ath);
          });
        }));
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
