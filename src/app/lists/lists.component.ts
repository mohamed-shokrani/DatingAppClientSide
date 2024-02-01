import { Component, OnInit } from '@angular/core';
import { Member } from '../_Models/memebr';
import { MembersService } from '../_services/members.service';
import { Pagination } from '../_Models/pagination';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css']
})
export class ListsComponent implements OnInit {
  members: Member[] = []; // Update the type to Member[]
   predicate="liked";
   pageNumber=1;
   pageSize =2;
   pagination:Pagination;
  constructor(private memberService:MembersService) { }
 loadLikes(){
  this.memberService.getLikes(this.predicate,this.pageNumber,this.pageSize).subscribe(res=>
    {this.members = res.result
     this.pagination =res.Pagination})
 }
  ngOnInit(): void {
  }
  pageChanged(e :any){
    this.pageNumber =e.page;
    this.loadLikes();
  }

}
