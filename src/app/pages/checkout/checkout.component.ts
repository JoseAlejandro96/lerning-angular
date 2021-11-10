import { Component, OnInit } from '@angular/core';
import {DataService} from "../../shared/services/data.service";
import {delay, switchMap, tap} from "rxjs/operators";
import {Store} from "../../shared/interfaces/store.interface";
import {NgForm} from "@angular/forms";
import {Details, DetailsOrder} from "../../shared/interfaces/order.interface";
import {Product} from "../products/interface/product.interface";
import {ShoppingCartService} from "../../shared/services/shopping-cart.service";
import {Router} from "@angular/router";
import {ProductsService} from "../products/services/products.service";

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  public model = {
    name: 'Jose',
    store: '',
    shippingAddress: '',
    city: ''
  }
  public stores: Store[] = []
  public isDelivery: boolean = true
  private cart: Product[] = []
  constructor(
    private dataService: DataService,
    private shoppingCartService: ShoppingCartService,
    private router: Router,
    private productService: ProductsService
  ) {
    this.checkIfCartIsEmpty()
  }

  ngOnInit(): void {
    this.getStores()
    this.getDataCart()
  }

  public onPickupOrDelivery(value : boolean) : void{
    this.isDelivery = value
  }

  public onSubmit ({ value : formData }: NgForm) : void{
    console.log(formData)
    const data = {
      ...formData,
      date: this.getCurrentDate(),
      isDelivery: this.isDelivery
    }

    this.dataService.saveOrder(data)
      .pipe(
        tap(res => console.log('Order: ', res)),
        switchMap( ({id: orderId}) => {
          const details: Details[] = this.prepareDetails()
          return this.dataService.saveDetailsOrder({details, orderId});
        }),
        tap(() => this.router.navigate(['/checkout/thank-you-page'])),
        delay(2000),
        tap(() => this.shoppingCartService.resetCart())
      )
      .subscribe()
  }

  private getStores() : void{
    this.dataService.getStores()
      .pipe(
        tap((stores: Store[]) => this.stores = stores)
      ).subscribe()
  }

  private getCurrentDate () : string{
    return new Date().toLocaleDateString()
  }

  private prepareDetails() : Details[] {
    const details : Details[] = []
    this.cart.forEach( (product: Product) =>{
      const {id : productId, name: productName, qty: quantity, stock} = product
      const updateStock = (stock - quantity)

      this.productService.updateStock(productId, updateStock)
        .pipe(
          tap( () => details.push({productId, productName, quantity}))
        )
        .subscribe()

    })

    return details
  }

  private getDataCart() : void{
    this.shoppingCartService.cartAction$
      .pipe(
        tap((products : Product[]) => this.cart = products)
      )
      .subscribe()
  }

  private checkIfCartIsEmpty() : void{
    this.shoppingCartService.cartAction$
      .pipe(
        tap( (products: Product[]) => {
          if(Array.isArray(products) && !products.length){
            this.router.navigate(['/products'])
          }
        })
      )
      .subscribe()
  }
}
