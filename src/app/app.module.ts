import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http'
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { NotFoundComponent } from './not-found/not-found.component';
import { MainlayoutComponent } from './mainlayout/mainlayout.component';
import { NavComponent } from './nav/nav.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { MemberListComponent } from './member-list/member-list.component';
import { MemberDetailsComponent } from './member-details/member-details.component';
import { MessagesComponent } from './messages/messages.component';
import { ListsComponent } from './lists/lists.component';




@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    MainlayoutComponent,
    NavComponent,
    HomeComponent,
    RegisterComponent,
    MemberListComponent,
    MemberDetailsComponent,
    MessagesComponent,
    ListsComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    BsDropdownModule.forRoot(),
    
    

    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
