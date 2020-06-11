import { AppProduct } from './app-product';
import { ProductService } from './../../product.service';
import { CategoryService } from './../../category.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
})
export class ProductFormComponent implements OnInit {
  categories$;
  productForm: FormGroup;
  product = {};

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private productService: ProductService,
    private formBuilder: FormBuilder,
  ) {
    this.categories$ = this.categoryService.getCategories().snapshotChanges();
  }

  get title() {
    return this.productForm.get('title');
  }
  get price() {
    return this.productForm.get('price');
  }
  get category() {
    return this.productForm.get('category');
  }
  get imageUrl() {
    return this.productForm.get('imageUrl');
  }

  save() {
    this.productService.create(this.productForm.value);
    this.router.navigate(['/admin/products']);
  }

  ngOnInit() {
    this.productForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      price: ['', [Validators.required, Validators.min(0)]],
      category: ['', Validators.required],
      imageUrl: ['', Validators.required],
    });

    let id = this.route.snapshot.paramMap.get('id');
    if (id)
      this.productService
        .get(id)
        .pipe(take(1))
        .subscribe((p) => {
          const product: AppProduct = p.payload.val();
          this.title.setValue(product.title);
          this.price.setValue(product.price);
          this.category.setValue(product.category);
          this.imageUrl.setValue(product.imageUrl);
        });
  }
}
