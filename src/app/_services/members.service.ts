import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { map, of, take } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthInterceptor } from '../_interceptors/auth.interceptor';
import { Member } from '../_Models/memebr';
import { PaginatedResult } from '../_Models/pagination';
import { Photo } from '../_Models/photo';
import { AccountService } from './account.service';
import { UserParams } from '../_modules/UserParams';
import { User } from '../_Models/user';
//remeber services are singletons that instantiated when the  component needs the service 
// and it operates as a singlton and it stays alive until the application is closed 
// so services make a good candidate for storing application state 

@Injectable({
  providedIn: 'root'
})
export class MembersService {

  apiUrl = environment.apiUrl;
  members:Member[]=[];
  user:User;
  userParams :UserParams;
   memberCache = new Map();

  constructor(private http:HttpClient ,private accountService:AccountService
  ) { 

    this.accountService.CurrentUser$.pipe(take(1)).subscribe(user=>
      {
        this.user = user;
        this.userParams = new UserParams(this.user);
        
        
      })
  }
  getUserPramas(){
    return this.userParams;
  }
  setUserParams(params:UserParams){
    this.userParams = params;
  }
resetUserParams(){
  this.userParams = new UserParams(this.user);
  return this.userParams;
}
GetMembers(userParams:UserParams){
 var res =  this.memberCache.get(Object.values(userParams).join("-"))
    if(res){
      return of(res)
    }
  let params = this.getPaginationHeaders(userParams.pageNumber,userParams.pageSize)
  params = params.append('minAge',userParams.minAge.toString())
  params = params.append('maxAge',userParams.maxAge.toString())
  params = params.append('gender',userParams.gender)
  params = params.append("orderBy",userParams.orderBy)

  return this.getPaginatedResult<Member[]>(this.apiUrl+ 'users',params)
  .pipe(map(response=>
    {
      this.memberCache.set(Object.values(userParams).join("-") ,response)
      return response;
    }))
}

  private getPaginatedResult<T>(url,params) {
    const paginatedResult:PaginatedResult<T> = new PaginatedResult<T>()

    return this.http.get<T>(this.apiUrl + 'users', { observe: 'response', params }).pipe(
      map(response => {
        paginatedResult.result = response.body; //our members array is gonna be contained inside here
        if (response.headers.get("Pagination") !== null) {
          paginatedResult.Pagination = JSON.parse(response.headers.get("Pagination"));

        }
        return paginatedResult;
      })
    );
  }

getPaginationHeaders(pageNumber:number,pageSize:number){
  let params = new HttpParams(); //gives us the abilty to serilize our paramters
 //other wise we are gonna stick to default and let the server decide what it wants to 
    params = params.append("pageNumber",pageNumber.toString())
    params = params.append("pageSize",pageSize.toString())
    


return params
  
}



  GetMember(userName:string){
    const member = [...this.memberCache.values()]
     .reduce((arr,elem)=> arr.concat(elem.result),[]) 
     .find((member:Member)=>member.userName === userName)
     if (member) {
      return of(member)
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
