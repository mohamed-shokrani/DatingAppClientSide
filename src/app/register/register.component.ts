import { Location } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  maxDate:Date;
  showDat:number;
  ValidationError:string[]=[];

  @Output() CancelRegister = new EventEmitter();
  model:any ={};
  registerForm:FormGroup;


  constructor(private accountService:AccountService
    ,private toastr:ToastrService ,private fb:FormBuilder,public router:Router) { }
    

  ngOnInit(): void {
this.IntializeForm();
this.maxDate =new Date();
this.maxDate.setFullYear(  this.maxDate.getFullYear() -18);
  }
  IntializeForm(){
    this.registerForm = this.fb.group({
      gender:['male'],
      username :['',Validators.required],
      DateOfBirth :['',Validators.required],
      KnownAs :['',Validators.required],
      City :['',Validators.required],
      Country :['',Validators.required],
      Password: ['',[Validators.required,Validators.minLength(4),Validators.maxLength(20)]],
      confirmPassowrd: ['',[Validators.required, this.MatchValues('MyPass')]]
      // but there is a problem her if you changed the password after you validated the confirm password
      // what you will find you that it does not validate 
    });
    this.registerForm.controls.MyPass.valueChanges.subscribe(()=>{
      this.registerForm.controls.confirmPassowrd.updateValueAndValidity();
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

    
    this.accountService.Register(this.registerForm.value).subscribe(res=>{
      console.log(res);
      this.router.navigateByUrl('/members')

     // this.router.navigate(['/Members'])
      
      
    },error=>{
      console.log(error);
      this.ValidationError =error;

      
    })

    
  // }
  // Cancel(){
  //   this.CancelRegister.emit(false);
  }


}
