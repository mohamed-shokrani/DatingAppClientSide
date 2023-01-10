import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { map, Observable, ObservableInput } from 'rxjs';
import { User } from '../_Models/user';
import { AccountService } from '../_services/account.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private accountService:AccountService,private toastr:ToastrService){}
  canActivate(): Observable<boolean> {
    return this.accountService.CurrentUser$.pipe(
      map((user:User) => {
        if (user)  return true;
        else{
          this.toastr.error('You shall not pass!');

        }
      })
    )
  }
   
  
}
