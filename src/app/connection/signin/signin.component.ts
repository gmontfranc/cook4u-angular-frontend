import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent {
  username: string = ""
  password: string = ""

  constructor(private loginService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  login() {
    this.loginService.login(this.username, this.password)
      .subscribe(
        (data) => {
          this.router.navigate(['/home']);
        },
        (error) => {
          console.log(error);
        });
  }
}

