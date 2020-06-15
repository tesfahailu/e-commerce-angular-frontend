import { documentToDomainObject } from './util/documentToDomainObject';
import { Product } from './models/product';
import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private db: AngularFireDatabase) {}

  createProduct(product: Product): void {
    this.db.list('/products').push(product);
  }

  getProductsObservable(): Observable<[Product]> {
    return this.db
      .list('/products')
      .snapshotChanges()
      .pipe(
        map(
          (actions) =>
            actions.map((product) => documentToDomainObject(product)) as [
              Product,
            ],
        ),
      );
  }

  getProductObservable(id: string): Observable<Product> {
    return this.db
      .object('/products/' + id)
      .snapshotChanges()
      .pipe(
        take(1),
        map((product) => documentToDomainObject(product) as Product),
      );
  }

  updateProduct(id: string, product: Product): void {
    this.db.object('/products/' + id).update(product);
  }

  deleteProduct(id: string): void {
    this.db.object('/products/' + id).remove();
  }
}
