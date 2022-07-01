import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ICart, ICartItem } from '../models/cart';

export const CART_KEY = 'cart'

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cart$: BehaviorSubject<ICart> = new BehaviorSubject(this.getCart() || null);

  constructor() { }

  initialCartInLocalStorage() {
    const cart: ICart = this.getCart();
    if (!cart) {
      const initialCart = { items: [] };
      localStorage.setItem('cart', JSON.stringify(initialCart));
    }
  }

  emptyCart() {
    const initialCart = { items: [] };
    const initialCartJson = JSON.stringify(initialCart);
    localStorage.setItem(CART_KEY, initialCartJson);
    this.cart$.next(initialCart);
  }

  getCart() : ICart {
    return JSON.parse(localStorage.getItem(CART_KEY)!);
  }

  setCartItem(cartItem: ICartItem): ICart {
    const cart: ICart = this.getCart();
    const idx = cart.items.findIndex(x => x.productId === cartItem.productId);

    if (idx === -1) {
      cart.items.push(cartItem);
    } else {
      cart.items[idx].quantity! += cartItem.quantity!;
    }
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    this.cart$.next(cart);
    return cart;
  }

  deleteCartItem(productId: string) {
    const cart = this.getCart();
    const newCart = cart.items.filter((item) => item.productId !== productId);

    cart.items = newCart;

    const cartJsonString = JSON.stringify(cart);
    localStorage.setItem(CART_KEY, cartJsonString);

    this.cart$.next(cart);
  }

}
