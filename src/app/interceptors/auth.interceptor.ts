import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    // Get JWT token from localStorage
    const token = localStorage.getItem('jwt');
    const isPutRequest = req.method === 'PUT';
    if (token && isPutRequest) {
      // Clone request and add Authorization header
      const authReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });

      return next.handle(authReq);
    }

    // If no token -> send request unchanged
    return next.handle(req);
  }
}
