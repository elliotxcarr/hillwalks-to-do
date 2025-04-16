import { Component, inject} from '@angular/core';
import '@angular/forms'
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { loginRequest } from '../state/authState/auth.actions';
import { AuthState } from '../state/authState/auth.reducer';
import { NgClass, NgIf } from '@angular/common';
import { selectErrorMessage } from '../state/authState/auth.selectors';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login-page',
  imports: [ FormsModule, NgIf, NgClass],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent{

  private readonly store = inject(Store<AuthState>)
  
  errorMessage: string | null = '';
  enteredUsername: string = '';
  enteredPassword: string = '';
  errorState: Observable<string | null> = this.store.select(selectErrorMessage);
  
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

