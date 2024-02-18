import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { MembersService } from '../_services/members.service';
import { AccountService } from '../_services/account.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private AccountService:AccountService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    request = request.clone({
      headers:request.headers.set('Authorization' , 'Bearer ' + localStorage.getItem("userToken"))
    })
   
    return next.handle(request);
  }
}
export const AuthInterceptorProvider ={
  provide:HTTP_INTERCEPTORS,
  useClass:AuthInterceptor,
  multi:true
};
