import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-server-error',
  templateUrl: './server-error.component.html',
  styleUrls: ['./server-error.component.css']
})
export class ServerErrorComponent implements OnInit {
error:any;
  constructor(private router:Router ) {
    //there is one thing that we can get hold of the router state that's inside constructor 
    //we can not access oninit we can only access the state inside the constuctor 
    const Navigation = router.getCurrentNavigation();
    this.error = Navigation?.extras?.state?.error;
    

   }

  ngOnInit(): void {
  }

}
