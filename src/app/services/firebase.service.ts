import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private firestore: AngularFirestore) {

  }

  getItems(api: string) {
    return this.firestore.collection('/' + api + '/');
  }

  addItem(api: string, item: any) {
    this.firestore.collection('/' + api + '/').add(item);
  }

  updateItem(api: string, item: any) {
    this.firestore.doc('/' + api + '/' + item.id).update(item);
  }

  removeItem(api: string, id: number) {
    this.firestore.doc('/' + api + '/' + id).delete();
  }
}
