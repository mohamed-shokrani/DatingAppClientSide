import { ToastrModule } from 'ngx-toastr';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http'
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { MainBodyComponent } from './main-body/main-body.component';
import { SharedModule } from './_modules/shared.module';
import { TestErrorsComponent } from './Errors/test-errors/test-errors.component';
import { ErrorInterceptor } from './_interceptors/error.interceptor';
import { ServerErrorComponent } from './server-error/server-error.component';
import { MemberCardComponent } from './member-list/member-card/member-card.component';
import { EditmemberComponent } from './editmember/editmember.component';
import { NgxSpinnerModule } from "ngx-spinner";
import { LoadingInterceptor } from './_interceptors/loading.interceptor';
import { EditMemberPhotoComponent } from './editmember/edit-member-photo/edit-member-photo.component';
import { TextInputComponent } from './_forms/text-input/text-input.component';
import { DateInputComponent } from './_forms/date-input/date-input.component';
import { AuthInterceptor, AuthInterceptorProvider } from './_interceptors/auth.interceptor';
import { MemberMessagesComponent } from './member-list/member-messages/member-messages.component';

//import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';



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
    MainBodyComponent,
    TestErrorsComponent,
    ServerErrorComponent,
    MemberCardComponent,
    EditmemberComponent,
    EditMemberPhotoComponent,
    TextInputComponent,
    DateInputComponent,
    MemberMessagesComponent,
    
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
    
    NgxSpinnerModule  
  ],
  providers: [
    [AuthInterceptorProvider],
    {provide:HTTP_INTERCEPTORS,useClass:ErrorInterceptor,multi:true},
    {provide:HTTP_INTERCEPTORS,useClass:LoadingInterceptor,multi:true},
    {provide:HTTP_INTERCEPTORS,useClass:AuthInterceptor,multi:true},

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
