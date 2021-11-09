import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";
import {Store} from "../interfaces/store.interface";


@Injectable({
  providedIn: 'root'
})
export class DataService{
  private  apiUrl = environment.apiUrl

  constructor(private http: HttpClient) {}

  public getStores() : Observable<Store[]>{
    return this.http.get<Store[]>(`${this.apiUrl}/stores`)
  }
}
