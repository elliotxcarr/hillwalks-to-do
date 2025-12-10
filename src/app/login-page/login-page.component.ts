import { Component, inject, signal} from '@angular/core';
import '@angular/forms'
import { FormsModule } from '@angular/forms';
import { AuthStore } from '../store/auth/auth.store';
import { Dispatcher } from '@ngrx/signals/events';
import { Field, form, required, schema } from '@angular/forms/signals';

@Component({
  selector: 'app-login-page',
  imports: [ FormsModule, Field],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent{

  readonly authStore = inject(AuthStore)
  readonly dispatcher: Dispatcher = inject(Dispatcher)
  
  loginModel = signal({
    username: '',
    password: ''
  })
  loginForm = form(this.loginModel, (schema) => {
    required(schema.username, {message: 'Username is required'})
    required(schema.password, {message: 'Password is required'})
  })

  onSubmit(){
    this.authStore.performLogin(this.loginForm().value())
  }
  isDetailsInvalid = () => 
    (this.loginForm.username().invalid() && this.loginForm.username().touched()) ||
    (this.loginForm.password().invalid() && this.loginForm.password().touched())
}

