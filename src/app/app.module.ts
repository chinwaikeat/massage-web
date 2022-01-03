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



@NgModule({
  declarations: [
    AppComponent,
    SpinnerComponent,
    LoginComponent,
    HomeComponent,
    DashboardComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    ThemeModule.forRoot(),
    BrowserAnimationsModule,
    MatModule,
  ],
  exports: [
    LoginComponent, 
    HomeComponent,
    DashboardComponent,],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    CookieService,
    SpinnerService, 
    LayoutService],
  bootstrap: [AppComponent]
})
export class AppModule { }
