import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { IOrder } from '../models/order';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  private baseUrl = environment.baseUrl + 'orders';

  constructor(private http: HttpClient) { }

  getOrders() : Observable<IOrder[]> {
    return this.http.get<IOrder[]>(this.baseUrl);
  }

  getOrder(orderId: string) : Observable<IOrder>{
    return this.http.get<IOrder>(`${this.baseUrl}/${orderId}`);
  }

  createOrders(order: IOrder) : Observable<IOrder> {
    return this.http.post<IOrder>(this.baseUrl, order);
  }
  
  updateOrders(order: IOrder) : Observable<IOrder> {
    return this.http.put<IOrder>(`${this.baseUrl}/${order.id}`, order);
  }

  deleteOrder(orderId: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${orderId}`);
  }

}
