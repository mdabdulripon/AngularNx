import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { IProduct } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  
  private baseUrl = environment.baseUrl + 'products';

  constructor(private http: HttpClient) { }

  getProducts() : Observable<IProduct[]> {
    return this.http.get<IProduct[]>(this.baseUrl);
  }

  getProduct(productId: string) : Observable<IProduct>{
    return this.http.get<IProduct>(`${this.baseUrl}/${productId}`);
  }

  createProduct(productData: FormData) : Observable<IProduct> {
    return this.http.post<IProduct>(this.baseUrl, productData);
  }
  
  updateProduct(productData: FormData, productId: string) : Observable<IProduct> {
    return this.http.put<IProduct>(`${this.baseUrl}/${productId}`, productData);
  }

  deleteProduct(productId: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${productId}`);
  }
}
