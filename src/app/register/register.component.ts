import { Location } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
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
  model:any ={};
  registerForm:FormGroup;


  constructor(public route:Router,private accountService:AccountService
    ,private toastr:ToastrService) { }

  ngOnInit(): void {
this.IntializeForm();
  }
  IntializeForm(){
    this.registerForm = new FormGroup({
      userName :new FormControl('',Validators.required),
      Password: new FormControl('',[Validators.required,Validators.minLength(4),Validators.maxLength(20)]),
      ConfirmPassowrd: new FormControl('',[Validators.required, this.MatchValues('Password')])
      // but there is a problem her if you changed the password after you validated the confirm password
      // what you will find you that it does not validate 
    });
    this.registerForm.controls.Password.valueChanges.subscribe(()=>{
      this.registerForm.controls.ConfirmPassowrd.updateValueAndValidity();
      //when our passord changes we are going to update the validty of that field against  password 
    })

  }
  MatchValues(MatchTo: string){
    return (control:AbstractControl) =>{//all of our form controls drived from an abstract control 
        return control?.value === control?.parent?.controls[MatchTo].value
          ? null : {IsMatching :true}
              // control?.value -> is the password control we are going to compare this to whatever we pass into the match to 
              // amd we are going to match the password 
    }
  }
  Register(){
    
    console.log(this.registerForm.value);

    
  //   this.accountService.Register(this.model).subscribe(res=>{
  //     console.log(res);
  //     this.route.navigate(['/home'])
      
      
  //   },error=>{
  //     console.log(error);
  //     this.toastr.error(error.error);

      
  //   })

    
  // }
  // Cancel(){
  //   this.CancelRegister.emit(false);
  }


}
