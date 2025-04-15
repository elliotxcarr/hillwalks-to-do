import { Actions, createEffect, ofType} from '@ngrx/effects'
import { AuthService } from '../../services/auth.service'
import * as AuthActions from './auth.actions'
import * as UserActions from '../userState/user.actions'
import { catchError, exhaustMap, map, of, tap } from 'rxjs'
import { inject, Injectable } from '@angular/core'
import { User } from '../../models/User'
import { Router } from '@angular/router'



@Injectable()
export class AuthEffects{
    
    private actions$:Actions = inject(Actions) 
    private authService: AuthService = inject(AuthService)
    private router:Router = inject(Router)

    loginRequest = createEffect(()=>
        this.actions$.pipe(
            ofType(AuthActions.loginRequest),
            exhaustMap((action) =>
            this.authService
                .login(action.username, action.password).pipe(
                    tap(()=> this.router.navigate(['home']) ),
                    map((user: User) =>
                        UserActions.initialiseUser({user})
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