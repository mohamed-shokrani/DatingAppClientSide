import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs';
import { Member } from '../_Models/memebr';
import { User } from '../_Models/user';
import { AccountService } from '../_services/account.service';
import { MembersService } from '../_services/members.service';


@Component({
  selector: 'app-editmember',
  templateUrl: './editmember.component.html',
  styleUrls: ['./editmember.component.css']
})
export class EditmemberComponent implements OnInit {
  @ViewChild('editform') edidtForm:NgForm;
  @HostListener ('window:beforeunload',['$event'])unloadNotification($event:any){
    if(this.edidtForm.dirty){
      $event.returnValue=true;
    }
  }

  member:Member;
  user:User;
  constructor(private AcoountSevice:AccountService,private MemberService:MembersService,private route:ActivatedRoute
    ,private Tostr:ToastrService) {

    this.AcoountSevice.CurrentUser$.pipe(take(1)).subscribe(user=> this.user = user)

   }
                        
   ngOnInit(): void {
    this.loadMember()

  }

  loadMember() {
    this.MemberService.GetMember(this.user.userName).subscribe(Omember => {
      this.member = Omember;
 
    })
  }
  updateMember(){
   this.MemberService.updateMember(this.member).subscribe(()=>{
     //to reset save button to be disabled again so the user can not submit it multiple times 
     this.Tostr.success("Profile Updated Successfully")
     this.edidtForm.reset(this.member)
 
  //  })
   //console.log(this.member);
   
   
  })

  }}
