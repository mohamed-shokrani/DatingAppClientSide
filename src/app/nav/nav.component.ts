import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  users:any ={}
  model: any = {};
  LoggedIn:boolean;

  constructor(public accountService:AccountService,private http:HttpClient) { 
  
  }

  ngOnInit(): void {
   


  }
  login(){
    this.accountService.login(this.model).subscribe(res=>{
       console.log(res);
      
       this.LoggedIn =true
      
    },error=>{
       console.log(error);
       
    })
    
    
  }
  LoggedOut(){
    this.accountService.logOut();


  }



}
