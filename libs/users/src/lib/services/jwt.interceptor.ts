import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LocalStorageService } from './local-storage.service';
import { environment } from 'environments/environment';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private localStorageService: LocalStorageService) {}

  // TODO: WHAT IS AN HTTP INTERCEPTOR?
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.localStorageService.getToken();
    const isApiURL = request.url.startsWith(environment.baseUrl);
    
    if (token && isApiURL) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }
    return next.handle(request);
  }
}
