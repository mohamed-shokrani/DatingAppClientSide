import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TestErrorsComponent } from './Errors/test-errors/test-errors.component';
import { HomeComponent } from './home/home.component';
import { ListsComponent } from './lists/lists.component';
import { MainlayoutComponent } from './mainlayout/mainlayout.component';
import { MemberDetailsComponent } from './member-details/member-details.component';
import { MemberListComponent } from './member-list/member-list.component';
import { MessagesComponent } from './messages/messages.component';
import { NavComponent } from './nav/nav.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { RegisterComponent } from './register/register.component';
import { ServerErrorComponent } from './server-error/server-error.component';
import { AuthGuard } from './_guards/auth.guard';

// const routes: Routes = [
//   {
//     path: '', component: HomeComponent, children: [
//     //  { path: 'home', component: HomeComponent },
//       {
//         path: '',
//         runGuardsAndResolvers: 'always',
//         canActivate: [AuthGuard],
//         children: [
    
    
//           { path: 'members/:id', component: MemberDetailsComponent },
//           { path: 'lists', component: ListsComponent },
//           { path: 'messages', component: MessagesComponent },
//           { path: 'members', component: MemberListComponent, canActivate: [AuthGuard] },
    
//        ]
    
//      },

//     ]
//   },
  


//   { path: 'register', component: RegisterComponent },


//   { path: '**', component: HomeComponent, pathMatch: 'full' }

// ];
const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'home', component: HomeComponent},

  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      {path: 'members', component: MemberListComponent},
   //   {path: 'members/:username', component:MemberDetailsComponent, },
      {path: 'lists', component: ListsComponent},
      {path: 'messages', component: MessagesComponent},
    ]
  },
  {path:"error",component:TestErrorsComponent},
  {path: 'register', component:RegisterComponent},
  {path:'not-found',component:NotFoundComponent},
  {path:'server-error',component:ServerErrorComponent},

  // {path: 'not-found', component: NotFoundComponent},
  // {path: 'server-error', component: ServerErrorComponent},
  // {path: '**', component: NotFoundComponent, pathMatch: 'full'},
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
