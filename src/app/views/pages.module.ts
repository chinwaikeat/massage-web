import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ThemeModule } from "../@theme/theme.module";
import { LoginComponent } from './login/login.component';
import { MatModule } from '../material-module/mat.module';
import { DashboardComponent } from './dashboard/dashboard.component';


const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
];

@NgModule({
  declarations: [LoginComponent, DashboardComponent],
  imports: [
    RouterModule.forChild(routes),
    ThemeModule,
    MatModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PagesModule { }
