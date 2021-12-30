import { BrowserModule } from '@angular/platform-browser';
import { NgModule , CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { NbThemeModule } from '@nebular/theme';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SpinnerComponent } from './components/loading-spinner/spinner/spinner.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ThemeModule } from './@theme/theme.module';
import { SpinnerService } from './services/spinnerService/spinner.service';
import { CookieService } from "ngx-cookie-service";


@NgModule({
  declarations: [
    AppComponent,
    SpinnerComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    ThemeModule.forRoot(),
    BrowserAnimationsModule,
  ],
  
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [CookieService,SpinnerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
