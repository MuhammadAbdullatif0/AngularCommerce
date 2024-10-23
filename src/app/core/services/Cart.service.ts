import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartItem } from '../../shared/models/CartItem';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItems: CartItem[] = [];
  private cartSubject = new BehaviorSubject<CartItem[]>([]);
  cart$ = this.cartSubject.asObservable();

  constructor() {
    this.cartItems = this.getCartItems();
    this.cartSubject.next(this.cartItems);
  }

  addToCart(item: CartItem) {
    const existingItem = this.cartItems.find(
      (cartItem) => cartItem.id === item.id
    );

    if (existingItem) {
      existingItem.quantity += item.quantity;
    } else {
      item.quantity = 1;
      this.cartItems.push(item);
    }

    this.updateLocalStorage();
    this.cartSubject.next(this.cartItems);
  }

  getCartItems(): CartItem[] {
    return JSON.parse(localStorage.getItem('cart') || '[]');
  }

  removeItem(index: number) {
    if (index > -1 && index < this.cartItems.length) {
      this.cartItems.splice(index, 1);
      this.updateLocalStorage();
      this.cartSubject.next(this.cartItems);
    }
  }

  clearCart() {
    this.cartItems = [];
    localStorage.removeItem('cart');
    this.cartSubject.next([]);
  }

  updateCartItem(item: CartItem) {
    const index = this.cartItems.findIndex(
      (cartItem) => cartItem.id === item.id
    );

    if (index !== -1) {
      this.cartItems[index] = item;
      this.updateLocalStorage();
      this.cartSubject.next(this.cartItems);
    }
  }

  calculateTotal(): number {
    return this.cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  }

  private updateLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
  }
}
