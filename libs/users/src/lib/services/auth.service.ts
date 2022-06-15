import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { IUser } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = environment.baseUrl + 'users';
  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<IUser> {
    return this.http.post<IUser>(`${this.baseUrl}/login`, {email, password});
  }
}
