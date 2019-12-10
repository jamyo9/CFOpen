import { AuthService } from './auth.service';
import { User } from 'src/models/user';
import { Athlete } from 'src/models/athlete';
import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { Event } from 'src/models/event';

@Injectable({
  providedIn: 'root'
})
export class AthleteService {
  
  constructor(
    private firestore: AngularFirestore,
    private authService: AuthService
    ) {

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
      a.name = athlete.payload.data().name;
      a.id = athleteId;
      a.lastName = athlete.payload.data().lastName;
      a.dni = athlete.payload.data().dni;
      a.address = athlete.payload.data().address;
      a.email = athlete.payload.data().email;
      a.category = athlete.payload.data().category;
    });
    return a;
  }

  generateNewAthlete(userId: any): Athlete {
    let athlete: Athlete = new Athlete('', '', '', '', '', '');  
    new Promise<any>((resolve, reject) => {
      this.firestore.collection('/users').doc(userId).snapshotChanges()
      .subscribe(ret => {
        resolve(ret);
      });
    })
    .then(result => {
      athlete.name = result.payload.data().name;
      athlete.email = result.payload.data().email;
      athlete.userId = result.payload.data().id;
    });
    return athlete;
  }

  createAthlete(user: User, tournamentId: string) {
    let athlete: Athlete = new Athlete(
      user.name,
      user.lastName,
      user.dni,
      user.address,
      user.email,
      user.category
    );
    athlete.userId = user.id;
    athlete.tournamentId = tournamentId;
    return this.saveAthlete(athlete);
  }

  saveAthlete(athlete: Athlete) {
    return new Promise<any>((resolve, reject) => {
      if (athlete.id != null) {
        // save tournament
        this.firestore.doc<Athlete>('/athletes/' + athlete.id).update(JSON.parse(JSON.stringify(athlete)));
        return athlete.id;
      } else {
        // add new tournament
        const id = this.firestore.createId();
        athlete.id = id;
        this.firestore.doc<Athlete>('/athletes/' + id).set(JSON.parse(JSON.stringify(athlete)));
        return id;
      }
    });
  }

  async deleteAthlete(athleteId: string) {
    return await this.firestore.doc<any>('/athletes/' + athleteId).delete();
  }

  async deleteAthletesByTournament(tournamentId: string) {

    this.firestore.collection('athletes')
      .ref.where('tournamentId', '==', tournamentId)
      .get().then(
        (result => {
          result.forEach(doc => {
            doc.ref.delete();
          });
      }));
  }

  exists(id: string): boolean {
    let ret: boolean =  false;
    this.firestore.collection('athletes')
      .ref.where('id', '==', id)
      .get().then(docSnapshot => {
        ret = docSnapshot.empty ? false : true
      });
    return ret
  }
  
}
