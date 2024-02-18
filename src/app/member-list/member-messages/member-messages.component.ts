import { Component, Input } from '@angular/core';
import { Message } from 'src/app/_Models/Message';
import { MessageService } from 'src/app/_services/message.service';

@Component({
  selector: 'app-member-messages',
  templateUrl: './member-messages.component.html',
  styleUrls: ['./member-messages.component.css']
})
export class MemberMessagesComponent {
 @Input()userName :string;
 messages:Message[];
 /**
  *
  */
 constructor(private messageService:MessageService) {
  
  
 }
 ngOnInit(): void {
  //   this.members$ = this.memberService.GetMembers();
 this.loadMessage();

 
 }
 loadMessage(){

 this.messageService.getMessageThread(this.userName).subscribe(message=>
  this.messages =message)
 }
}
