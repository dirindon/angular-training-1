import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { ProductInCart } from '../products';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  items = this.cartService.getItems();

  constructor(private cartService: CartService) {}

  ngOnInit(): void {}

  getTotalPrice(): number {
    return this.cartService.getTotalPrice();
  }

  removeOne(item: ProductInCart) {
    this.cartService.lowerAmountInCart(item);
  }

  addOne(item: ProductInCart) {
    this.cartService.increaseAmountInCart(item);
  }
}
