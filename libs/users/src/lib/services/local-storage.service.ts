import { Injectable } from '@angular/core';

const TOKEN = 'jwtToken';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  setToken(data: string) {
    localStorage.setItem(TOKEN, data);
  }
  
  getToken(): string {
    return localStorage.getItem(TOKEN)!;
  }

  removeToken(): void {
    localStorage.removeItem(TOKEN);
  }

  getUserIdFromToken() {
    const token = this.getToken();
    if (token) {
      const tokenDecode = JSON.parse(atob(token.split('.')[1]));
      if (tokenDecode) {
        return tokenDecode.userId;
      } else {
        return null;
      }
    } else {
      return null;
    }
  }

  isValidToken() {
    const token = this.getToken();
    if (token) {
      const tokenDecode = JSON.parse(atob(token.split('.')[1]));
      return !this.tokenExpired(tokenDecode.exp);
    } else {
      return false;
    }
  }

  private tokenExpired(expiration: any) : boolean {
    return Math.floor(new Date().getTime() / 1000) >= expiration;
  }


}
