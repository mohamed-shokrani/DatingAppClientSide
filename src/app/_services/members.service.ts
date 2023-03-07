import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { map, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthInterceptor } from '../_interceptors/auth.interceptor';
import { Member } from '../_Models/memebr';
import { Photo } from '../_Models/photo';
import { AccountService } from './account.service';
//remeber services are singletons that instantiated when the  component needs the service 
// and it operates as a singlton and it stays alive until the application is closed 
// so services make a good candidate for storing application state 
// const httpOptions= {
//   headers:new HttpHeaders({
//     Authorization:
//    // Authorization:'Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiJtb2hhbWVkIHNob2tyYW5pIiwibmJmIjoxNjc4MjE2NjQ3LCJleHAiOjE2Nzk5NDQ2NDcsImlhdCI6MTY3ODIxNjY0N30.KjiA14KDb56QiwzFTxJqMrdtqDlpJE4UXP9gVAO22Yn9WTlrd531tAvS1re5DiVpvMZ9Bfk9F-C-f0hFss6Zig'
// })}

@Injectable({
  providedIn: 'root'
})
export class MembersService {

  apiUrl = environment.apiUrl;
   
  members:Member[]=[]
  constructor(private http:HttpClient ,private me:AccountService
  ) { }

  GetMembers (){
    if (this.members.length > 0) {
      return of(this.members)
      
    }
   return this.http.get<Member[]>(this.apiUrl+ 'users').pipe(
    map(ServerMemebers=>{this.members =ServerMemebers
        return this.members})
  
   )
  }

  GetMember(userName:string){
    const member = this.members.find(x=> x.userName === userName)
    if (member !== undefined) {
      return of (member)
      
    }
    return this.http.get<Member>(this.apiUrl+'users/'+userName )
   }
   updateMember(memebr:Member){
    return this.http.put(this.apiUrl + 'users' , memebr).pipe(// we want to do something with this data 
      map(()=>{//get the member from the service 
        const index = this.members.indexOf(memebr); // to find out the index 
        this.members[index] =memebr;  
        console.log(memebr);
        
      })
    );
   }
   setMainPhoto(photoId:number){
    console.log(photoId);
          return this.http.put(this.apiUrl+'users/set-main-photo/'+ photoId ,{})
   }
   DeletePhoto(photoId:number){
    return this.http.delete(this.apiUrl+'users/delete-photo/'+ photoId )
   }
}
