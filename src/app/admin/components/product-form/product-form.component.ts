import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Category } from 'shared/models/category';
import { Product } from 'shared/models/product';
import { CategoryService } from 'shared/services/category.service';
import { ProductService } from 'shared/services/product.service';

enum Label {
  TITLE = 'Title',
  PRICE = 'Price',
  CATEGORY = 'Category',
  IMAGE_URL = 'Image Url',
}
enum Error {
  TITLE_REQUIRED = 'Title is required.',
  PRICE_REQUIRED = 'Price is required.',
  PRICE_INVALID = 'Price should be 0 or higher.',
  CATEGORY_REQUIRED = 'Category is required.',
  IMAGE_URL_REQUIRED = 'Image URL is required.',
  IMAGE_URL_INVALID = 'Please enter a valid URL.',
}
const URL_PATTERN = 'https://.*';
const SAVE_PRODUCT_BUTTON_TEXT = 'Save';
const DELETE_PRODUCT_BUTTON_TEXT = 'Delete';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss'],
})
export class ProductFormComponent implements OnInit {
  id: string;
  label: typeof Label = Label;
  categoriesObservable: Observable<Category[]>;
  error: typeof Error = Error;
  product: Product = null;
  productForm: FormGroup;
  URL_PATTERN: string = URL_PATTERN;
  saveProductButtonText: string = SAVE_PRODUCT_BUTTON_TEXT;
  deleteProductButtonText: string = DELETE_PRODUCT_BUTTON_TEXT;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private productService: ProductService,
    private formBuilder: FormBuilder,
  ) {
    this.categoriesObservable = this.categoryService.getCategoriesObservable();
  }

  get title(): AbstractControl {
    return this.productForm.get('title');
  }
  get price(): AbstractControl {
    return this.productForm.get('price');
  }
  get category(): AbstractControl {
    return this.productForm.get('category');
  }
  get imageUrl(): AbstractControl {
    return this.productForm.get('imageUrl');
  }

  saveProduct(): void {
    if (this.id)
      this.productService.updateProduct(this.id, this.productForm.value);
    else this.productService.createProduct(this.productForm.value);

    this.router.navigate(['/admin/products']);
  }

  deleteProduct(): void {
    if (!confirm('Are you sure you want to delete this product')) return;
    this.productService.deleteProduct(this.id);
    this.router.navigate(['/admin/products']);
  }

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      price: ['', [Validators.required, Validators.min(0)]],
      category: ['', Validators.required],
      imageUrl: ['', Validators.required],
    });

    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id)
      this.productService.getProductObservable(this.id).subscribe((product) => {
        this.title.setValue(product.title);
        this.price.setValue(product.price);
        this.category.setValue(product.category);
        this.imageUrl.setValue(product.imageUrl);
      });
  }
}
