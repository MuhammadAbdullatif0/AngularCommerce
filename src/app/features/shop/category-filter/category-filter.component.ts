import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { ShopService } from '../../../core/services/shop.service';
import { Category } from '../../../shared/models/Category';

@Component({
  selector: 'app-category-filter',
  standalone: true,
  imports: [],
  templateUrl: './category-filter.component.html',
  styleUrls: ['./category-filter.component.css'],
})
export class CategoryFilterComponent implements OnInit {
  ShopService = inject(ShopService);
  categories: Category[] = [];
  selectedCategoryIds: number[] = [];

  @Output() categorySelected = new EventEmitter<number[]>();

  ngOnInit() {
    this.fetchCategories();
  }
  fetchCategories(): void {
    this.categories = this.ShopService.categories;
    console.log(this.categories);
  }
  onCategoryChange(categoryId: number, event: Event): void {
    const isChecked = (event.target as HTMLInputElement).checked;
    if (isChecked) {
      this.selectedCategoryIds.push(categoryId);
    } else {
      this.selectedCategoryIds = this.selectedCategoryIds.filter(
        (id) => id !== categoryId
      );
    }
    this.categorySelected.emit(this.selectedCategoryIds);
  }
}
