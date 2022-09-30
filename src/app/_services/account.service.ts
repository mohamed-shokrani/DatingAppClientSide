import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseURL = 'https://localhost:5001/api/Account/Login'

  constructor(private http:HttpClient) {
    
   }
   // login method is gonna receive our creditional from the login form from a navbar
   //service are injectable and are singlton which means that
   // data we store inside the service  does not get destroyed until the is down  
   // component are different when we move from component to component in angluar they are destroyed 

   login(model:any){
    return this.http.post(this.baseURL ,model);
    
  }
}
