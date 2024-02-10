import { Component, OnInit } from '@angular/core';
import { Message } from '../_Models/Message';
import { Pagination } from '../_Models/pagination';
import { MessageService } from '../_services/message.service';
import { tick } from '@angular/core/testing';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  messages:Message[];
  pagination:Pagination;
  container  : string ="Inbox";
  pageNumber =1;
  pageSize=5;


  constructor(private messageService:MessageService) { }

  ngOnInit(): void {
    this.loadMessages();
  }
  loadMessages(){
    this.messageService.getMessages(this.pageNumber,this.pageSize,this.container)
    .subscribe(res=>{
      this.messages = res.result;
      this.pagination =res.Pagination;
    })
    console.log(this.messages);
    
  }
  pageChange(event:any){
    if ( this.pageNumber !==event.page) {
      this.loadMessages();

    }
   
  }

}
