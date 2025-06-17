import { Component, computed, inject, Signal} from '@angular/core';
import '@angular/forms'
import { FormsModule } from '@angular/forms';
import { NgClass, NgIf } from '@angular/common';
import { AuthStore } from '../store/auth/auth.store';
import { LoginRequest } from '../models/LoginReq';

@Component({
  selector: 'app-login-page',
  imports: [ FormsModule, NgIf, NgClass],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent{

  readonly authStore = inject(AuthStore)
  
  errorMessage: string | null = '';
  enteredUsername: string = '';
  enteredPassword: string = '';
  
  onSubmit(){
    const loginReq: LoginRequest = {
      username: this.enteredUsername,
      password: this.enteredPassword
    }
    this.authStore.performLogin(loginReq)
  }
}

