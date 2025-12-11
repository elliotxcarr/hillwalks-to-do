import { NgClass } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { Field, form, submit, validate } from "@angular/forms/signals";
import { Dispatcher } from '@ngrx/signals/events';
import { authEvents } from '../store/auth/auth.store';

export interface SignUp{
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
  private readonly _dispatcher = inject(Dispatcher);
  signUpModel = signal<SignUp>({
    name: '',
    dob: '',
    email: '',
    username: '',
    password: '',
    age: undefined
  });

  getAge = computed(() => {
    const dob = new Date(this.signUpForm.dob().value());
    const now = new Date();

    return (
      now.getFullYear() -
      dob.getFullYear() -
      (now < new Date(now.getFullYear(), dob.getMonth(), dob.getDate()) ? 1 : 0)
    );
  });

  signUpForm = form(this.signUpModel, (schema) => {
    validate(schema.dob, (_) => {
      if(this.getAge() < 18){
        return { kind: 'age', message: 'You must be at least 18 years old to sign up.'}
      }
      return null;
    })
  });

  onSubmit(event: Event) {
    event.preventDefault();
    submit(this.signUpForm, async () => {
      const data = this.signUpModel();
      data.age = this.getAge();
      this._dispatcher.dispatch(
        authEvents.signupRequest(this.signUpModel())
      );
    });
  }
}
