import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  email: string = ""
  password: string = ""

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {
  }

  login() {
    this.auth.login(this.email, this.password)
     
  }
}

