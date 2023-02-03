import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field'
import { User } from 'src/app/model/user';
import { CookService } from 'src/app/service/cook-services/cook.service';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.scss']
})
export class ReservationComponent implements OnInit {

  constructor(private formHelper: FormBuilder, private cookService: CookService) {}
  form: FormGroup;
  cooks: User[];
  menus: any[];

  ngOnInit(): void  {
    this.form = this.formHelper.group({
      cook: ['', Validators.required],
      menu: ['', Validators.required],
      date: ['', Validators.required],
      address: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      comments: ['']

    });

    this.cookService.getAllCooks().subscribe({
      next: (data) => {
        this.cooks = data;
        console.log(JSON.stringify(this.cooks));
        
      }
    });

    this.cookService.getAllMenusForCooks(3).subscribe({
      next: (data) => {
        this.menus = data;
        console.log(JSON.stringify(this.cooks));
        
      }
    });
  }

  submitForm() {

  }
}
