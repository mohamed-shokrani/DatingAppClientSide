import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Member } from '../_Models/memebr';
const httpOptions= {
  headers:new HttpHeaders({
    Authorization:'Bearer ' + JSON.parse(localStorage.getItem('user'))?.token
  })
}

@Injectable({
  providedIn: 'root'
})
export class MembersService {

  apiUrl = environment.apiUrl;
   

  constructor(private http:HttpClient 
  ) { }

  GetMembers (){
   return this.http.get<Member[]>(this.apiUrl+ 'users',httpOptions)
  }

  GetMember (username:string){
    return this.http.get<Member>(this.apiUrl+'users/'+username,httpOptions)
   }
}
