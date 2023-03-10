import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Member } from '../_Models/memebr';
import { Pagination } from '../_Models/pagination';
import { MembersService } from '../_services/members.service';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {
  //members$:Observable<Member[]>;
  members:Member[]=[]
  Pagination:Pagination;
  pageNumber= 1;
  pageSize=5;
  constructor(private memberService:MembersService) { }

  ngOnInit(): void {
   //   this.members$ = this.memberService.GetMembers();
  this. loadmembers()
  }
  loadmembers(){
    this.memberService.GetMembers(this.pageNumber,this.pageSize).subscribe(resonse=>{
       this.members=resonse.result;
       this.Pagination= resonse.Pagination
    })
  }
}
