import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Signuprequest } from 'src/app/model/signuprequest';
import { SignupService } from 'src/app/service/signup/signup.service';

@Component({
  selector: 'app-create-cook',
  templateUrl: './create-cook.component.html',
  styleUrls: ['./create-cook.component.scss']
})
export class CreateCookComponent {
  signUpForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private signupService: SignupService, private router: Router) { 
    this.signUpForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      age: ['', [Validators.required, Validators.min(18)]]
    });

  }

  submitForm() {
    if (this.signUpForm.valid) {
      let signUpData: Signuprequest = this.signUpForm.value;
      this.signupService.createCook(signUpData);
    }
  }

  ngOnInit() {
    
  }
}
