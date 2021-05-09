import { Injectable } from '@angular/core';
import { CartItem } from './cart/cartItem';
import { cartItems } from './cart/cartItems';
import { Product } from './product/product';

@Injectable()
export class CartService {

  constructor() { }

  addProductToCart(product: Product): void {
    const existingItem = cartItems.find(cartItem => cartItem.product.id === product.id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cartItems.push({ product, quantity: 1 });
    }

    console.debug("[CartService.addProductToCart] current state: " + JSON.stringify(cartItems));
    console.debug("[CartService.addProductToCart] current item count: " + cartItems.length);
  }
}