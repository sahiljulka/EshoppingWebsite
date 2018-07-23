import { Component, Input, OnInit, Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  @Input() quantity:Number;
  @Input() isClicked:string;
  @Input() title:string;
  @Input() subtitle:string;
  @Input() imageURL:string;
  @Output() addToCart=new EventEmitter();
  @Output() subtractFromCart=new EventEmitter();
  constructor() {
   }

  ngOnInit() {
  }

  onClick(){
    this.addToCart.emit();
  }
  onSClick(){
    this.subtractFromCart.emit();
  }

}
