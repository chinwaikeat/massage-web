import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../views/login/login.component';


const routes: Routes = [
  {   
    path: 'login',
    component: LoginComponent,
  },
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes),
  ],
})
export class LoginModule { }
