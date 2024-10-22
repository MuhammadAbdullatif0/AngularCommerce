import { Component, inject, OnInit } from '@angular/core';
import { ShopService } from '../../core/services/shop.service';
import { Pagination } from '../../shared/models/Pagination';
import { ShopParams } from '../../shared/models/ShopParams';
import { Product } from '../../shared/models/product';
import { CurrencyPipe } from '@angular/common';
import { PaginationComponent } from './Pagination/Pagination.component';
import { CategoryFilterComponent } from './category-filter/category-filter.component';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [CurrencyPipe, PaginationComponent, CategoryFilterComponent],
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css'],
})
export class ShopComponent implements OnInit {
  private shopService = inject(ShopService);
  products?: Pagination<Product>;
  productParams = new ShopParams();
  totalPages = 0;
  ngOnInit() {
    this.getProducts();
    this.shopService.getProductCategories();
  }

  getProducts() {
    this.shopService.getProducts(this.productParams).subscribe({
      next: (response) => {
        this.products = response;
        this.totalPages = Math.ceil(response.count / response.pageSize);
        console.log(this.products?.data);
      },
      error: (error) => console.error(error),
    });
  }

  onPageChange(page: number) {
    this.productParams.pageNumber = page;
    this.getProducts();
  }

  onCategorySelected(categoryIds: number[]): void {
    this.productParams.CategoryIds = categoryIds;
    this.productParams.pageNumber = 1;
    this.getProducts();
  }
}
