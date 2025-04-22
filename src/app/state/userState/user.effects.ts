import {inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as AuthActions from '../authState/auth.actions';
import { catchError, EMPTY, exhaustMap, map, of, share, shareReplay, switchMap, tap } from "rxjs";
import { getWalks, logOutUser, setWalks } from "./user.actions";
import { WalkService } from "../../services/walk.service";
import { Walk } from "../../models/Walk";
import * as UserActions from './user.actions';

@Injectable()
export class UserEffects{
    
    private actions$ = inject(Actions)
    private walkService = inject(WalkService)

    logOut$ = createEffect(()=>
        
        this.actions$.pipe(
            ofType(logOutUser),
            tap(()=>
                AuthActions.logOut()
            )
        ), {dispatch: false}
    )

   

    setWalks = createEffect(() =>
        this.actions$.pipe(
          ofType(UserActions.initialiseUser),
          switchMap(() =>
            this.walkService.getAllWalks().pipe(
              map((walks: Walk[]) =>
                UserActions.setWalks({ walks })
              ),
              catchError(err => {
                console.error('Failed to fetch walks:', err);
                return EMPTY; // No action dispatched on error
              })
            )
          )
        )
      );
}