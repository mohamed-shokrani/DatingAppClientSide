import { Component, OnInit } from '@angular/core';
import { Member } from '../_Models/memebr';
import { Pagination } from '../_Models/pagination';
import { MembersService } from '../_services/members.service';
import { UserParams } from '../_modules/UserParams';
import { User } from '../_Models/user';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {
  members:Member[]=[]
  pagination:Pagination;
  pageNumber= 1;
  pageSize=5;
  userParams:UserParams;
  genderList =[{value:'male',display:'males'},{value:'female',display:'females'}]
  
  user:User;
  constructor(private memberService:MembersService) { 
     this.userParams = this.memberService.getUserPramas();
   
  }
resetFilters(){
  this.userParams = this.memberService.resetUserParams();
  this.loadmembers();
}
  ngOnInit(): void {
   //   this.members$ = this.memberService.GetMembers();
  this. loadmembers()
  }
  loadmembers(){
    this.memberService.setUserParams(this.userParams);

    this.memberService.GetMembers(this.userParams).subscribe(response=>{
       this.members=response.result;

       console.log("response result" + this.members);
       
       this.pagination = response.Pagination
      
    })
  }
  pageChanged(event:any){
         this.userParams.pageNumber =event.page;
          this.memberService.setUserParams(this.userParams);   
         this.loadmembers(); 
         
  }
}
