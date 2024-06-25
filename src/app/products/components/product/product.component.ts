import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from 'src/app/shared/models/Product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {
  @Input() product!:Product;
  @Output() item = new EventEmitter();
  addButton:boolean=false;
  amount:number=1;

  addToCart(){
    this.item.emit({item:this.product,quantity:this.amount});
    this.addButton=false;
  }

}
