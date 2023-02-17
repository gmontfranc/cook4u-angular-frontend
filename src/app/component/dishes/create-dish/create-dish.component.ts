import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Dish, DishTypeEnum } from 'src/app/model/dish';
import { CookService } from 'src/app/service/cook-services/cook.service';

@Component({
  selector: 'app-create-dish',
  templateUrl: './create-dish.component.html',
  styleUrls: ['./create-dish.component.scss']
})
export class CreateDishComponent implements OnInit {

  form: FormGroup;
  dishTypes: DishTypeEnum[] = [];
  selectedType: DishTypeEnum;

  isLoading = false;

  successMessage = '';
  failureMessage = '';
  constructor(
    private formHelper: FormBuilder,
    private cookService: CookService,
  ) {}

  ngOnInit(): void {
    this.form = this.formHelper.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: [0, Validators.required],
      type: [DishTypeEnum.STARTER, Validators.required],
    });

    this.dishTypes.push(DishTypeEnum.STARTER);
    this.dishTypes.push(DishTypeEnum.MAIN);
    this.dishTypes.push(DishTypeEnum.DESSERT);
    this.selectedType = DishTypeEnum.STARTER;
  }

  submitForm() {
    this.isLoading = true;
    let dish: Dish = {
      id: 0,
      name: this.form.controls['name'].value,
      description: this.form.controls['description'].value,
      price: this.form.controls['price'].value,
      type: this.form.controls['type'].value
    }

    this.cookService.creerDish(dish).subscribe({
      next: (res: any) => {
        this.successMessage ="Plat créée avec succes!";
        this.isLoading = false;
        setTimeout(() => (this.successMessage = ''), 5000);
      }, error: (err: any) => {
        this.isLoading = false;
        this.failureMessage="Erreur durant la creation!";
        setTimeout(() => (this.failureMessage = ''), 5000);
      }
    })

  }
}
