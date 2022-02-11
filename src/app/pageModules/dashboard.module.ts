import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../services/authGuard/auth.guard';
import { HomeComponent } from '../views/home/home.component';
import { UserListComponent } from '../views/userManagement/user-list/user-list.component';
import { AddUserComponent } from '../views/userManagement/add-user/add-user.component';
import { DashboardComponent } from '../views/dashboard/dashboard.component';
import {RatingComponent} from '../views/rating/rating/rating.component';
import {MassageSettingListComponent} from '../views/massageManagement/massage-setting-list/massage-setting-list.component';
import {EditOrAddMassageSettingComponent} from '../views/massageManagement/edit-or-add-massage-setting/edit-or-add-massage-setting.component';


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
        path: "rating",
        component: RatingComponent
      },
      {
        path: "massageSetting",
        component: MassageSettingListComponent
      },
      {
        path: "addMassageSetting",
        component: EditOrAddMassageSettingComponent
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
