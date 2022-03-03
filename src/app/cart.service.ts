import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductInCart } from './products';

@Injectable({
  providedIn: 'root',
})
@Injectable()
export class CartService {
  items: ProductInCart[] = [];
  public numberOfItemsInCart = 0;
  /* . . . */

  constructor(private http: HttpClient) {}

  getShippingPrices() {
    return this.http.get<{ type: string; price: number }[]>(
      '/assets/shipping.json'
    );
  }

  addToCart(product: ProductInCart) {
    let found = false;
    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].id == product.id) {
        found = true;
        this.items[i].amount++;
        break;
      }
    }

    if (!found) {
      this.items.push(new ProductInCart(product));
    }

    let numberOfItemsInCart = 0;
    for (let i = 0; i < this.items.length; i++) {
      numberOfItemsInCart += this.items[i].amount;
    }
    this.numberOfItemsInCart = numberOfItemsInCart;
  }

  removeFromCart(product: ProductInCart) {
    const index = this.items.indexOf(product, 0);
    if (index > -1) {
      this.items.splice(index, 1);
    }
  }

  lowerAmountInCart(product: ProductInCart) {
    product.amount--;
    if (product.amount <= 0) {
      this.removeFromCart(product);
    }
  }

  increaseAmountInCart(product: ProductInCart) {
    product.amount++;
  }

  getItemsCountInCart() {
    let numberOfItemsInCart = 0;
    for (let i = 0; i < this.items.length; i++) {
      numberOfItemsInCart += this.items[i].amount;
    }
    return numberOfItemsInCart;
  }

  getTotalPrice() {
    let totalPrice = 0;
    for (let i = 0; i < this.items.length; i++) {
      totalPrice += this.items[i].amount * this.items[i].price;
    }
    return totalPrice;
  }

  getItems() {
    return this.items;
  }

  clearCart() {
    this.items = [];
    return this.items;
  }
}
