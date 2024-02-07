import { map } from "rxjs";
import { PaginatedResult } from "../_Models/pagination";
import { HttpClient, HttpParams } from "@angular/common/http";

export function getPaginationHeaders(pageNumber:number,pageSize:number){
    let params = new HttpParams(); //gives us the abilty to serilize our paramters
   //other wise we are gonna stick to default and let the server decide what it wants to 
      params = params.append("pageNumber",pageNumber.toString())
      params = params.append("pageSize",pageSize.toString())
      
  
  
  return params
    
  }
  export function getPaginatedResult<T>(url,params,http:HttpClient) {
    const paginatedResult:PaginatedResult<T> = new PaginatedResult<T>()

    return http.get<T>(url , { observe: 'response', params }).pipe(
      map(response => {
        paginatedResult.result = response.body; //our members array is gonna be contained inside here
        if (response.headers.get("Pagination") !== null) {
          paginatedResult.Pagination = JSON.parse(response.headers.get("Pagination"));

        }
        return paginatedResult;
      })
    );
  }