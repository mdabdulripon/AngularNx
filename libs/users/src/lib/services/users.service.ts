import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { map, Observable } from 'rxjs';
import { IUser } from '../models/user';
import { UsersFacade } from '../state/users.facade';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  baseUrl = environment.baseUrl + 'users';

  constructor(private http: HttpClient, private userFacade: UsersFacade) {
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

  getUsersCount(): Observable<number> {
    return this.http
      .get<number>(`${this.baseUrl}/get/count`)
      .pipe(map((obj: any) => obj.userCount));
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

  initAppSession() { 
    this.userFacade.buildUserSession();
  }

  observeCurrentUser() {
    return this.userFacade.currentUser$;
  }

  isCurrentUserAuthenticated() {
    return this.userFacade.currentUser$;
  }
}
