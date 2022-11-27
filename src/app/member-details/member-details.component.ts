import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Member } from '../_Models/memebr';
import { MembersService } from '../_services/members.service';

@Component({
  selector: 'app-member-details',
  templateUrl: './member-details.component.html',
  styleUrls: ['./member-details.component.css']
})
export class MemberDetailsComponent implements OnInit {
  member:Member
  constructor(private memberService:MembersService,private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.getMemberDetailsByname()
  }

  getMemberDetailsByname(){
    this.memberService.GetMember(this.route.snapshot.paramMap.get('username')).subscribe(member=>{
      this.member = member
    })
  }

}
