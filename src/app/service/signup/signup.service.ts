import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { AuthResponse } from 'src/app/model/auth-response';
import { Signuprequest } from 'src/app/model/signuprequest';

@Injectable({
  providedIn: 'root'
})
export class SignupService {
  private BASE_AUTH_URL = "http://localhost:8080";

  private BASE_REGISTER_URL = this.BASE_AUTH_URL+"/api/auth/signup";
  private BASE_REGISTE_COOK_URL = this.BASE_AUTH_URL+"/api/user/create";

  

  constructor(private http: HttpClient, private router: Router, private jwtUtils: JwtHelperService) { }

  signup(signupForm: Signuprequest) {

    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' })
    };


    this.http.post<AuthResponse>(this.BASE_REGISTER_URL, signupForm, httpOptions).subscribe({
      next: (data) => {
        localStorage.setItem('jwt', data.token);
          this.router.navigateByUrl('/home');  
      }
    })
  }

  createCook(signupForm: Signuprequest) {

    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' })
    };


    this.http.post<AuthResponse>(this.BASE_REGISTE_COOK_URL, signupForm, httpOptions).subscribe({
      next: (data) => {
          this.router.navigateByUrl('/home');  
      }
    })
  }


}
