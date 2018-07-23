import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-cart-product',
  templateUrl: './cart-product.component.html',
  styleUrls: ['./cart-product.component.css']
})
export class CartProductComponent implements OnInit {

  @Input() title: number;
  @Input() price: number;
  @Input() imageURL: number;
  @Input() quantity: number;
  @Input() isClicked: boolean;
  @Output() addToCart = new EventEmitter();
  @Output() subtractFromCart = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  onClick() {
    this.addToCart.emit();
  }
  onSClick() {
    this.subtractFromCart.emit();
  }
}
