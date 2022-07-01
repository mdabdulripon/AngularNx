import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { map, Observable } from 'rxjs';
import { IOrder } from '../models/order';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  private baseUrl = environment.baseUrl + 'orders';
  private productURL = environment.baseUrl + 'products';

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

  getOrdersCount(): Observable<number> {
    return this.http
      .get<number>(`${this.baseUrl}/get/count`)
      .pipe(map((obj: any) => obj.orderCount));
  }

  getTotalSales(): Observable<number> {
    return this.http
      .get<number>(`${this.baseUrl}/get/totalsales`)
      .pipe(map((obj: any) => obj.totalsales));
  }

  getProduct(productId: string) : Observable<any>{
    return this.http.get<any>(`${this.productURL}/${productId}`);
  }
}
