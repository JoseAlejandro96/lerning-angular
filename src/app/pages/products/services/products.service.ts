import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Product} from "../interface/product.interface";
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  public getProducts() : Observable<Product[]>{
    return this.http.get<Product[]>(`${this.apiUrl}/products`)
  }

  public updateStock(productId: number, stock: number) : Observable<any>{
    const body ={
      "stock": stock
    }
    return this.http.patch<any>(`${this.apiUrl}/products/${productId}`, body)
  }
}
