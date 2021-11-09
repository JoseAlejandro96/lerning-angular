import { Component, OnInit } from '@angular/core';
import {ProductsService} from "./services/products.service";
import {tap} from "rxjs/operators";
import {Product} from "./interface/product.interface";
import {ShoppingCartService} from "../../shared/services/shopping-cart.service";



// ng g m pages/products -m=app --route products
@Component({
  selector: 'app-products',
  template: `
    <section class="products">

      <app-product
        (addToCartClick)="addToCart($event)"
        [product]="product"
        *ngFor="let product of products"></app-product>

    </section>
  `,
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  public products!: Product[]

  constructor(
    private productsService: ProductsService,
    protected shoppingCartService: ShoppingCartService) { }

  ngOnInit(): void {
    this.productsService.getProducts()
      .pipe(
        tap( (products: Product[]) => this.products = products)
      )
      .subscribe()

  }

  public addToCart(product: Product):void{
    this.shoppingCartService.updateCart(product)
  }

}
