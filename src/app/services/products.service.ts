import { Injectable } from '@angular/core';
import { collection, CollectionReference, doc, Firestore, getDoc, limit, onSnapshot, query, where } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  productCollection: CollectionReference;

  constructor(private firestore: Firestore) {
    this.productCollection = collection(this.firestore, 'products');
  }

  loadProduct(): Observable<any[]> {
    return new Observable(observer => {
      return onSnapshot(this.productCollection,
        (snapshot) => {
          const products = snapshot.docs.map(doc => ({
            id: doc.id,
            data: doc.data()
          }));
          observer.next(products);
        },
        (error) => observer.error(error.message)
      );
    });
  }

  loadFeaturedProducts(): Observable<any[]> {
    return new Observable(observer => {
      const featuredQuery = query(this.productCollection, where('isFeatured', '==', true), limit(4));
      return onSnapshot(featuredQuery,
        (snapshot) => {
          const products = snapshot.docs.map(doc => ({
            id: doc.id,
            data: doc.data()
          }));
          observer.next(products);
        },
        (error) => observer.error(error.message)
      );
    });
  }

  loadBestSellerProducts(): Observable<any[]> {
    return new Observable(observer => {
      const bestSellerQuery = query(this.productCollection, where('isBestSeller', '==', true), limit(6));
      return onSnapshot(bestSellerQuery,
        (snapshot) => {
          const products = snapshot.docs.map(doc => ({
            id: doc.id,
            data: doc.data()
          }));
          observer.next(products);
        },
        (error) => observer.error(error.message)
      );
    });
  }

  loadCategoryProducts(categoryId: any): Observable<any[]> {
    return new Observable(observer => {
      const categoryQuery = query(this.productCollection, where('category.categoryId', '==', categoryId));
      return onSnapshot(categoryQuery,
        (snapshot) => {
          const products = snapshot.docs.map(doc => ({
            id: doc.id,
            data: doc.data()
          }));
          observer.next(products);
        },
        (error) => observer.error(error.message)
      );
    });
  }

  loadOneProduct(productId: string): Observable<any> {
    return new Observable(observer => {
      const productDocRef = doc(this.productCollection, productId);
      getDoc(productDocRef).then(docSnapshot => {
        if (docSnapshot.exists()) {
          observer.next({ id: docSnapshot.id, data: docSnapshot.data() });
          observer.complete();
        } else {
          observer.error('No such Product found!');
        }
      }).catch(error => {
        observer.error(error.message);
      });
    });
  }

  loadSimilarProducts(categoryId: any): Observable<any[]> {
    return new Observable(observer => {
      const categoryQuery = query(this.productCollection, where('category.categoryId', '==', categoryId), limit(4));
      return onSnapshot(categoryQuery,
        (snapshot) => {
          const products = snapshot.docs.map(doc => ({
            id: doc.id,
            data: doc.data()
          }));
          observer.next(products);
        },
        (error) => observer.error(error.message)
      );
    });
  }
}
