import { Category } from './../../models/category';
import { Observable } from 'rxjs';
import { CategoryService } from './../../category.service';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'product-filter',
  templateUrl: './product-filter.component.html',
})
export class ProductFilterComponent {
  categoriesObservable: Observable<Category[]>;
  @Input('paramCategory') paramCategory;

  constructor(categoryService: CategoryService) {
    this.categoriesObservable = categoryService.getCategoriesObservable();
  }
}
