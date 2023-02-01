import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './utils/navbar/navbar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomepageComponent } from './component/homepage/homepage.component';
import { SigninComponent } from './connection/signin/signin.component';
import { SignoutComponent } from './connection/signout/signout.component';
import { SignupComponent } from './connection/signup/signup.component';
import { ReservationComponent } from './component/reservation/reservation.component';
import { CooksComponent } from './component/cooks/cooks.component'; 
import { AuthService } from './auth/auth.service';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth/auth.interceptor';
import { AllCooksCarouselComponent } from 'src/app/component/all-cooks-carousel/all-cooks-carousel.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { SlickCarouselComponent } from 'ngx-slick-carousel';
import { JwtHelperService, JWT_OPTIONS  } from '@auth0/angular-jwt';
import { CookReservationComponent } from './component/reservations/cook-reservation/cook-reservation.component';
import { UserReservationComponent } from './component/reservations/user-reservation/user-reservation.component';




@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomepageComponent,
    SigninComponent,
    SignoutComponent,
    SignupComponent,
    ReservationComponent,
    CooksComponent,
    AllCooksCarouselComponent,
    CookReservationComponent,
    UserReservationComponent  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    NgbModule,
    FormsModule,
    HttpClientModule, 
    MatButtonModule,
    SlickCarouselModule
  ],
  providers: [AuthService, HttpClient, {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  },
  { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
  JwtHelperService],
  bootstrap: [AppComponent]
})
export class AppModule { }
