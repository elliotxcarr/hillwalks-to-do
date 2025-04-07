import {act, Actions, createEffect, ofType} from '@ngrx/effects'
import { AuthService } from '../services/auth.service'
import * as AuthActions from './app.actions'
import { catchError, exhaustMap, map, mergeMap, of, tap } from 'rxjs'
import { inject, Injectable, OnInit } from '@angular/core'
import { User } from '../models/User'


@Injectable()
export class AuthEffects{
    
        private actions$:Actions = inject(Actions) 
        private authService: AuthService = inject(AuthService)
    
    loginRequest = createEffect(()=>
    this.actions$.pipe(
        ofType(AuthActions.loginRequest),
        tap(()=> console.log('in effects')),
        exhaustMap((action) =>
        this.authService
            .login(action.username, action.password).pipe(
                map((user: User | null) =>
                    AuthActions.loginSuccess({user})

                ),
                catchError((error) => {
                    const errorMsg = error.error?.error;
                    return of(AuthActions.loginFailure({ error: errorMsg }));
                  })
            )
        )
    )
    )

}