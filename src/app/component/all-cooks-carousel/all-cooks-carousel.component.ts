import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { isUser, User } from 'src/app/model/user';
import { CookService } from 'src/app/service/cook-services/cook.service';

@Component({
  selector: 'app-all-cooks-carousel',
  templateUrl: './all-cooks-carousel.component.html',
  styleUrls: ['./all-cooks-carousel.component.scss'],
})
export class AllCooksCarouselComponent implements OnInit {

  constructor(private cookService: CookService, private router: Router, public auth: AuthService){}

  
  cooks?: User[]
  
  
  ngOnInit() {
    this.cookService.getAllCooks().subscribe({
      next: (data) => {     
        this.cooks = data.slice(1, 5);
      }
    });
  } 

  goToReservation(id: number) {
    let url = "reservation/" +id ;
    this.router.navigate(['reservation', { id: id }]);
  }
}
