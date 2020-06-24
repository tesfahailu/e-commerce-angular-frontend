import { Category } from 'shared/models/category';
import { Observable } from 'rxjs';
import { CategoryService } from 'shared/services/category.service';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.scss'],
})
export class ProductFilterComponent {
  categoriesObservable: Observable<Category[]>;
  @Input('paramCategory') paramCategory;

  constructor(categoryService: CategoryService) {
    this.categoriesObservable = categoryService.getCategoriesObservable();
  }
}
