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
  id;

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
    if (this.id) this.productService.update(this.id, this.productForm.value);
    else this.productService.create(this.productForm.value);

    this.router.navigate(['/admin/products']);
  }

  delete() {
    if (!confirm('Are you sure you want to delete this product')) return;
    this.productService.delete(this.id);
    this.router.navigate(['/admin/products']);
  }

  ngOnInit() {
    this.productForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      price: ['', [Validators.required, Validators.min(0)]],
      category: ['', Validators.required],
      imageUrl: ['', Validators.required],
    });

    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id)
      this.productService
        .get(this.id)
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
