import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { IUser } from '../models/user';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = environment.baseUrl + 'users';
  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService,
    private router: Router
    ) { }

  login(email: string, password: string): Observable<IUser> {
    return this.http.post<IUser>(`${this.baseUrl}/login`, {email, password});
  }

  logout() {
    this.localStorageService.removeToken();
    this.router.navigate(['/login']);
  }
}
