import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Member } from '../_Models/memebr';
//remeber services are singletons that instantiated when the  component needs the service 
// and it operates as a singlton and it stays alive until the application is closed 
// so services make a good candidate for storing application state 
const httpOptions= {
  headers:new HttpHeaders({
    Authorization:'Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiJsaXNhIiwibmJmIjoxNjczMzY1MzU4LCJleHAiOjE2NzM2MjQ1NTgsImlhdCI6MTY3MzM2NTM1OH0.kJn-xzPuzD8iO6rCxuUHqfenD20FcfAey2dPhcJ5WGgHC2DqX1rOvdTAycGwMggVQNW1mVsgppRQcurJlUm6GA'// + JSON.parse(localStorage.getItem('user'))?.token
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

  GetMember(userName:string){
    return this.http.get<Member>(this.apiUrl+'users/'+userName,httpOptions )
   }
   updateMember(memebr:Member){
    return this.http.put(this.apiUrl + 'users' , memebr);
   }
}
