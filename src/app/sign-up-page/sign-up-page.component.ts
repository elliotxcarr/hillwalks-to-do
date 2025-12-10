import { NgClass } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { Field, form, validate } from "@angular/forms/signals";

interface SignUp{
  name: string;
  dob: string;
  email: string;
  username: string;
  password: string;
  age?: number;
}

@Component({
  selector: 'app-sign-up-page',
  imports: [Field, NgClass],
  templateUrl: './sign-up-page.component.html',
  styleUrl: './sign-up-page.component.css',
})
export class SignUpPageComponent {
  
  signUpModel = signal<SignUp>({
    name: '',
    dob: '',
    email: '',
    username: '',
    password: '',
    age: undefined
  });

  age = computed(() => {
      const dob = new Date(this.signUpForm.dob().value());
      const now = new Date();

      let age = now.getFullYear() - dob.getFullYear();
      const monthDiff = now.getMonth() - dob.getMonth();

      if (monthDiff < 0 || (monthDiff === 0 && now.getDate() < dob.getDate())) {
        age--;
      }
      return age
  })

  signUpForm = form(this.signUpModel, (schema) => {
    validate(schema.dob, ({value}) => {
      if(this.age() < 18){
        return { kind: 'age', message: 'You must be at least 18 years old to sign up.'}
      }
      return null;
    })
  });
}
