import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { IUser } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  baseUrl = environment.baseUrl + 'users';

  constructor(private http: HttpClient) {
    // countriesLib.registerLocale(require('i18n-iso-countries/langs/en.json'));
  }

  getUsers(): Observable<IUser[]> {
    return this.http.get<IUser[]>(this.baseUrl);
  }

  getUser(userId: string): Observable<IUser> {
    return this.http.get<IUser>(`${this.baseUrl}/${userId}`);
  }

  createUser(user: IUser): Observable<IUser> {
    return this.http.post<IUser>(this.baseUrl, user);
  }

  updateUser(user: IUser): Observable<IUser> {
    return this.http.put<IUser>(`${this.baseUrl}/${user.id}`, user);
  }

  deleteUser(userId: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${userId}`);
  }

  // getCountries(): { id: string; name: string }[] {
  //   return Object.entries(countriesLib.getNames('en', { select: 'official' })).map((entry) => {
  //     return {
  //       id: entry[0],
  //       name: entry[1]
  //     };
  //   });
  // }

  // getCountry(countryKey: string): string {
  //   return countriesLib.getName(countryKey, 'en');
  // }
}
