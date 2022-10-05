import { Location } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Output() CancelRegister = new EventEmitter();
  model:any ={}

  constructor(private loc:Location,private accountService:AccountService) { }

  ngOnInit(): void {
  }
  Register(){
    this.accountService.Register(this.model).subscribe(res=>{
      console.log(res);
      
      
    },error=>{
      console.log(error);
      
    })

    
  }
  Cancel(){
    this.CancelRegister.emit(false);
  }


}
