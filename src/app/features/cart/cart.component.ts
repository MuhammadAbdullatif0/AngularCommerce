import { Component, inject, OnInit } from '@angular/core';
import { CartItem } from '../../shared/models/CartItem';
import { CartService } from '../../core/services/Cart.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];
  total: number = 0;

  private cartService = inject(CartService);

  ngOnInit() {
    this.loadCartItems();
    this.calculateTotal();
    console.log(this.cartItems);
  }

  loadCartItems() {
    this.cartItems = this.cartService.getCartItems();
  }

  increaseQuantity(item: CartItem) {
    item.quantity++;
    this.cartService.updateCartItem(item);
    this.calculateTotal();
  }

  decreaseQuantity(item: CartItem) {
    if (item.quantity > 1) {
      item.quantity--;
      this.cartService.updateCartItem(item);
      this.calculateTotal();
    }
  }

  removeFromCart(item: CartItem) {
    this.cartService.removeItem(this.cartItems.indexOf(item));
    this.loadCartItems();
    this.calculateTotal();
  }

  calculateTotal() {
    this.total = this.cartItems.reduce((acc, item) => {
      const price = item.price || 0;
      const quantity = item.quantity || 0;
      return acc + price * quantity;
    }, 0);
  }
}
