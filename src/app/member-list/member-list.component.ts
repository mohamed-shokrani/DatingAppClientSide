import { Component, OnInit } from '@angular/core';
import { Observable, take } from 'rxjs';
import { Member } from '../_Models/memebr';
import { Pagination } from '../_Models/pagination';
import { MembersService } from '../_services/members.service';
import { UserParams } from '../_modules/UserParams';
import { User } from '../_Models/user';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {
  //members$:Observable<Member[]>;
  members:Member[]=[]
  pagination:Pagination;
  pageNumber= 1;
  pageSize=5;
  userParams:UserParams;
  genderList =[{value:'male',display:'males'},{value:'female',display:'females'}]
  
  user:User;
  constructor(private memberService:MembersService,private accoutService :AccountService) { 
    this.accoutService.CurrentUser$.pipe(take(1)).subscribe(user=>
      {
        this.user = user;
        this.userParams = new UserParams(this.user);
        
        
      })
  
  }
resetFilters(){
  this.userParams = new UserParams(this.user)//
  this.loadmembers();
}
  ngOnInit(): void {
   //   this.members$ = this.memberService.GetMembers();
  this. loadmembers()
  }
  loadmembers(){
    this.memberService.GetMembers(this.userParams).subscribe(response=>{
       this.members=response.result;

       console.log("response result" + this.members);
       
       this.pagination = response.Pagination
       console.log(this.userParams);
    })
  }
  pageChanged(event:any){
         this.pageNumber =event.page;
         this.loadmembers(); 
  }
}
