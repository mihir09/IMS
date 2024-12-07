import { Injectable } from '@angular/core';
import { collection, CollectionReference, Firestore, onSnapshot } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  categoryCollection: CollectionReference;

  constructor(private firestore: Firestore) {
    this.categoryCollection = collection(this.firestore, 'categories');
  }

  loadCategory(): Observable<any[]> {
    return new Observable(observer => {
      return onSnapshot(this.categoryCollection,
        (snapshot) => {
          const categories = snapshot.docs.map(doc => ({
            id: doc.id,
            data: doc.data()
          }));
          observer.next(categories);
        },
        (error) => observer.error(error.message)
      );
    });
  }
}
