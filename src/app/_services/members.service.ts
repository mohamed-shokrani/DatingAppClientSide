import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { map, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Member } from '../_Models/memebr';
//remeber services are singletons that instantiated when the  component needs the service 
// and it operates as a singlton and it stays alive until the application is closed 
// so services make a good candidate for storing application state 
const httpOptions= {
  headers:new HttpHeaders({
    Authorization:'Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiJsaXNhIiwibmJmIjoxNjc1NTIwODQyLCJleHAiOjE2NzU3ODAwNDIsImlhdCI6MTY3NTUyMDg0Mn0.ORIC-6rRn4VHm5EfPNuxhvt7UFaBsHY3sHUldzINTo8pY5FsuvIJCUU_OqCugtVuW6ovnoBbNrd3O3CIYFmxgA'// + JSON.parse(localStorage.getItem('user'))?.token
  })
}

@Injectable({
  providedIn: 'root'
})
export class MembersService {

  apiUrl = environment.apiUrl;
   
  members:Member[]=[]
  constructor(private http:HttpClient 
  ) { }

  GetMembers (){
    if (this.members.length > 0) {
      return of(this.members)
      
    }
   return this.http.get<Member[]>(this.apiUrl+ 'users',httpOptions).pipe(
    map(m=>{this.members =m
        return this.members})
  
   )
  }

  GetMember(userName:string){
    const member = this.members.find(x=> x.userName=== userName)
    if (member !== undefined) {
      return of (member)
      
    }
    return this.http.get<Member>(this.apiUrl+'users/'+userName,httpOptions )
   }
   updateMember(memebr:Member){
    return this.http.put(this.apiUrl + 'users' , memebr,httpOptions).pipe(// we want to do something with this data 
      map(()=>{//get the member from the service 
        const index = this.members.indexOf(memebr); // to find out the index 
        this.members[index] =memebr;  
      })
    );
   }
}
