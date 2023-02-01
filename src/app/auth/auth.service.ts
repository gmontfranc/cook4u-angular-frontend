import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { AuthResponse, isAuthResponse } from '../model/auth-response';

@Injectable()
export class AuthService {

  private BASE_AUTH_URL = "/api/auth/";

  constructor(private http: HttpClient, private cookieService: CookieService, private router: Router) { }

  login(email: string, password: string) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' })
    };

    const body = JSON.stringify({ email, password });

    this.http.post<AuthResponse>(this.BASE_AUTH_URL + 'login', body, httpOptions).subscribe({
      next:(data) => { 
          localStorage.setItem('jwt', data.token);
          this.router.navigateByUrl('/home');    
      },
      error: () => {
        
      }
    });      
  }

  logout() {
    localStorage.removeItem('jwt');
    this.router.navigateByUrl('/home');
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('jwt') != null;
  }
}
