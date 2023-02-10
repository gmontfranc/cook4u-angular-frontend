import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CooksComponent } from './component/cooks/cooks.component';
import { HomepageComponent } from './component/homepage/homepage.component';
import { ReservationComponent } from './component/reservation/reservation.component';
import { CookReservationComponent } from './component/reservations/cook-reservation/cook-reservation.component';
import { UserReservationComponent } from './component/reservations/user-reservation/user-reservation.component';
import { SigninComponent } from './connection/signin/signin.component';
import { SignoutComponent } from './connection/signout/signout.component';
import { SignupComponent } from './connection/signup/signup.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: HomepageComponent },
  { path: 'cook/reservations', component: CookReservationComponent },
  { path: 'user/reservations', component: UserReservationComponent },
  { path: 'reservation', component: ReservationComponent },
  { path: 'cooks', component: CooksComponent },
  { path: 'cook/:id/reservation', component: ReservationComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'logout', component: SignoutComponent },
  { path: '**', redirectTo: '' }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
