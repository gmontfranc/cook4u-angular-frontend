import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { User } from 'src/app/model/user';
import { Menu } from 'src/app/model/menu';

@Injectable({
  providedIn: 'root'
})
export class CookService {

  constructor(private http: HttpClient) { }

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' })
  };

  private PUBLIC_COOK_URL = "/api/public/cooks";
  private PROTECTED_MENU_URL = "/api/menu/cook/"

  getAllCooks(){
    
    return this.http.get<User[]>(this.PUBLIC_COOK_URL, this.httpOptions);
  }

  getAllMenusForCooks(id: number) {
    return this.http.get<Menu[]>(`${this.PROTECTED_MENU_URL}${id}`);
  }
}
