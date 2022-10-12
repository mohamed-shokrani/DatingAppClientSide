import { Location } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Route, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Output() CancelRegister = new EventEmitter();
  model:any ={}

  constructor(public route:Router,private accountService:AccountService
    ,private toastr:ToastrService) { }

  ngOnInit(): void {
  }
  Register(){
    this.accountService.Register(this.model).subscribe(res=>{
      console.log(res);
      this.route.navigate(['/home'])
      
      
    },error=>{
      console.log(error);
      this.toastr.error(error.error);

      
    })

    
  }
  Cancel(){
    this.CancelRegister.emit(false);
  }


}
