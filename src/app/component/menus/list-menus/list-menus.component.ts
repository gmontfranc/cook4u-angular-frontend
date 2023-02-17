import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { JwtHelperService } from '@auth0/angular-jwt';
import { lastValueFrom } from 'rxjs';
import { Dish, DishTypeEnum } from 'src/app/model/dish';
import { Menu } from 'src/app/model/menu';
import { CookService } from 'src/app/service/cook-services/cook.service';

@Component({
  selector: 'app-list-menus',
  templateUrl: './list-menus.component.html',
  styleUrls: ['./list-menus.component.scss']
})
export class ListMenusComponent implements OnInit{

  isSingleMenu = false;
  menus: Menu[] = [];
  currentMenu: Menu;
  starters: Dish[] = [];
  mains: Dish[] = [];
  desserts: Dish[] = [];

  displayedColumns: string[] = ['name', 'description'];
  dataSource = new MatTableDataSource(this.menus);
  constructor(
    private cookService: CookService,
    private jwtUtils: JwtHelperService
  ) {}

  async ngOnInit() {
    let decodedToken = this.jwtUtils.decodeToken(String(localStorage.getItem('jwt')));
    let index = Number(decodedToken["sub"].substring(0, decodedToken["sub"].indexOf(",")));
    
    const response = await lastValueFrom(this.cookService.getAllMenusForCooks(index));

    
    this.menus = response;
    console.log(this.menus);
    this.dataSource = new MatTableDataSource(this.menus);
  }

  returnToTable() {
    this.isSingleMenu = false;
  }

  async goToMenu(row: Menu) {
    this.currentMenu = row;
    this.isSingleMenu = true;
    const resDishes = await lastValueFrom(this.cookService.getAllDishesForMenu(this.currentMenu.id));

    this.starters = resDishes.filter(
      (x) => x.type === DishTypeEnum.STARTER
    );
    this.mains = resDishes.filter((x) => x.type === DishTypeEnum.MAIN);
    this.desserts = resDishes.filter(
      (x) => x.type === DishTypeEnum.DESSERT
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
