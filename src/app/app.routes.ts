import { Routes } from '@angular/router';
import { ShopComponent } from './features/shop/shop.component';
import { CartComponent } from './features/cart/cart.component';

export const routes: Routes = [
  { path: '', component: ShopComponent },
  { path: 'shop', component: ShopComponent },
  { path: 'cart', component: CartComponent },
  { path: '**', redirectTo: 'shop', pathMatch: 'full' },
];
