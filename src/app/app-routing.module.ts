import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CooksComponent } from './component/cooks/cooks.component';
import { HomepageComponent } from './component/homepage/homepage.component';
import { ReservationComponent } from './component/reservation/reservation.component';
import { SigninComponent } from './connection/signin/signin.component';
import { SignoutComponent } from './connection/signout/signout.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: HomepageComponent },
  { path: 'home', pathMatch: 'full', component: HomepageComponent },
  { path: 'reservation', component: ReservationComponent },
  { path: 'cooks', component: CooksComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'logout', component: SignoutComponent },
  { path: '**', redirectTo: '' }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
