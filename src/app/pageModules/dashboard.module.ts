import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../services/authGuard/auth.guard';
import { HomeComponent } from '../views/home/home.component';
import { UserListComponent } from '../views/userManagement/user-list/user-list.component';
import { EditOrViewUserComponent } from '../views/userManagement/edit-or-view-user/edit-or-view-user.component';
import { AddUserComponent } from '../views/userManagement/add-user/add-user.component';
import { DashboardComponent } from '../views/dashboard/dashboard.component';
import {MatModule} from '../material-module/mat.module';


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
      {
        path: "user",
        component: UserListComponent
      },
      {
        path: "add",
        component: AddUserComponent
      },
      {
        path: "edit",
        component: EditOrViewUserComponent
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
