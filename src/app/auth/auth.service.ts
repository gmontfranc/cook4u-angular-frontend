import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class AuthService {

  private BASE_AUTH_URL = 'http://localhost:8080/api/auth/';

  constructor(private http: HttpClient, private cookieService: CookieService) { }

  login(email: string, password: string) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' })
    };

    const body = JSON.stringify({ email, password });

    this.http.post<any>(this.BASE_AUTH_URL + 'login', body, httpOptions).subscribe({
      next:() => {
        console.log("#FR HEADERS: ")
        //this.cookieService.set('jwt', );
        //this.cookieService.set('firstname', data.token);
      }
    });
      
  }
  
}
