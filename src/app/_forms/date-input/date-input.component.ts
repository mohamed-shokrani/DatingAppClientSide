import { Component, Input, Self } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';

@Component({
  selector: 'app-date-input',
  templateUrl: './date-input.component.html',
  styleUrls: ['./date-input.component.css']
})
export class DateInputComponent implements ControlValueAccessor {
  @Input() label:string;
  @Input() MaxDate:string;
  bsConfig:Partial<BsDatepickerConfig>; //what we are saying that everysingle proberty inside this type (BsDatepickerConfig)
  //is going to be optional 
   /**
    *
    */
   constructor( @Self() public ngControl:NgControl) {
     this.ngControl.valueAccessor = this;
     this.bsConfig ={
      containerClass:'theme-green',
      dateInputFormat:'DD MMMM YYYY'
     }
    
   }
  writeValue(obj: any): void {
  }
  registerOnChange(fn: any): void {
  }
  registerOnTouched(fn: any): void {
  }
  setDisabledState?(isDisabled: boolean): void {
  }


}
