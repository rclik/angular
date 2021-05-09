import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { CartItem } from './cartItem';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  providers: [CartService]
})
export class CartComponent implements OnInit {

  private cartItems: Array<CartItem> = [];

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    console.log(`[CartComponent.ngOnInit] is called.`);
    this.cartItems = this.cartService.getCart();
  }

  get getCartItems(): Array<CartItem> {
    console.log(`Item count inside cart is ${this.cartItems.length}`);
    return this.cartItems;
  }

  removeItem(item: CartItem): void {
    this.cartService.removeItem(item);
  }

}
