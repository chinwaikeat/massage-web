import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../services/authGuard/auth.guard';
import { HomeComponent } from '../views/home/home.component';
import { DashboardComponent } from '../views/dashboard/dashboard.component';
import {  CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';


const routes: Routes = [
  {
    path: "",
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: "home",
        component: HomeComponent
      },
    ]
  }
];


@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  declarations: [],
})
export class DashboardModule {
}
