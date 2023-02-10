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
  cookIdParm: number;
  

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
      }
    }); 

    this.subRoute.params.subscribe(params => {
      this.cookIdParm = params['id']; 
    });


    if(this.cookIdParm != null) {
      let foundCook: User | undefined;
      let testSTR: String;
      if(this.cookIdParm != null) {       
        this.cookService.findCookById(this.cookIdParm).subscribe({          
          next: (data) => {
            console.log("#FR DATA: "+JSON.stringify(data));
            
            this.selectedCook = data;
            testSTR = "test";
          }
        });
      }      
      console.log("#FR cookfound: "+foundCook);
      
        if(foundCook != undefined) {
          console.log("#FR COOK FOUND: "+JSON.stringify(foundCook));
          
          this.selectedCook = foundCook;
        }
    }   

  }

  getMenusForCook(parm1: MatSelectChange): void
 {  
  let cookId: number = parm1.value.id;
  if(this.cookIdParm != null)
    cookId = this.cookIdParm;

  this.cookService.getAllMenusForCooks(cookId).subscribe({
    next: (data) => {
      this.menus = data; 
    }
  });
}
  

 
  submitForm() {

  }

}

