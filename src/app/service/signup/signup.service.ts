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
  private BASE_REGISTER_URL = "/api/auth/signup";
  

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


}
