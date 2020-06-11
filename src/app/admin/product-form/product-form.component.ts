import { ProductService } from './../../product.service';
import { CategoryService } from './../../category.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
})
export class ProductFormComponent implements OnInit {
  categories$;
  productForm: FormGroup;

  constructor(
    private router: Router,
    private categoryService: CategoryService,
    private productService: ProductService,
    private formBuilder: FormBuilder,
  ) {
    this.categories$ = categoryService.getCategories().snapshotChanges();
  }

  get formControls() {
    return this.productForm.controls;
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
  }
}
