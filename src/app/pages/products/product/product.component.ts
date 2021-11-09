import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {Product} from "../interface/product.interface";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductComponent{

  @Input() product!: Product
  @Output() addToCartClick = new EventEmitter<Product>()

  public onBuyClick() : void{
    this.addToCartClick.emit(this.product)
  }
}
