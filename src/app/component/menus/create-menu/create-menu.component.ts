import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { lastValueFrom } from 'rxjs';
import { Dish, DishTypeEnum } from 'src/app/model/dish';
import { Menu } from 'src/app/model/menu';
import { CookService } from 'src/app/service/cook-services/cook.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-menu',
  templateUrl: './create-menu.component.html',
  styleUrls: ['./create-menu.component.scss']
})
export class CreateMenuComponent implements OnInit {

  form: FormGroup;
  selectedStarterOne: Dish;
  selectedStarterTwo: Dish;
  selectedStarterThree: Dish;
  starters: Dish[] = [];
  mains: Dish[] = [];
  desserts: Dish[] = [];
  isLoading = false;
  successMessage = '';
  failureMessage = '';

  disableSubmit = false;

  starterError = '';
  mainError = '';
  dessertError = '';

  constructor(
    private formHelper: FormBuilder,
    private cookService: CookService,
    private jwtUtils: JwtHelperService,
    private router: Router

  ) {}


  async ngOnInit() {
    this.form = this.formHelper.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      starterOne: ['', Validators.required],
      starterTwo: ['', Validators.required],
      starterThree: ['', Validators.required],
      mainOne: ['', Validators.required],
      mainTwo: ['', Validators.required],
      mainThree: ['', Validators.required],
      dessertOne: ['', Validators.required],
      dessertTwo: ['', Validators.required],
      dessertThree: ['', Validators.required],
    });

    const response = await lastValueFrom(this.cookService.getAllDishes());

    this.starters = response.filter(
      (x) => x.type === DishTypeEnum.STARTER
    );

    this.mains = response.filter(
      (x) => x.type === DishTypeEnum.MAIN
    );

    this.desserts = response.filter(
      (x) => x.type === DishTypeEnum.DESSERT
    );
    //this.originalStarters = this.starters;
    this.getFilteredDishes(this.selectedStarterOne);
  }

  async submitForm() {
    console.log(this.form);

    this.isLoading = true;
    let decodedToken = this.jwtUtils.decodeToken(String(localStorage.getItem('jwt')));
    let index = Number(decodedToken["sub"].substring(0, decodedToken["sub"].indexOf(",")));
    
    const response = await lastValueFrom(this.cookService.getAllMenusForCooks(index));
    let menus = response;
    if(menus.length > 4) {
      this.isLoading = false;
      this.failureMessage = "Nombre de menus ne peut pas être supérieur à 5 !";
      setTimeout(() => (this.failureMessage = ''), 5000);
      return;
    }

    let allDishes: Dish[] = [];

    allDishes.push(this.form.controls['starterOne'].value);
    allDishes.push(this.form.controls['starterTwo'].value);
    allDishes.push(this.form.controls['starterThree'].value);

    allDishes.push(this.form.controls['mainOne'].value);
    allDishes.push(this.form.controls['mainTwo'].value);
    allDishes.push(this.form.controls['mainThree'].value);

    allDishes.push(this.form.controls['dessertOne'].value);
    allDishes.push(this.form.controls['dessertTwo'].value);
    allDishes.push(this.form.controls['dessertThree'].value);


    let menuToCreate: Menu = {
      id: 0,
      name: this.form.controls['name'].value,
      description: this.form.controls['description'].value,
      dishes: allDishes
    }

    this.cookService.creerMenu(menuToCreate).subscribe({
      next: (res: any) => {
        this.router.navigate(['menus']);
        this.successMessage ="Menu créée avec succes!";
        this.isLoading = false;
        setTimeout(() => (this.successMessage = ''), 5000);
      }, error: (err: any) => {
        this.isLoading = false;
        this.failureMessage="Erreur durant la creation!";
        setTimeout(() => (this.failureMessage = ''), 5000);
      }
    });
  }

  getFilteredDishes(event: any) {
    this.disableSubmit = false;
    this.starterError = '';
    this.mainError = '';
    this.dessertError = '';
    let firstS = this.form.controls['starterOne'].value;
    let secondS = this.form.controls['starterTwo'].value;
    let thirdS = this.form.controls['starterThree'].value;

    let firstM = this.form.controls['mainOne'].value;
    let secondM = this.form.controls['mainTwo'].value;
    let thirdM = this.form.controls['mainThree'].value;

    let firstD = this.form.controls['dessertOne'].value;
    let secondD = this.form.controls['dessertTwo'].value;
    let thirdD = this.form.controls['dessertThree'].value;


    //STARTERS
    if( !firstS || !secondS || !thirdS) {
      this.starterError = 'Les entrées doivent être définis!';
      this.disableSubmit = true;
    } else if(firstS === secondS || firstS === thirdS || secondS === thirdS) {
      this.starterError = 'Les entrées ne doivent pas être identiques!';
      this.disableSubmit = true;
    }

    //MAINS
    if( !firstM || !secondM || !thirdM) {
      this.mainError = 'Les plats principales doivent être définis!';
      this.disableSubmit = true;
    }else if(firstM === secondM || firstM === thirdM || secondM === thirdM) {
      this.mainError = 'Les plats principales ne doivent pas être identiques!';
      this.disableSubmit = true;
    }

    //DESSERTS
    if( !firstD || !secondD || !thirdD) {
      this.dessertError = 'Les desserts doivent être définis!';
      this.disableSubmit = true;
    }else if(firstD === secondD || firstD === thirdD || secondD === thirdD) {
      this.dessertError = 'Les desserts ne doivent pas être identiques!';
      this.disableSubmit = true;
    }  
  }

}
