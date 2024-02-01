import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { map, ReplaySubject } from 'rxjs';
import { User } from '../_Models/user';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseURL = 'https://localhost:5001/api/'
  //Creating an observable to store our user in 
  private CurrentUserSource = new ReplaySubject<User>(1)//one is the size of our buffer 
  ; //Special Type of observable//
  //  gonna store values inside inside her any type we subscribe to this obs 
  // is gonna emit last value inside it  
  CurrentUser$ = this.CurrentUserSource.asObservable()
MyToken:string=""
  constructor(private http:HttpClient) {
    
   }
   // login method is gonna receive our creditional from the login form from a navbar
   //service are injectable and are singlton which means that
   // data we store inside the service  does not get destroyed until the is down  
   // component are different when we move from component to component in angluar they are destroyed 

   login(model:any){
    return this.http.post(this.baseURL +'account/login', model).pipe(
      map((res:User)=>{
        const user = res;
        //console.log(res);
        this.MyToken= res.token
        console.log("token is" + this.MyToken);
         localStorage.setItem('userToken',this.MyToken);
        if(user){
         
          this.setCurrentUser(user);
        }
      })
    )
  }
  ShowToken(){
    console.log(this.MyToken);
   return  this.MyToken
  }
  setCurrentUser(user:User){
    localStorage.setItem('user',JSON.stringify(user))
    console.log("My user" +user);
    
    this.CurrentUserSource.next(user)
  }
  logOut(){
    localStorage.removeItem('user');
    this.CurrentUserSource.next(null);
    

  }
  Register(model:User){
    return this.http.post(this.baseURL +'account/register' ,model).pipe(
      map((user:User)=>{
      if(user){
        localStorage.setItem('user',JSON.stringify(user));
        this.CurrentUserSource.next(user);
      }
      return user;
    }))
    }
  
}
