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

  getCart(): Array<CartItem> {
    return cartItems;
  }

  removeItem(item: CartItem): void {
    cartItems.filter((cartItem, index) => {
      if (cartItem.product.id === item.product.id) {
        if (cartItem.quantity > 1) {
          cartItem.quantity -= 1;
        } else {
          cartItems.splice(index, 1);
        }
      }
    });
  }
}