import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { EditmemberComponent } from '../editmember/editmember.component';

@Injectable({
  providedIn: 'root'
})
export class PreventUnsavedChangesGuard implements CanDeactivate<unknown> {
  canDeactivate
    (component: EditmemberComponent): Observable<boolean> | boolean{
      if(component.edidtForm?.dirty){
        //isLoginSubject = new BehaviorSubject<boolean>(this.hasToken());
        return confirm("Are you sure you want to continue? any unsaved changes will be discarded")
      }
    return true;
  }

}
