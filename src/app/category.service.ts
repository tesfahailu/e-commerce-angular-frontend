import { Category } from './models/category';
import { documentToDomainObject } from './util/documentToDomainObject';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private db: AngularFireDatabase) {}

  getCategoriesObservable(): Observable<Category[]> {
    return this.db
      .list('/categories', (ref) => ref.orderByChild('name'))
      .snapshotChanges()
      .pipe(
        map(
          (actions) =>
            actions.map((category) => documentToDomainObject(category)) as [
              Category,
            ],
        ),
      );
  }
}
