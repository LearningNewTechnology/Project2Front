import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import {HomeComponent} from './home/home.component';
import {EditUserComponent} from './edit-user/edit-user.component';
import { AuthguardService } from './services/authguard.service';
import { ViewInfoComponent } from './view-info/view-info.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'login'},
  {path: 'login', component:LoginComponent},
  {path: 'register', component:RegisterComponent},
  {path: 'editUser', component:EditUserComponent},

  {path: 'home', component:HomeComponent, canActivate: [AuthguardService]},
  {path: 'view-info', component:ViewInfoComponent},
  {path: '**', redirectTo: 'login'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
