import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { IUser } from '../_Models/user';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  registerMode:boolean =false;
  users:any={}
  //openRegister:boolean =false;

  constructor(private loc:Location,public accountService:AccountService) { }

  ngOnInit(): void {
   // this.getUsers()
   //this.setCurrenUser()
  }
setCurrenUser(){
  const user:IUser = JSON.parse(localStorage.getItem('user'))
  this.accountService.setCurrentUser(user)
}
  RegisterToggle(){
    this.registerMode =!this.registerMode;
   // this.openRegister = true;
  }
  // getUsers(){
  //   this.http.get("https://localhost:5001/api/Users").subscribe(users=>this.users=users)
  //  //  console.log(this.users);
    
  // }

  CancelRegisterMode(event:boolean){
    this.registerMode = event
  }
  

}
