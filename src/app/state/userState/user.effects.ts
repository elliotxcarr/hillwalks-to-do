import {inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as AuthActions from '../authState/auth.actions';
import { tap } from "rxjs";
import { logOutUser } from "./user.actions";

@Injectable()
export class UserEffects{
    
    private actions$ = inject(Actions)

    logOut$ = createEffect(()=>
        
        this.actions$.pipe(
            ofType(logOutUser),
            tap(()=>
                AuthActions.logOut()
            )
        ), {dispatch: false}
    )
}