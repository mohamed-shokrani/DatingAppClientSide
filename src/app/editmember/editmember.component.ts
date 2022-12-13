import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { Member } from '../_Models/memebr';
import { IUser } from '../_Models/user';
import { AccountService } from '../_services/account.service';
import { MembersService } from '../_services/members.service';

@Component({
  selector: 'app-editmember',
  templateUrl: './editmember.component.html',
  styleUrls: ['./editmember.component.css']
})
export class EditmemberComponent implements OnInit {

  Member:Member;
  user:IUser;
  constructor(private AcoountSevice:AccountService,private MemberService:MembersService) {

    this.AcoountSevice.CurrentUser$.pipe(take(1)).subscribe(user=> this.user = user)

   }
                        
  ngOnInit(): void {
    this.loadMember()
  }
  loadMember(){
    this.MemberService.GetMember(this.user.username).
    subscribe(member =>this.Member= member)
  }
   

}
