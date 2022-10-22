import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test-errors',
  templateUrl: './test-errors.component.html',
  styleUrls: ['./test-errors.component.css']
})
export class TestErrorsComponent implements OnInit {
  // to set it up so we can just see the responses that we get back from the server 
  // when we are implemnting our global handling solution in ng we are gonna be able to easily test these different errors 
  baseURL = 'https://localhost:5001/api/';
  ValidationError:string[]=[];
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }
  get404Error() {
    this.http.get(this.baseURL + 'buggy/not-found').subscribe(res => {
      console.log(res);
    }, error => {
      console.log(error);
    }
    )
  }

  get400Error() {
    this.http.get(this.baseURL + 'buggy/bad-request').subscribe(res => {
      console.log(res);
    }, error => {
      console.log(error);
    }
    )
  }

  get500Error() {
    this.http.get(this.baseURL + 'buggy/server-error').subscribe(res => {
      console.log(res);
    }, error => {
      console.log(error);
    }
    )
  }

  get400ValidationError() {
    this.http.post(this.baseURL + 'account/register/',{}).subscribe(res => {
      console.log(res);
    }, error => {
      this.ValidationError= error;
      
      console.log(error);
    }
    )
  }

  get401Error() {
    this.http.get(this.baseURL + 'buggy/auth').subscribe(res => {
      console.log(res);
    }, error => {
      console.log(error);
    }
    )
  }
}
