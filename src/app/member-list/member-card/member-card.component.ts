import { Component, OnInit,Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Member } from 'src/app/_Models/memebr';
import { MembersService } from 'src/app/_services/members.service';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.css']
})
export class MemberCardComponent implements OnInit {
  @Input() getMembers:Member;
  constructor(private memberService:MembersService,private toastr:ToastrService) { }
addLike(member:Member){
 this.memberService.addLikes(member.userName).subscribe(()=>this.toastr.success('you have liked the user'+member.knownAs))
}
  ngOnInit(): void {
    
  }

}
