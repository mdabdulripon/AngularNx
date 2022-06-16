import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private localStorageService: LocalStorageService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

    const token = this.localStorageService.getToken();
    if (token) {
      // need to decode the token
      const tokenDecode = JSON.parse(atob(token.split('.')[1]));
      if (tokenDecode.isAdmin && !this.tokenExpired(tokenDecode.exp)) {
        return true;
      }
    }
    this.router.navigate(['/login']);
    return false;
  }

  tokenExpired(expiration: any) : boolean {
    return Math.floor(new Date().getTime() / 1000) >= expiration;
  }
}
