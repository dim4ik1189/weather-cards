import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CardsService {

  constructor(public afs: AngularFirestore) { }

  public createCard(cardData): Promise<any>  {
    return this.afs.collection(`cards`).add(cardData)
      .then(
      res => res,
      err => window.alert('Failed to get cards. Check firebase connection ' + err)
    );
  }

  public getAllLocations(): any {
    return this.afs.collection(`cards`)
      .snapshotChanges()
      .pipe(
        map(cards => cards.map(c => {
          const data: any = c.payload.doc.data();
          const id = c.payload.doc.id;

          return {
            id,
            ...data
          };
        }))
      );
  }
}
