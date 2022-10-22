import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IUser } from '../_Models/user';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  users: any = {}
  model: any = {};
  LoggedIn: boolean;

  constructor(public accountService: AccountService, private http: HttpClient, private router: Router
    , private toastr: ToastrService) {

  }

  ngOnInit(): void {


this.setCurrenUser();
  }
  login() {
    this.accountService.login(this.model).subscribe(res => {

    this.router.navigateByUrl('/members');

    // }, error => {
    //  // console.log(error);
    //   this.toastr.error(error.error);

    // })
    })}
  setCurrenUser(){
    const user:IUser = JSON.parse(localStorage.getItem('user'))
    this.accountService.setCurrentUser(user)
  }
  LoggedOut() {
    this.accountService.logOut();
  }
}
