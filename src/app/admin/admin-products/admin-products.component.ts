import { TableHeader } from '../../table-Header';
import { Product } from 'shared/models/product';
import { ProductService } from 'shared/services/product.service';
import { Component, OnDestroy, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

const ADD_PRODUCT_BUTTON_TEXT = 'New Product';
const TABLE_HEADERS = [
  { id: 'title', name: 'Title' },
  { id: 'price', name: 'Price' },
  { id: 'action', name: '' },
];
const EDIT_PRODUCT_TEXT = 'Edit';
const PAGE_SIZE_OPTION = [10, 50, 100];

@Component({
  selector: 'app-admin-products',
  styleUrls: ['./admin-products.component.scss'],
  templateUrl: './admin-products.component.html',
})
export class AdminProductsComponent implements OnDestroy {
  addProductButtonText: string = ADD_PRODUCT_BUTTON_TEXT;
  tableHeaders: TableHeader[] = TABLE_HEADERS;
  tableHeadersId: string[] = this.tableHeaders.map(({ id }) => id);
  editProductText: string = EDIT_PRODUCT_TEXT;
  products: Product[];
  subscription: Subscription;
  dataSource: MatTableDataSource<Product>;
  pageSizeOption: number[] = PAGE_SIZE_OPTION;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private productService: ProductService) {
    this.subscription = this.productService
      .getProductsObservable()
      .subscribe((products) => {
        this.products = products;
        this.initializeMaterialTable(products);
      });
  }

  private initializeMaterialTable(products: Product[]) {
    this.dataSource = new MatTableDataSource(products);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataSource.filterPredicate = (data: Product, textString: string) =>
      data.title.toLowerCase().includes(textString.toLowerCase());
  }

  filter(query: string) {
    this.dataSource.filter = query;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
