import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { NavigationExtras, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private router:Router,private toastr:ToastrService ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {//what we can do her is whether to intercept the request that goes out or the response that comes back in the next 
    return next.handle(request).pipe(
      catchError(error=>{
         if(error){
            switch (error.status) {
              case 400:
                if (error.error.errors) {
                  const modalStatErrors =[];
                  for(const key in error.error.errors){
                    if(error.error.errors[key])
                    modalStatErrors.push(error.error.errors[key])// the idea of this is to flaten the array of errors that we get back from validation responses 
                  }
                  throw modalStatErrors.flat();

                }else{
                  this.toastr.error(error.statusText,error.status)
                }
                break;
                case 401:
                  this.toastr.error(error.statusText,error.status)
                  break;
                case 404:
                   this.router.navigateByUrl('/not-found')
                    break;
                case 500:
                  const navigationExtras :NavigationExtras={state:{
                    error:error.error
                  }};
                  this.router.navigateByUrl('/server-error',navigationExtras);// pass navigation extras as the stats
                   
                      break;

              default:
                this.toastr.error('Somthing unexpected went wrong ');
                console.log(error);
                
                break;
            }
         }
         return throwError(error);
      }));
      
    
  }
}
