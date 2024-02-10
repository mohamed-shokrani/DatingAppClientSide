import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { getPaginatedResult, getPaginationHeaders } from './PaginationHelper';
import { Message } from '../_Models/Message';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
 baseUrl =environment.apiUrl;
  constructor(private http:HttpClient) { }

   getMessages(pageNumber,pageSize,container){
    let params = getPaginationHeaders(pageNumber,pageSize);
   params= params.append('container',container);
    return getPaginatedResult<Message[]>(this.baseUrl+'messages',params,this.http);

   }
}
