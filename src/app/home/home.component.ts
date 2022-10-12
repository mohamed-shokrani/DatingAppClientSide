import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  registerMode:boolean =false;
  users:any={}
  //openRegister:boolean =false;

  constructor(private loc:Location) { }

  ngOnInit(): void {
   // this.getUsers()
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
