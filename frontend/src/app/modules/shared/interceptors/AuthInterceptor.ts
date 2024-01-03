import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {AuthGuardService} from "../guards/auth.guard";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthGuardService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authToken = this.authService.token;

    if (authToken) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${authToken}`
        }
      });
    }

    return next.handle(request);
  }
}
