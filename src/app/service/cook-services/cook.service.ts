import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { User } from 'src/app/model/user';

@Injectable({
  providedIn: 'root'
})
export class CookService {

  constructor(private http: HttpClient) { }

  private BASE_AUTH_URL = "/api/public/cooks";

  getAllCooks(){
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' })
    };
    return this.http.get<User[]>(this.BASE_AUTH_URL, httpOptions);
  }
}
