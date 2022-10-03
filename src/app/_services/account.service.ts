import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, ReplaySubject } from 'rxjs';
import { Isuer } from '../_Models/user';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseURL = 'https://localhost:5001/api/Account/Login'
  //Creating an observable to store our user in 
  private CurrenUserSource = new ReplaySubject<Isuer>(1)//one is the size of our buffer 
  ; //Special Type of observable//
  //  gonna store values inside inside her any type we subscribe to this obs 
  // is gonna emit last value inside it  
  CurrenUser$ = this.CurrenUserSource.asObservable()

  constructor(private http:HttpClient) {
    
   }
   // login method is gonna receive our creditional from the login form from a navbar
   //service are injectable and are singlton which means that
   // data we store inside the service  does not get destroyed until the is down  
   // component are different when we move from component to component in angluar they are destroyed 

   login(model:any){


    return this.http.post(this.baseURL ,model).pipe(
      map((res:Isuer)=>{
        const user = res;
        if(user){
          localStorage.setItem('user',JSON.stringify(user))
          this.CurrenUserSource.next(user);
        }
      })
    ); 
  }
  setCurrentUser(user:Isuer){
    this.CurrenUserSource.next(user)
  }
  logOut(){
    localStorage.removeItem('user');
    this.CurrenUserSource.next(null);
    

  }
}
