import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CartService } from '../../core/services/Cart.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  private cartService = inject(CartService);
  cartCount: number = 0;

  ngOnInit() {
    this.cartService.cart$.subscribe((cartItems) => {
      this.cartCount = cartItems.length;
    });
  }
}
