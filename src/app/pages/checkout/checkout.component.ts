import { Component, OnInit } from '@angular/core';
import {DataService} from "../../shared/services/data.service";
import {tap} from "rxjs/operators";
import {Store} from "../../shared/interfaces/store.interface";

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

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.getStores()
  }

  public onPickupOrDelivery(value : boolean) : void{
    console.log(value)
  }

  public onSubmit () : void{
    console.log("Guardar")
  }

  public getStores() : void{
    this.dataService.getStores()
      .pipe(
        tap((stores: Store[]) => this.stores = stores)
      ).subscribe()
  }
}
