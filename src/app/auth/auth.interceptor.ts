import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.log("#FR");
    
    if(this.isLoggedIn()) {
      console.log("#FR IN IF");
      return next.handle(request.clone({
        headers: request.headers.set('Authorization','Bearer '+localStorage.getItem('jwt'))
      }));
    }
    return next.handle(request);
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('jwt') != null;
  }
}
