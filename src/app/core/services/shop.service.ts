import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Pagination } from '../../shared/models/Pagination';
import { Product } from '../../shared/models/product';
import { ShopParams } from '../../shared/models/ShopParams';
import { Category } from '../../shared/models/Category';

@Injectable({
  providedIn: 'root',
})
export class ShopService {
  baseUrl = environment.apiUrl;
  private http = inject(HttpClient);
  categories: Category[] = [];

  getProducts(shopParams: ShopParams) {
    let params = new HttpParams();
    if (shopParams.CategoryIds.length > 0) {
      params = params.append('CategoryIds', shopParams.CategoryIds.join(','));
    }
    params = params.append('pageSize', shopParams.pageSize);
    params = params.append('pageIndex', shopParams.pageNumber);

    return this.http.get<Pagination<Product>>(
      this.baseUrl + 'Products/GetProducts',
      {
        params,
      }
    );
  }

  getProduct(id: number) {
    return this.http.get<Product>(this.baseUrl + 'Products/GetProduct/' + id);
  }

  getProductCategories() {
    if (this.categories.length > 0) return;
    return this.http
      .get<Category[]>(this.baseUrl + 'Products/GetProductCategories')
      .subscribe({
        next: (response) => {
          this.categories = response;
          console.log(response);
          console.log(this.categories);
        },
      });
  }
}
