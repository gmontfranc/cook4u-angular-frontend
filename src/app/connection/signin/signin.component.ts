import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service'
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  email: string;
  password: string;
  signin: FormGroup;
  hide = true;

  constructor(private auth: AuthService, private router: Router, private formHelper: FormBuilder) { }

  ngOnInit(): void  {
    this.signin = this.formHelper.group({
      email: ['', Validators.required],
      password: ['', Validators.required]

    });
  }

  get emailInput() { return this.signin.get('email'); }
  get passwordInput() { return this.signin.get('password'); }  

  login() {
    this.auth.login(this.email, this.password);
  }
}

