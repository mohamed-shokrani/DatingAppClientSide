import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from '../_Models/user';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-mainlayout',
  templateUrl: './mainlayout.component.html',
  styleUrls: ['./mainlayout.component.css']
})
export class MainlayoutComponent implements OnInit {

  constructor(private http:HttpClient,private accoutnService:AccountService) { }

  ngOnInit(): void {
    this.setCurrentUser()
  }
  setCurrentUser(){
   const user :User =JSON.parse(localStorage.getItem('user'));
   this.accoutnService.setCurrentUser(user); 
  }

}
