import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import '@angular/forms'
import { FormsModule } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { loginRequest } from '../state/app.actions';
import { AuthState } from '../state/app.reducer';
import { NgClass, NgIf } from '@angular/common';
import { selectErrorMessage } from '../state/app.selectors';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login-page',
  imports: [ FormsModule, NgIf, NgClass],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent implements OnInit{

  private readonly router = inject(Router)
  private readonly store = inject(Store<AuthState>)
  
  errorMessage: string | null = '';
  enteredUsername: string = '';
  enteredPassword: string = '';
  errorState: Observable<string | null> = this.store.select(selectErrorMessage);

  ngOnInit(): void {

  } 
  
  onSubmit(){
    let username = this.enteredUsername;
    let password = this.enteredPassword;
    
    if(username == '' || password == ''){
      this.errorMessage = 'Username and Password are required'
    }
    else{
      this.store.dispatch(loginRequest({username, password}));
      this.errorState.subscribe(error => this.errorMessage = error)
    }
  }

}

