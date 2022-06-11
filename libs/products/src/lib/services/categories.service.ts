import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { ICategory } from '../models/category';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  
  private baseUrl = environment.baseUrl + 'categories';

  constructor(private http: HttpClient) { }

  getCategories() : Observable<ICategory[]> {
    return this.http.get<ICategory[]>(this.baseUrl);
  }

  getCategory(categoryId: string) : Observable<ICategory>{
    return this.http.get<ICategory>(`${this.baseUrl}/${categoryId}`);
  }

  createCategories(category: ICategory) : Observable<ICategory> {
    return this.http.post<ICategory>(this.baseUrl, category);
  }
  
  updateCategories(category: ICategory) : Observable<ICategory> {
    return this.http.put<ICategory>(`${this.baseUrl}/${category.id}`, category);
  }

  deleteCategory(categoryId: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${categoryId}`);
  }

}
