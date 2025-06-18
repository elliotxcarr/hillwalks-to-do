import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { User } from '../models/User';
import { LoginRequest } from '../models/LoginReq';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private readonly http = inject(HttpClient);

  login(re:LoginRequest): Observable<User>{
    return this.http.post<User>('http://localhost:5001/login', re)
  }
}
