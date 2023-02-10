import { Component, OnInit } from '@angular/core';
import { AbstractControl, AbstractControlOptions, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Signuprequest } from 'src/app/model/signuprequest'
import { SignupService } from 'src/app/service/signup/signup.service';
import { ConfirmPasswordValidator } from 'src/app/validators/password-validators';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit{
  signUpForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private signupService: SignupService) { 
    this.signUpForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      password2: ['', [Validators.required, Validators.minLength(6)]],
      age: ['', [Validators.required, Validators.min(18)]]
    },
    {
      validator: ConfirmPasswordValidator("password", "password2")
    } as AbstractControlOptions);

  }

  

  samePasswords(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      return null;
    }  
  }



  submitForm() {
    if (this.signUpForm.valid) {
      let signUpData: Signuprequest = this.signUpForm.value;
      this.signupService.signup(signUpData);
    }
  }

  ngOnInit() {
    
  }
}
