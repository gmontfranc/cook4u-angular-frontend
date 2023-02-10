import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Signuprequest } from 'src/app/model/signuprequest'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit{
  signUpForm: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.signUpForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      password2: ['', [Validators.required, Validators.minLength(6)]],
      age: ['', [Validators.required, Validators.min(18)]]
    });
  }

  samePasswords() {
    let pass = this.signUpForm.get('password');
    let confirmPass = this.signUpForm.get('password2');
    return pass === confirmPass ? true : false;
  }



  submitForm() {
    if (this.signUpForm.valid) {
      let signUpData: Signuprequest = this.signUpForm.value;
      console.log(signUpData);
      // Send signUpData to back-end API
    }
  }
}
