import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { User } from 'src/app/model/user';
import { Menu } from 'src/app/model/menu';
import { Reserve, ReserveDish } from 'src/app/model/reservation';
import { Dish } from 'src/app/model/dish';

@Injectable({
  providedIn: 'root'
})
export class CookService {

  constructor(private http: HttpClient) { }

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': 'http://localhost:4200'})
  };

  private BASE_AUTH_URL = "http://localhost:8080";
  private PUBLIC_COOK_URL = this.BASE_AUTH_URL + "/api/public/cooks";
  private PROTECTED_MENU_URL = this.BASE_AUTH_URL + "/api/menu/cook/";
  private PROTECTED_COOK_URL = this.BASE_AUTH_URL + "/api/user/ck/";
  private PROTECTED_USER_URL = this.BASE_AUTH_URL + "/api/user/us/";
  private RESERVE_MENU_URL = this.BASE_AUTH_URL + "/api/reservations/reserve";
  private USER_RESERVATIONS = this.BASE_AUTH_URL + "/api/reservations/user";
  private MENU_DISHES_URL = this.BASE_AUTH_URL + "/api/dish/menu/";
  private ALL_DISHES_URL = this.BASE_AUTH_URL + "/api/dish/all/";
  private CREATE_MENU_URL = this.BASE_AUTH_URL + "/api/menu/create";
  private CREATE_DISH_URL = this.BASE_AUTH_URL + "/api/dish/create";
  private RESERVE_UPDATE_URL = this.BASE_AUTH_URL + "/api/reservations/update";

  getAllCooks(){
    return this.http.get<User[]>(this.PUBLIC_COOK_URL, this.httpOptions);
  }

  getAllMenusForCooks(id: number) {
    return this.http.get<Menu[]>(`${this.PROTECTED_MENU_URL}${id}`, this.httpOptions);
  }

  getAllDishesForMenu(id: number) {
    return this.http.get<Dish[]>(`${this.MENU_DISHES_URL}${id}`, this.httpOptions);
  }

  getAllDishes() {
    return this.http.get<Dish[]>(`${this.ALL_DISHES_URL}`, this.httpOptions);
  }

  findCookById(id: number) {
    return this.http.get<User>(`${this.PROTECTED_COOK_URL}${id}`, this.httpOptions);
  }

  findUserById(id: number) {
    return this.http.get<User>(`${this.PROTECTED_USER_URL}${id}`, this.httpOptions);
  }

  reserver(reservation: Reserve) {
    return this.http.post(this.RESERVE_MENU_URL, reservation, this.httpOptions);
  }

  updateReservation(reservation: Reserve) {
    return this.http.put(this.RESERVE_UPDATE_URL, reservation, this.httpOptions);
  }

  creerMenu(menu: Menu) {
    return this.http.post(this.CREATE_MENU_URL, menu, this.httpOptions);
  }

  creerDish(dish: Dish) {
    return this.http.post(this.CREATE_DISH_URL, dish, this.httpOptions);
  }

  getAllReservationsForUser() {
    return this.http.get<Reserve[]>(this.USER_RESERVATIONS, this.httpOptions);
  }

}
