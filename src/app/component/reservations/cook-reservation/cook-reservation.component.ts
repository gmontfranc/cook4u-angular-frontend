import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { lastValueFrom } from 'rxjs';
import { ReservationState, ReservationToShow, Reserve } from 'src/app/model/reservation';
import { User } from 'src/app/model/user';
import { CookService } from 'src/app/service/cook-services/cook.service';

@Component({
  selector: 'app-cook-reservation',
  templateUrl: './cook-reservation.component.html',
  styleUrls: ['./cook-reservation.component.scss']
})
export class CookReservationComponent implements OnInit{

  isSingleReservation = false;
  reservationsRaw: Reserve[] = [];
  cook: User;
  reservationsToShow: ReservationToShow[] = [];
  currentReservation: ReservationToShow;

  isSubmitted = false;
  isInProgress = false;
  isTerminated = false;

  updateMessage = '';
  
  displayedColumns: string[] = ['name', 'date', 'numberOfPeople', 'prixTotal', 'state'];
  dataSource = new MatTableDataSource(this.reservationsToShow);

  constructor(
    private cookService: CookService,
  ) {}

  async ngOnInit() {
    const response = await lastValueFrom(this.cookService.getAllReservationsForUser());
    
    this.reservationsRaw = response;
    for(var res of this.reservationsRaw) {
      const rspUser = await lastValueFrom(this.cookService.findUserById(res.cookId));


      let resToShow: ReservationToShow = {
        id: res.id,
        name: rspUser.name,
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

      console.log(resToShow);
      this.reservationsToShow.push(resToShow);
    } 
    
    this.dataSource = new MatTableDataSource(this.reservationsToShow);
  }

  returnToTable() {
    this.isSingleReservation = false;
  }

  goToReservation(row: ReservationToShow) {
    
    this.currentReservation = row;

    this.isSubmitted = this.currentReservation.state === ReservationState.SUBMITTED;
    this.isInProgress = this.currentReservation.state === ReservationState.IN_PROGRESS;
    this.isTerminated = this.currentReservation.state === ReservationState.COMPLETED;

    this.isSingleReservation = true;
  }

  async setState(state: string) {
    let st: ReservationState;
    if(state === 'SUBMITTED') {
      st = ReservationState.SUBMITTED;
    } else if(state === 'IN_PROGRESS') {
      st = ReservationState.IN_PROGRESS;
    } else {
      st = ReservationState.COMPLETED;
    }

    this.currentReservation.state = st;
    let reservationToUpdate = this.reservationsRaw.find(m => m.id === this.currentReservation.id);
    console.log(reservationToUpdate)
    if(reservationToUpdate) {
      reservationToUpdate.state = st;
      let response = await lastValueFrom(this.cookService.updateReservation(reservationToUpdate));
      console.log(response)
      this.updateMessage ="State updated successfully";
      setTimeout(() => (this.updateMessage = ''), 3000);
    }
    
    this.isSubmitted = this.currentReservation.state === ReservationState.SUBMITTED;
    this.isInProgress = this.currentReservation.state === ReservationState.IN_PROGRESS;
    this.isTerminated = this.currentReservation.state === ReservationState.COMPLETED;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }}
