import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { lastValueFrom } from 'rxjs';
import { ReservationToShow, Reserve } from 'src/app/model/reservation';
import { User } from 'src/app/model/user';
import { CookService } from 'src/app/service/cook-services/cook.service';

 @Component({
  selector: 'app-user-reservation',
  templateUrl: './user-reservation.component.html',
  styleUrls: ['./user-reservation.component.scss']
})
export class UserReservationComponent implements OnInit {

  isSingleReservation = false;
  reservationsRaw: Reserve[] = [];
  cook: User;
  reservationsToShow: ReservationToShow[] = [];
  currentReservation: ReservationToShow;

  
  displayedColumns: string[] = ['name', 'date', 'numberOfPeople', 'prixTotal'];
  dataSource = new MatTableDataSource(this.reservationsToShow);

  constructor(
    private cookService: CookService,
  ) {}

  async ngOnInit() {
    const response = await lastValueFrom(this.cookService.getAllReservationsForUser());
    
    this.reservationsRaw = response;
    for(var res of this.reservationsRaw) {
      const rspCook = await lastValueFrom(this.cookService.findCookById(res.cookId));

      let resToShow: ReservationToShow = {
        id: res.id,
        name: rspCook.name,
        menuName: '',
        numberOfPeople: res.numberOfPeople,
        date: res.date,
        address: res.address,
        state: res.state,
        phoneNumber: res.phoneNumber,
        comments: res.comments,
        starters: res.starters,
        mainDishes: res.mainDishes,
        desserts: res.desserts,
        prixTotal: res.prixTotal
      };
      this.reservationsToShow.push(resToShow);
    } 
    
    this.dataSource = new MatTableDataSource(this.reservationsToShow);
  }

  returnToTable() {
    this.isSingleReservation = false;
  }

  goToReservation(row: ReservationToShow) {
    this.currentReservation = row;

    this.isSingleReservation = true;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
