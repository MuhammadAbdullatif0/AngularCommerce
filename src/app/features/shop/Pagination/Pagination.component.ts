import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-Pagination',
  standalone: true,
  imports: [],
  templateUrl: './Pagination.component.html',
  styleUrls: ['./Pagination.component.css'],
})
export class PaginationComponent {
  @Input() totalPages!: number;
  @Input() currentPage!: number;
  @Output() pageChanged = new EventEmitter<number>();

  constructor() {}

  prevPage() {
    if (this.currentPage > 1) {
      this.pageChanged.emit(this.currentPage - 1);
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.pageChanged.emit(this.currentPage + 1);
    }
  }

  goToPage(page: number) {
    if (page !== this.currentPage && page >= 1 && page <= this.totalPages) {
      this.pageChanged.emit(page);
    }
  }
}
