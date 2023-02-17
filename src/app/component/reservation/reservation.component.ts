import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectChange } from '@angular/material/select';
import { ActivatedRoute, Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { Dish, DishTypeEnum } from 'src/app/model/dish';
import { Menu } from 'src/app/model/menu';
import { ReservationState, Reserve, ReserveDish } from 'src/app/model/reservation';
import { User } from 'src/app/model/user';
import { CookService } from 'src/app/service/cook-services/cook.service';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.scss'],
})
export class ReservationComponent implements OnInit {
  constructor(
    private formHelper: FormBuilder,
    private cookService: CookService,
    private subRoute: ActivatedRoute,
    private router: Router
  ) {}

  disableSubmit = false;

  isReservLoading = false;

  minDate = new Date();
  form: FormGroup;
  cooks: User[];
  menus: Menu[];
  selectedCook: User;
  selectedMenu: Menu;
  cookIdParm: number;

  reservedDates: Date[] = [];

  dishes: Dish[] = [];

  starters: Dish[] = [];
  mainD: Dish[] = [];
  desserts: Dish[] = [];

  successMessage = '';
  failureMessage = '';

  starterError = '';
  mainError = '';
  dessertError = '';

  entries: string[] = [];
  mains: string[] = [];
  deserts: string[] = [];

  async ngOnInit() {
    this.form = this.formHelper.group({
      cook: ['', Validators.required],
      menu: ['', Validators.required],
      date: ['', Validators.required],
      personsNumber: [1, Validators.required],
      address: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      comments: [''],
      entries: this.formHelper.array([]),
      mainDishes: this.formHelper.array([]),
      deserts: this.formHelper.array([]),
    });

    this.cookService.getAllCooks().subscribe({
      next: (data) => {
        this.cooks = data;
      },
    });

    this.subRoute.params.subscribe((params) => {
      this.cookIdParm = params['id'];
    });

    if (this.cookIdParm != null) {
      if (this.cookIdParm != null) {
        const rsps = await lastValueFrom(this.cookService.findCookById(this.cookIdParm));
        this.selectedCook = rsps;
        this.form.controls['cook'].setValue(this.selectedCook);
        this.getMenusForCookId(this.selectedCook.id);

      }
    }
  }

  resetDishes() {
    let aFormArray = this.form.get('entries') as FormArray;
    let i = 0;
    for (let c of aFormArray.controls) {
      let co = c as FormGroup;
      co.controls[this.starters[i].name].setValue(0);
      i++;
    }

    aFormArray = this.form.get('mainDishes') as FormArray;
    i = 0;
    for (let c of aFormArray.controls) {
      let co = c as FormGroup;
      co.controls[this.mainD[i].name].setValue(0);
      i++;
    }

    aFormArray = this.form.get('deserts') as FormArray;
    i = 0;
    for (let c of aFormArray.controls) {
      let co = c as FormGroup;
      co.controls[this.desserts[i].name].setValue(0);
      i++;
    }
  }

  checkMaxAvailable(typeDi: string) {
    this.disableSubmit = false;

    const personsNumber = this.form.controls['personsNumber'].value;
    let maxNumber = 0;

    if (typeDi === DishTypeEnum.STARTER) {
      this.starterError = '';
      const aFormArray = this.form.get('entries') as FormArray;
      let i = 0;
      for (let c of aFormArray.controls) {
        let co = c as FormGroup;
        maxNumber += co.controls[this.starters[i].name].value;
        i++;
      }
      if (maxNumber > personsNumber) {
        this.starterError =
          "Le nombre d'entrées est supérieur au nombre de personnes";
        this.disableSubmit = true;
      }
    } else if (typeDi === DishTypeEnum.MAIN) {
      this.mainError = '';
      const aFormArray = this.form.get('mainDishes') as FormArray;
      let i = 0;
      for (let c of aFormArray.controls) {
        let co = c as FormGroup;
        maxNumber += co.controls[this.mainD[i].name].value;
        i++;
      }
      if (maxNumber !== personsNumber) {
        this.mainError =
          "Le nombre de plats principales n'est pas égal au nombre de personnes";
        this.disableSubmit = true;
      }
    } else if (typeDi === DishTypeEnum.DESSERT) {
      this.dessertError = '';
      const aFormArray = this.form.get('deserts') as FormArray;
      let i = 0;
      for (let c of aFormArray.controls) {
        let co = c as FormGroup;
        maxNumber += co.controls[this.desserts[i].name].value;
        i++;
      }
      if (maxNumber > personsNumber) {
        this.mainError = 'Le nombre de desserts est supérieur au nombre de personnes';
        this.disableSubmit = true;
      }
    }
  }

  getDishesForMenu(menuS: MatSelectChange): void {
    let menu = menuS.value;
    this.cookService.getAllDishesForMenu(menu.id).subscribe({
      next: (res) => {
        this.dishes = res;
        this.starters = [];
        this.mainD = [];
        this.desserts = [];

        this.starters = this.dishes.filter(
          (x) => x.type === DishTypeEnum.STARTER
        );
        this.mainD = this.dishes.filter((x) => x.type === DishTypeEnum.MAIN);
        this.desserts = this.dishes.filter(
          (x) => x.type === DishTypeEnum.DESSERT
        );

        let sLength = this.starters.length;
        let mLength = this.mainD.length;
        let dLength = this.desserts.length;

        let rowsStarter = this.form.get('entries') as FormArray;
        let rowsMain = this.form.get('mainDishes') as FormArray;
        let rowsDesert = this.form.get('deserts') as FormArray;

        for (let i = 0; i < sLength; i++) {
          rowsStarter.push(
            this.formHelper.group({
              [this.starters[i].name]: [0, [Validators.required]],
            })
          );
        }

        for (let i = 0; i < mLength; i++) {
          rowsMain.push(
            this.formHelper.group({
              [this.mainD[i].name]: [0, [Validators.required]],
            })
          );
        }

        for (let i = 0; i < dLength; i++) {
          rowsDesert.push(
            this.formHelper.group({
              [this.desserts[i].name]: [0, [Validators.required]],
            })
          );
        }

        console.log(this.form);
      },
    });
  }

  cookDateFilter = (d: Date | null): boolean => {
   
    if( d === null) {
      return true;
    }

    return !this.reservedDates.map(d =>d.toDateString()).includes(d.toDateString());
  };

  getMenusForCook(parm1: MatSelectChange) {
    let cookId: number = parm1.value.id;
    this.getMenusForCookId(cookId)
  }
  async getMenusForCookId(cookId: number) {
    if (this.cookIdParm != null) cookId = this.cookIdParm;
    const response = await lastValueFrom(this.cookService.getAllMenusForCooks(cookId));
    this.menus = response;
    const reservDates = await lastValueFrom(this.cookService.getAllReservationsForUser());
    let filtered = reservDates.filter(rd => rd.cookId === cookId);
    this.reservedDates = filtered.map(f => new Date(f.date));
  }

  submitForm() {
    this.isReservLoading = true;

    let rowsStarter = this.form.get('entries') as FormArray;
    let rowsMain = this.form.get('mainDishes') as FormArray;
    let rowsDesert = this.form.get('deserts') as FormArray;

    let starters: ReserveDish[] = [];
    let mainDs: ReserveDish[] = [];
    let dsrts: ReserveDish[] = [];
    let i = 0;
    for (let c of rowsStarter.controls) {
      let co = c as FormGroup;
      starters.push({
        name: this.starters[i].name,
        quantity: co.controls[this.starters[i].name].value,
        price: this.starters[i].price,
      });
      i++;
    }

    i = 0;
    for (let c of rowsMain.controls) {
      let co = c as FormGroup;
      mainDs.push({
        name: this.mainD[i].name,
        quantity: co.controls[this.mainD[i].name].value,
        price: this.mainD[i].price,
      });
      i++;
    }

    i = 0;
    for (let c of rowsDesert.controls) {
      let co = c as FormGroup;
      dsrts.push({
        name: this.desserts[i].name,
        quantity: co.controls[this.desserts[i].name].value,
        price: this.desserts[i].price,
      });
      i++;
    }

    let prixStarters = starters
      .map((x) => x.price)
      .reduce((acc, curr) => acc + curr, 0);
    let prixMain = mainDs
      .map((x) => x.price)
      .reduce((acc, curr) => acc + curr, 0);
    let prixDsrts = dsrts
      .map((x) => x.price)
      .reduce((acc, curr) => acc + curr, 0);
    console.log(starters);
    //Construct Object to send to backend
    let reserve: Reserve = {
      id: 0,
      cookId: this.form.controls['cook'].value.id,
      menuId: this.form.controls['menu'].value.id,
      date: this.form.controls['date'].value,
      state: ReservationState.SUBMITTED,
      numberOfPeople: this.form.controls['personsNumber'].value,
      address: this.form.controls['address'].value,
      phoneNumber: this.form.controls['phoneNumber'].value,
      comments: this.form.controls['comments'].value,
      starters: starters,
      mainDishes: mainDs,
      desserts: dsrts,
      prixTotal: prixStarters + prixMain + prixDsrts,
    };

    this.cookService.reserver(reserve).subscribe({
      next: (res: any) => {
        this.router.navigate(['user/reservations']);
        this.successMessage ="Reservation créée avec succes!";
        this.isReservLoading = false;
        setTimeout(() => (this.successMessage = ''), 5000);
      }, error: (err: any) => {
        console.log(err);
        this.isReservLoading = false;
        this.failureMessage="Erreur durant la creation!";
        setTimeout(() => (this.failureMessage = ''), 5000);
      }
    });
    console.log(reserve);
  }
}
