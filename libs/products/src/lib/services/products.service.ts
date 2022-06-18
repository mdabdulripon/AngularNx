import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'
import { map, Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { IProduct } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  
  private baseUrl = environment.baseUrl + 'products';

  constructor(private http: HttpClient) { }

  getProducts(categoryFilters?: string[]) : Observable<IProduct[]> {
    let params = new HttpParams();
    if (categoryFilters) {
      params = params.append('categories', categoryFilters.join(','))
    }
    return this.http.get<IProduct[]>(this.baseUrl, {params: params});
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

  getFeaturedProducts(count: number): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(`${this.baseUrl}/get/featured/${count}`)
  }

  getProductsCount(): Observable<number> {
    return this.http
      .get<number>(`${this.baseUrl}/get/count`)
      .pipe(map((obj: any) => obj.productCount));
  }
}
