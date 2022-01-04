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
    ModalModule
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
