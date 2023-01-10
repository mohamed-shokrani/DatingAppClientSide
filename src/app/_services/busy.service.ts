import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class BusyService {
  busyRequestCount =0;

  constructor(private spinnerServices:NgxSpinnerService) { }
busy(){
  this.busyRequestCount++;
  this.spinnerServices.show(undefined,{
    bdColor:"grey",
    size:"large",
    color:"#fff",
    type:"ball-scale-multiple",

   
  })
 }
 idle(){
  this.busyRequestCount--;
  if (this.busyRequestCount <= 0) {
    this.busyRequestCount =0;
    this.spinnerServices.hide()
    
  }
 }

}
