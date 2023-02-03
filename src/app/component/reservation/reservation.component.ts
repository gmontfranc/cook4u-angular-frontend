import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field'
import { MatSelectChange } from '@angular/material/select';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/model/user';
import { CookService } from 'src/app/service/cook-services/cook.service';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.scss']
})
export class ReservationComponent implements OnInit {

  constructor(private formHelper: FormBuilder, private cookService: CookService, private subRoute: ActivatedRoute) {}

  form: FormGroup;
  cooks: User[];
  menus: any[];
  selectedCook: User;
  

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
        this.subRoute.params.subscribe(params => {
          console.log("Routing");
          
          let parmId: number = params['id']; 
          let foundCook: User | undefined;
          if(parmId != null) {
            console.log("Searching: "+parmId+'\n'+JSON.stringify(this.cooks));
            
            foundCook = this.cooks.find((cook) => {
              return cook.id == parmId;
            });
          }
          if(foundCook != undefined) {
            
            this.selectedCook = foundCook;
          }
        });

      }
    });     

    

  }

  getMenusForCook(parm1: MatSelectChange): void
 {
  console.log("trigger");
  
  let cookId: number = parm1.value.id;  
  this.cookService.getAllMenusForCooks(cookId).subscribe({
    next: (data) => {
      this.menus = data; 
    }
  });
}
  

 
  submitForm() {

  }

}

