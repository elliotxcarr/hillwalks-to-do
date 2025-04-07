import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';
import { User } from '../models/User';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private usersApi = 'http://localhost:5001/login';

  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);

  login(username: string, password:string): Observable<User | null>{
    const credentials = {username, password};
    console.log('at login')
    return this.http.post<User | null>(this.usersApi, credentials).pipe(
      tap(()=> this.router.navigate(['home']))
    )
  }

  logout(): void{
    this.router.navigate(['login'])
  }

  
}
