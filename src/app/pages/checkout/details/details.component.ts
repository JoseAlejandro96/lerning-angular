import { Component, OnInit } from '@angular/core';
import {ShoppingCartService} from "../../../shared/services/shopping-cart.service";

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  public total$ = this.shoppingCartService.totalAction$
  public cart$ = this.shoppingCartService.cartAction$

  constructor(
    private shoppingCartService: ShoppingCartService
  ) { }

  ngOnInit(): void {
  }

}
