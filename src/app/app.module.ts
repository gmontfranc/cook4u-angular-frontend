import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './utils/navbar/navbar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgbCarouselConfig, NgbCarouselModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
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
import { JwtHelperService, JWT_OPTIONS  } from '@auth0/angular-jwt';
import { CookReservationComponent } from './component/reservations/cook-reservation/cook-reservation.component';
import { UserReservationComponent } from './component/reservations/user-reservation/user-reservation.component';
import {MatTableModule} from '@angular/material/table';
import { CreateMenuComponent } from './component/menus/create-menu/create-menu.component';
import { ListMenusComponent } from './component/menus/list-menus/list-menus.component';
import { CreateDishComponent } from './component/dishes/create-dish/create-dish.component';
import { RouterModule } from '@angular/router';



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
    UserReservationComponent,
    CreateMenuComponent,
    ListMenusComponent,
    CreateDishComponent  
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
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    MatTableModule,
    MatProgressSpinnerModule,
    NgbCarouselModule
  ],
  providers: [NgbCarouselConfig, AuthService, HttpClient, {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  },
  { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
  JwtHelperService,
  MatDatepickerModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
