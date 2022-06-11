import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { ICategory } from '../models/category';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private http: HttpClient) { }

  getCategories() : Observable<ICategory[]> {
    return this.http.get<ICategory[]>('http://localhost:3000/api/v1/categories/');
  }

  getCategory(categoryId: string) : Observable<ICategory>{
    return this.http.get<ICategory>(`http://localhost:3000/api/v1/categories/${categoryId}`);
  }

  createCategories(category: ICategory) : Observable<ICategory> {
    return this.http.post<ICategory>('http://localhost:3000/api/v1/categories/', category);
  }
  
  updateCategories(category: ICategory) : Observable<ICategory> {
    return this.http.put<ICategory>(`http://localhost:3000/api/v1/categories/${category.id}`, category);
  }

  deleteCategory(categoryId: string): Observable<any> {
    return this.http.delete<any>(`http://localhost:3000/api/v1/categories/${categoryId}`);
  }

}
