import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:8080/api/auth';

  constructor(private http: HttpClient, private cookieService: CookieService) { }

  login(username: string, password: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    const body = JSON.stringify({ username, password });

    return this.http.post<any>(this.apiUrl, body, httpOptions)
      .pipe(
        map((data) => {
          if (data && data.token) {
            this.cookieService.set('jwt', data.token);
            return true;
          }
          //error: err => alert("Combo username password is wrong!"),
          return false;
        })
      );
  }
  
}
