import { BrowserModule } from '@angular/platform-browser';
import { NgModule , CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ThemeModule } from './@theme/theme.module';
//services
import { SpinnerService } from './services/spinnerService/spinner.service';
import { LayoutService } from './services/layoutService/layout.service';
import { CookieService } from "ngx-cookie-service";
//mat modules
import { MatModule } from './material-module/mat.module';
//components
import { LoginComponent } from './views/login/login.component';
import { HomeComponent } from './views/home/home.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { SpinnerComponent } from './components/loading-spinner/spinner/spinner.component';
import { AddUserComponent } from './views/userManagement/add-user/add-user.component';
import { UserListComponent } from './views/userManagement/user-list/user-list.component';
import { EditOrViewUserComponent } from './views/userManagement/edit-or-view-user/edit-or-view-user.component';
import { SatDatepickerModule, SatNativeDateModule, DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from 'saturn-datepicker';
import { ModalModule } from './@theme/components/modal/modal.module';
import { RatingComponent } from './views/rating/rating/rating.component';
import { ViewRatingComponent } from './views/rating/view-rating/view-rating.component';
import { MassageSettingListComponent } from './views/massageManagement/massage-setting-list/massage-setting-list.component';
import { ViewOrEditMassageSettingComponent } from './views/massageManagement/view-or-edit-massage-setting/view-or-edit-massage-setting.component';
import { AddMassageSettingComponent } from './views/massageManagement/add-massage-setting/add-massage-setting.component';
import { ChartModule} from 'angular-highcharts';




@NgModule({
  declarations: [
    AppComponent,
    SpinnerComponent,
    LoginComponent,
    HomeComponent,
    DashboardComponent,
    AddUserComponent,
    UserListComponent,
    EditOrViewUserComponent,
    RatingComponent,
    ViewRatingComponent,
    MassageSettingListComponent,
    ViewOrEditMassageSettingComponent,
    AddMassageSettingComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    ThemeModule.forRoot(),
    BrowserAnimationsModule,
    MatModule,
    SatDatepickerModule, 
    SatNativeDateModule,
    ModalModule,
    ChartModule
  ],
  exports: [
    SatDatepickerModule, 
    SatNativeDateModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    CookieService,
    SpinnerService, 
    LayoutService,
   ],
  bootstrap: [AppComponent]
})
export class AppModule { }
