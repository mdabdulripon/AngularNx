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


}
