import { Component, computed, inject, Signal} from '@angular/core';
import '@angular/forms'
import { FormsModule } from '@angular/forms';
import { NgClass, NgIf } from '@angular/common';
import { AuthStore } from '../store/auth/auth.store';

@Component({
  selector: 'app-login-page',
  imports: [ FormsModule, NgIf, NgClass],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent{

  private readonly store = inject(AuthStore)
  
  errorMessage: string | null = '';
  enteredUsername: string = '';
  enteredPassword: string = '';
  errorState: Signal<string | null> = computed(()=> this.store.error())
  
  onSubmit(){
    this.store.loginRequest(this.enteredUsername, this.enteredPassword)
  }
}

