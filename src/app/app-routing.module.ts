import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import {HomeComponent} from './home/home.component';
import {EditUserComponent} from './edit-user/edit-user.component';
import { AuthguardService } from './services/authguard.service';
import { ViewInfoComponent } from './view-info/view-info.component';
import { ViewSearchResultComponent } from './view-search-result/view-search-result.component';
import { ResetComponent } from './reset/reset.component';
import { PostComponent } from './post/post.component'

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'login'},
  {path: 'login', component:LoginComponent},
  {path: 'register', component:RegisterComponent},
  {path: 'editUser', component:EditUserComponent},
  {path: 'viewSearchResult', component:ViewSearchResultComponent},
  {path: 'home', component:HomeComponent, canActivate: [AuthguardService]},
  {path: 'viewInfo', component:ViewInfoComponent},
  {path: 'reset', component:ResetComponent},
  {path: 'post', component:PostComponent},
  {path: '**', redirectTo: 'login'}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
